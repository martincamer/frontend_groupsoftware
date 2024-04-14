import { useEffect, useState } from "react";
import { usePresupuestoContext } from "../../context/PresupuestoProvider";
import { Link, useParams } from "react-router-dom";
import { ModalEnviarFactura } from "./ModalEnviarFactura";
import { BiSolidDownArrow } from "react-icons/bi";
import { ModalPresupuestoEstado } from "./ModalPresupuestoEstado";
import { DescargarPresupuesto } from "../DescargarPresupuesto";

export const TablePresupuestos = ({
  openEliminarProducto,
  handleIdEliminar,
}) => {
  const { results } = usePresupuestoContext();
  let [isOpen, setIsOpen] = useState(false);
  let [obtenerId, setObtenerId] = useState("");
  let [isOpenEstado, setIsEstado] = useState(false);

  const seleccionarId = (id) => {
    setObtenerId(id);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModalEstado() {
    setIsEstado(false);
  }

  function openModalEstado() {
    setIsEstado(true);
  }

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function dateTime(data) {
    return new Date(data).toLocaleDateString("arg", options);
  }

  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Copia los resultados para evitar mutar el estado directamente
  const sortedResults = [...results];

  // Ordena los resultados por created_at en orden descendente (los últimos creados primero)
  sortedResults.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Filtra los resultados para no mostrar los marcados como rechazados
  const filteredResults = sortedResults.filter(
    (result) => result.estado !== "rechazado"
  );

  // Obtiene los resultados de la página actual del array filtrado
  const currentResults = filteredResults.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="border-[1px] border-gray-200 rounded-2xl shadow-black/10 hover:shadow w-full">
        <table className="uppercase min-w-full divide-y-[1px] divide-slate-300">
          <thead>
            <tr>
              <th className="py-4 px-3 text-sm">ID</th>
              <th className="py-4 px-3 text-sm">Emision</th>
              <th className="py-4 px-3 text-sm">Cliente</th>
              <th className="py-4 px-3 text-sm">Total a pagar</th>
              <th className="py-4 px-3 text-sm">Emitir Factura</th>
              <th className="py-4 px-3 text-sm">Eliminar</th>
              {/* <th className="py-4 px-3 text-sm">Estado del presupuesto</th> */}
            </tr>
          </thead>
          <tbody className="divide-y-[1px] divide-slate-300">
            {currentResults?.map((p) => (
              <tr
                className="hover:bg-gray-100/60 transition-all ease-in-out duration-300 cursor-pointer"
                key={p.id}
              >
                <th className="py-4 px-3 font-normal text-sm">{p.id}</th>
                <th className="py-4 px-3 font-normal text-sm">
                  {dateTime(p.created_at)}
                </th>
                <th className="py-4 px-3 font-normal text-sm">
                  {p.clientes.nombre} {p.clientes.apellido}
                </th>
                <th className="py-4 px-3 font-normal text-sm">
                  <div className="flex justify-center">
                    <p className="bg-green-100 py-3 px-4 text-green-700 rounded-xl text-sm uppercase cursor-pointer">
                      {p.estadistica.total_pagar.toLocaleString("es-ar", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </th>
                <th className="py-4 px-3">
                  <Link
                    to={`/factura-presupuesto/${p.id}`}
                    className="bg-sky-100 py-3 px-4 text-sky-700 rounded-xl text-xs uppercase cursor-pointer"
                  >
                    ver presupuesto
                  </Link>
                </th>
                <th className="py-4 px-3">
                  <Link
                    // onClick={() => handleDeletePresupuesto(p.id)}
                    onClick={() => {
                      handleIdEliminar(p?.id), openEliminarProducto();
                    }}
                    className="bg-red-100 py-3 px-4 text-red-800 rounded-xl text-xs uppercase cursor-pointer"
                  >
                    eliminar
                  </Link>
                </th>
                {/* <th className="py-4 px-3">
                  <div>
                    <Link
                      onClick={openModalEstado}
                      className={`${
                        (p.estado === "aceptado" &&
                          "bg-green-500/10 text-green-500 border-green-600 border-[1px]") ||
                        (p.estado === "rechazado" &&
                          "bg-red-500/10 text-red-500 border-red-600 border-[1px]") ||
                        (p.estado === "pendiente" &&
                          "bg-yellow-500/10 text-yellow-500 border-yellow-600 border-[1px]")
                      } py-2 px-3 font-bold  rounded-xl flex gap-1 flex-row justify-center items-center w-2/3 text-sm text-center mx-auto`}
                    >
                      <span onClick={() => seleccionarId(p.id)}>
                        {p.estado}
                      </span>
                      <BiSolidDownArrow className="text-[12px]" />
                    </Link>
                  </div>
                </th> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-4 mb-4 gap-1">
          {currentPage > 1 && (
            <button
              className="mx-1 px-3 py-1 rounded-xl bg-gray-100 shadow shadow-black/20 text-sm"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              {"<"}
            </button>
          )}
          {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
            const pageNumber = index + 1;
            const displayPageNumber =
              currentPage > 5 ? currentPage - 1 + index : pageNumber;
            return (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded-xl ${
                  currentPage === displayPageNumber
                    ? "bg-sky-500 hover:bg-primary transition-all ease-in-out text-white shadow shadow-black/20 text-sm"
                    : "bg-gray-100 shadow shadow-black/20 text-sm"
                }`}
                onClick={() => handlePageChange(displayPageNumber)}
              >
                {displayPageNumber}
              </button>
            );
          })}
          {currentPage < totalPages && (
            <button
              className="mx-1 px-3 py-1 rounded-xl bg-gray-100 shadow shadow-black/20 text-sm"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {">"}
            </button>
          )}
        </div>
      )}

      {/* <ModalEnviarFactura isOpen={isOpen} closeModal={closeModal} /> */}
      <ModalPresupuestoEstado
        closeModalEstado={closeModalEstado}
        isOpenEstado={isOpenEstado}
        obtenerId={obtenerId}
        openModalEstado={openModalEstado}
      />
    </div>
  );
};
