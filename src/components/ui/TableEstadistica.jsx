import { useState } from "react";
import { useClientesContext } from "../../context/ClientesProvider";
import { ModalEditarEntrega } from "./ModalEditarEntrega";
import { resetearClienteFacturacion } from "../../api/clientes.api";
import { toast } from "react-toastify";

export const TableEstadistica = () => {
  const { results, handleClienteSeleccionado, clientes, setClientes } =
    useClientesContext();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const resetearCampos = async (id) => {
    const res = await resetearClienteFacturacion(id);

    // Primero, obtén una copia del estado actual de los clientes
    const clientesActualizados = [...clientes];

    // Encuentra el índice del cliente que se actualizó
    const clienteIndex = clientesActualizados.findIndex(
      (cliente) => cliente.id === id
    );

    // Verifica si se encontró el cliente
    if (clienteIndex !== -1) {
      // Actualiza los campos del cliente en la copia del estado de los clientes
      clientesActualizados[clienteIndex] = {
        ...clientesActualizados[clienteIndex],
        total_facturado: 0,
        entrega: 0,
        deuda_restante: 0,
      };

      // Actualiza el estado de los clientes con la nueva copia actualizada
      setClientes(clientesActualizados);

      // Muestra una notificación de éxito

      toast.success("¡Campos del cliente reseteados correctamente!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
      });
    } else {
      // Si no se encuentra el cliente en el estado actual, muestra un mensaje de error

      toast.error("¡No se encontro nada..!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
      });
    }
  };

  // Sort the results based on deuda_restante (ascending order)
  const sortedResults = [...results].sort(
    (a, b) => a.deuda_restante < b.deuda_restante
  );

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = sortedResults.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="border-[1px] border-gray-200 rounded-2xl hover:shadow-md transition-all ease-linear cursor-pointer flex flex-col gap-3 w-full">
        <table className="divide-slate-300 divide-y-[2px] uppercase min-w-full">
          <thead>
            <tr>
              <th className="py-4 px-3 text-sm">Cliente</th>
              <th className="py-4 px-3 text-sm">Total facturado</th>
              <th className="py-4 px-3 text-sm">Entrego</th>
              <th className="py-4 px-3 text-sm">Deuda restante</th>
              <th className="py-4 px-3 text-sm">Resetear total deuda</th>
              <th className="py-4 px-3 text-sm">Editar entrega</th>
              {/* <th className="py-4 px-3 text-sm">Ver facturas</th> */}
              <th className="py-4 px-3 text-sm">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y-[1px] divide-slate-300">
            {currentResults?.map((c) => (
              <tr className="hover:bg-gray-100/60 transition-all ease-in-out duration-300 cursor-pointer">
                <th className="py-4 font-normal">
                  {c.nombre} {c.apellido}
                </th>
                <th className="py-4 font-normal">
                  <div className="flex justify-center">
                    <p className="bg-green-100 text-green-700 py-2 px-4 rounded-xl shadow-md shadow-gray-300">
                      {Number(c.total_facturado).toLocaleString("es-ar", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </th>
                <th className="py-4 font-normal">
                  <div className="flex justify-center">
                    <p className="bg-sky-100 text-sky-700 py-2 px-4 rounded-xl shadow-md shadow-gray-300">
                      {Number(c.entrega).toLocaleString("es-ar", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </th>
                <th className="py-4 font-normal">
                  <div className="flex justify-center">
                    <p
                      className={`${
                        c.deuda_restante > 0
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      } py-2 px-4 rounded-xl shadow-md shadow-gray-300`}
                    >
                      {Number(c.deuda_restante).toLocaleString("es-ar", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </th>

                <th className="py-4 font-normal">
                  <button
                    type="button"
                    onClick={() => {
                      resetearCampos(c?.id);
                    }}
                    className="bg-red-100 text-red-700 py-2 px-4 rounded-xl uppercase text-sm"
                  >
                    resetear
                  </button>
                </th>
                <th className="py-4 font-normal">
                  <button
                    onClick={() => (
                      openModal(), handleClienteSeleccionado(c.id)
                    )}
                    type="button"
                    className="bg-sky-100 text-sky-700 py-2 px-4 rounded-xl uppercase text-sm"
                  >
                    editar
                  </button>
                </th>
                {/* <th className="border-b-[1px] border-gray-300 py-4 font-normal">
                <button
                  type="button"
                  className="bg-green-100/20 border-green-600 border-[1px] py-1 px-2 rounded shadow text-green-500 font-bold uppercase text-xs"
                >
                  ver facturas
                </button>
              </th> */}
                <th className="py-4 font-normal">
                  <button
                    type="button"
                    className={`${
                      c.deuda_restante == 0
                        ? "bg-green-100 text-green-700 py-2 px-4 rounded-xl uppercase text-sm"
                        : "bg-orange-100 text-orange-700 py-2 px-4 rounded-xl uppercase text-sm"
                    } py-1 px-2 rounded font-bold text-sm uppercase`}
                  >
                    {c.deuda_restante == 0 ? "pagado" : "pendiente"}
                  </button>
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
      <ModalEditarEntrega isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};
