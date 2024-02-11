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
  const currentResults = results.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full">
      <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase">
        <thead>
          <tr>
            <th className="p-3 text-sm">ID</th>
            <th className="p-3 text-sm">Emision</th>
            <th className="p-3 text-sm">Cliente</th>
            <th className="p-3 text-sm">Total a pagar</th>
            <th className="p-3 text-sm">Emitir Factura</th>
            <th className="p-3 text-sm">Eliminar</th>
            <th className="p-3 text-sm">Estado del presupuesto</th>
          </tr>
        </thead>
        <tbody>
          {currentResults?.map((p) => (
            <tr key={p.id}>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {p.id}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {dateTime(p.created_at)}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {p.clientes.nombre} {p.clientes.apellido}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {p.estadistica.total_pagar.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </th>
              <th className="border-[1px] border-gray-300 p-3 space-x-2">
                <Link
                  to={`/factura-presupuesto/${p.id}`}
                  className="bg-secondary py-1 px-2 text-center font-bold text-xs text-white rounded"
                >
                  ver presupuesto
                </Link>
              </th>
              <th className="border-[1px] border-gray-300 p-3">
                <Link
                  // onClick={() => handleDeletePresupuesto(p.id)}
                  onClick={() => {
                    handleIdEliminar(p?.id), openEliminarProducto();
                  }}
                  className="bg-red-500 py-1 px-2 text-center font-bold text-xs text-white rounded"
                >
                  eliminar
                </Link>
              </th>
              <th className="border-[1px] border-gray-300 p-3 relative">
                <Link
                  onClick={openModalEstado}
                  className={`${
                    (p.estado === "aceptado" && "bg-green-500") ||
                    (p.estado === "rechazado" && "bg-red-500") ||
                    (p.estado === "pendiente" && "bg-yellow-500")
                  } py-1 px-2 font-bold text-white rounded flex gap-1 flex-row justify-center items-center w-2/3 text-center mx-auto text-sm`}
                >
                  <span onClick={() => seleccionarId(p.id)}>{p.estado}</span>
                  <BiSolidDownArrow className="text-[12px]" />
                </Link>
              </th>
            </tr>
          ))}
        </tbody>

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-4 mb-4 gap-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-secondary hover:bg-primary transition-all ease-in-out text-white shadow shadow-black/20"
                    : "bg-gray-100 shadow shadow-black/20"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        <ModalEnviarFactura isOpen={isOpen} closeModal={closeModal} />
        <ModalPresupuestoEstado
          closeModalEstado={closeModalEstado}
          isOpenEstado={isOpenEstado}
          obtenerId={obtenerId}
          openModalEstado={openModalEstado}
        />
      </table>
    </div>
  );
};
