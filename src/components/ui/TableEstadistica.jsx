import { useState } from "react";
import { useClientesContext } from "../../context/ClientesProvider";
import { ModalEditarEntrega } from "./ModalEditarEntrega";
import { resetearClienteFacturacion } from "../../api/clientes.api";
import { toast } from "react-toastify";

export const TableEstadistica = () => {
  const { results, handleClienteSeleccionado, obtenerId } =
    useClientesContext();

  const [isOpen, setIsOpen] = useState(false);

  // Función para resetear los campos del cliente a 0 en el backend
  const resetearCamposCliente = async () => {
    try {
      const response = await axios.put(`/resetear-campos-cliente/${clienteId}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error al resetear los campos del cliente:", error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const resetearCampos = async (id) => {
    await resetearClienteFacturacion(id);

    setTimeout(() => {
      location.reload();
    }, 1500);

    toast.error("Reseteado correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Sort the results based on deuda_restante (ascending order)
  const sortedResults = [...results].sort(
    (a, b) => a.deuda_restante < b.deuda_restante
  );

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = sortedResults.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);

  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full">
      <table className="border-[1px]  p-[5px] table-auto w-full rounded uppercase">
        <thead>
          <tr>
            <th className="p-3 text-sm border-b-[2px]">Cliente</th>
            <th className="p-3 text-sm border-b-[2px]">Total facturado</th>
            <th className="p-3 text-sm border-b-[2px]">Entrego</th>
            <th className="p-3 text-sm border-b-[2px]">Deuda restante</th>
            <th className="p-3 text-sm border-b-[2px]">Resetear total deuda</th>
            <th className="p-3 text-sm border-b-[2px]">Editar entrega</th>
            {/* <th className="p-3 text-sm border-b-[2px]">Ver facturas</th> */}
            <th className="p-3 text-sm border-b-[2px]">Estado</th>
          </tr>
        </thead>
        <tbody>
          {currentResults?.map((c) => (
            <tr className="hover:bg-gray-100/60 transition-all ease-in-out duration-300 cursor-pointer">
              <th className="border-b-[1px] border-gray-300 py-4 font-normal">
                {c.nombre} {c.apellido}
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 font-normal">
                {Number(c.total_facturado).toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 font-normal">
                {Number(c?.entrega).toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 font-normal">
                {Number(c.deuda_restante).toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </th>

              <th className="border-b-[1px] border-gray-300 py-4 font-normal">
                <button
                  type="button"
                  onClick={() => {
                    resetearCampos(c?.id);
                  }}
                  className="bg-red-100/20 text-red-800 border-[1px] border-red-800 py-1 px-2 rounded text-xs cursor-pointer uppercase"
                >
                  resetear
                </button>
              </th>
              <th className="border-b-[1px] border-gray-300 py-4 font-normal">
                <button
                  onClick={() => (openModal(), handleClienteSeleccionado(c.id))}
                  type="button"
                  className="bg-sky-100/20 border-sky-500 border-[1px] py-1 px-2 text-sky-500 rounded text-xs uppercase cursor-pointer"
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
              <th className="border-b-[1px] border-gray-300 py-4 font-normal">
                <button
                  type="button"
                  className={`${
                    c.deuda_restante == 0
                      ? "bg-green-100/20 border-green-600 border-[1px] py-1 px-2 rounded shadow text-green-500 font-bold uppercase text-md"
                      : "bg-orange-100/20 border-orange-600 border-[1px] py-1 px-2 rounded shadow text-orange-500 font-bold uppercase text-md"
                  } py-1 px-2 rounded shadow font-bold text-sm uppercase`}
                >
                  {c.deuda_restante == 0 ? "pagado" : "pendiente"}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-4 mb-4 gap-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-sky-500 hover:bg-primary transition-all ease-in-out text-white shadow shadow-black/20 text-sm"
                  : "bg-gray-100 shadow shadow-black/20 text-sm"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      <ModalEditarEntrega isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};
