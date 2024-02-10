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

  const itemsPerPage = 12; // Cantidad de elementos por página
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
      <table className="border-[1px]  p-[5px] table-auto w-full rounded uppercase">
        <thead>
          <tr>
            <th className="p-3 text-sm">Cliente</th>
            <th className="p-3 text-sm">Total facturado</th>
            <th className="p-3 text-sm">Entrego</th>
            <th className="p-3 text-sm">Deuda restante</th>
            <th className="p-3 text-sm">Resetear total deuda</th>
            <th className="p-3 text-sm">Editar entrega</th>
            <th className="p-3 text-sm">Ver facturas</th>
            <th className="p-3 text-sm">Estado</th>
          </tr>
        </thead>
        <tbody>
          {currentResults?.map((c) => (
            <tr>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {c.nombre} {c.apellido}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {Number(c.total_facturado).toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {Number(c?.entrega).toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {Number(c.deuda_restante).toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </th>

              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                <button
                  type="button"
                  onClick={() => {
                    resetearCampos(c?.id);
                  }}
                  className="bg-red-500 py-1 px-2 rounded shadow text-white font-bold uppercase text-xs"
                >
                  resetear
                </button>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                <button
                  onClick={() => (openModal(), handleClienteSeleccionado(c.id))}
                  type="button"
                  className="bg-secondary py-1 px-2 rounded shadow text-white font-bold uppercase text-xs"
                >
                  editar
                </button>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                <button
                  type="button"
                  className="bg-green-500 py-1 px-2 rounded shadow text-white font-bold uppercase text-xs"
                >
                  ver facturas
                </button>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                <button
                  type="button"
                  className={`${
                    c.deuda_restante == 0 ? "bg-green-500" : "bg-orange-500"
                  } py-1 px-2 rounded shadow text-white font-bold text-sm uppercase`}
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
                  ? "bg-secondary hover:bg-primary transition-all ease-in-out text-white shadow shadow-black/20 text-sm"
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
