import { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidDownArrow } from "react-icons/bi";
import { useFacturaContext } from "../../context/FacturaProvider";
import { ModalEditarEstadoFactura } from "../ui/ModalEditarEstadoFactura";
import { IoIosArrowRoundForward } from "react-icons/io";

export const TableFacturacion = ({
  openEliminarProducto,
  handleIdEliminar,
}) => {
  const { results } = useFacturaContext();
  let [obtenerId, setObtenerId] = useState("");
  let [isOpenEstado, setIsEstado] = useState(false);

  const seleccionarId = (id) => {
    setObtenerId(id);
  };

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
      <div className="border-[1px] border-gray-300 rounded-2xl hover:shadow-md transition-all ease-linear gap-3 w-full">
        <table className="min-w-full uppercase divide-y-[1px] divide-slate-300">
          <thead>
            <tr>
              <th className="p-3 text-sm">N °</th>
              <th className="py-4 px-3 text-sm">Emision</th>
              <th className="py-4 px-3 text-sm">Cliente</th>
              <th className="py-4 px-3 text-sm">Total a pagar</th>
              <th className="py-4 px-3 text-sm">Ver Factura</th>
              <th className="py-4 px-3 text-sm">Eliminar</th>
              <th className="py-4 px-3 text-sm w-[220px]">
                Estado de la venta
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-[1px] divide-slate-300">
            {currentResults?.map((p) => (
              <tr
                className="hover:bg-gray-100/60 transition-all ease-in-out cursor-pointer"
                key={p.id}
              >
                <th className="py-4 px-3 text-sm font-medium">{p.id}</th>
                <th className="py-4 px-3 text-sm font-normal uppercase">
                  {dateTime(p.created_at)}
                </th>
                <th className="py-4 px-3 text-sm font-normal uppercase">
                  {p.clientes.nombre} {p.clientes.apellido}
                </th>
                <th className="py-4 px-3 text-sm font-normal">
                  {Number(p.estadistica.total_pagar).toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}
                </th>
                <th className="py-4 px-3 text-sm flex items-center justify-center">
                  <Link
                    to={`/factura-venta/${p.id}`}
                    className="bg-sky-100 text-sky-700 py-2 px-4 rounded-2xl hover:shadow-md transition-all ease-linear flex gap-2 items-center"
                  >
                    ver factura
                    <IoIosArrowRoundForward className="text-2xl" />
                  </Link>
                </th>
                <th className="py-4 px-3 text-sm">
                  <Link
                    onClick={() => {
                      handleIdEliminar(p?.id), openEliminarProducto();
                    }}
                    className="bg-red-100 text-red-700 py-3 px-4 rounded-2xl hover:shadow-md transition-all ease-linear"
                  >
                    eliminar
                  </Link>
                </th>
                <th className="py-4 px-3 text-sm relative">
                  <Link
                    onClick={openModalEstado}
                    className={`${
                      (p.estado === "aceptado" &&
                        "bg-green-500/10 text-green-500 border-green-600 border-[1px]") ||
                      (p.estado === "rechazado" &&
                        "bg-red-500/10 text-red-500 border-red-600 border-[1px]") ||
                      (p.estado === "pendiente" &&
                        "bg-yellow-500/10 text-yellow-500 border-yellow-600 border-[1px]")
                    } py-2 px-2 font-bold  rounded-xl flex gap-1 flex-row justify-center items-center w-2/3 text-sm text-center mx-auto`}
                  >
                    <span onClick={() => seleccionarId(p.id)}>{p.estado}</span>
                    <BiSolidDownArrow className="text-[12px]" />
                  </Link>
                </th>
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

      <ModalEditarEstadoFactura
        closeModalEstado={closeModalEstado}
        isOpenEstado={isOpenEstado}
        obtenerId={obtenerId}
        openModalEstado={openModalEstado}
      />
    </div>
  );
};
