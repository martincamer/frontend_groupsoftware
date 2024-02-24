import { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidDownArrow } from "react-icons/bi";
import { useFacturaContext } from "../../context/FacturaProvider";
import { ModalEditarEstadoFactura } from "../ui/ModalEditarEstadoFactura";

export const TableFacturacion = ({
  openEliminarProducto,
  handleIdEliminar,
}) => {
  const { results, handleDeletePresupuesto } = useFacturaContext();
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
            {/* <th className="p-3 text-sm">NUM</th> */}
            <th className="p-3 text-sm border-b-[2px]">Emision</th>
            <th className="p-3 text-sm border-b-[2px]">Cliente</th>
            <th className="p-3 text-sm border-b-[2px]">Total a pagar</th>
            <th className="p-3 text-sm border-b-[2px]">Tipo Factura</th>
            <th className="p-3 text-sm border-b-[2px]">Ver Factura</th>
            <th className="p-3 text-sm border-b-[2px]">Eliminar</th>
            <th className="p-3 text-sm border-b-[2px] w-[220px]">
              Estado de la venta
            </th>
          </tr>
        </thead>
        <tbody>
          {currentResults?.map((p) => (
            <tr
              className="hover:bg-gray-100/60 transition-all ease-in-out cursor-pointer"
              key={p.id}
            >
              {/* <th className="border-[2px] border-gray-300 p-3 text-sm font-medium">
                {p.id}
              </th> */}
              <th className="border-b-[1px] border-gray-300 py-4 px-3 text-sm font-normal uppercase">
                {dateTime(p.created_at)}
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 px-3 text-sm font-normal uppercase">
                {p.clientes.nombre} {p.clientes.apellido}
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 px-3 text-sm font-normal">
                {Number(p.estadistica.total_pagar).toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 px-3 text-sm font-normal">
                {p.tipo_factura}
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 px-3 text-sm space--2 w-1/5">
                <Link
                  to={`/factura-venta/${p.id}`}
                  className="bg-sky-100/20 border-sky-500 border-[1px] py-1 px-2 text-sky-500 rounded text-xs uppercase cursor-pointer"
                >
                  ver factura
                </Link>
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 px-3 text-sm">
                <Link
                  // onClick={() => handleDeletePresupuesto(p.id)}
                  onClick={() => {
                    handleIdEliminar(p?.id), openEliminarProducto();
                  }}
                  className="bg-red-100/20 text-red-800 border-[1px] border-red-800 py-1 px-2 rounded text-xs cursor-pointer uppercase"
                >
                  eliminar
                </Link>
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 px-3 text-sm relative">
                <Link
                  onClick={openModalEstado}
                  className={`${
                    (p.estado === "aceptado" && "bg-green-500") ||
                    (p.estado === "rechazado" && "bg-red-500") ||
                    (p.estado === "pendiente" && "bg-yellow-500")
                  } py-1 px-2 font-bold text-white rounded flex gap-1 flex-row justify-center items-center w-2/3 text-sm text-center mx-auto`}
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

        <ModalEditarEstadoFactura
          closeModalEstado={closeModalEstado}
          isOpenEstado={isOpenEstado}
          obtenerId={obtenerId}
          openModalEstado={openModalEstado}
        />
      </table>
    </div>
  );
};
