import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { actualizarFactura, obtenerFactura } from "../../api/factura.api";
import { useFacturaContext } from "../../context/FacturaProvider";
import { IoCloseOutline } from "react-icons/io5";
import "react-phone-input-2/lib/style.css";

export const ModalEditarEstadoFactura = ({
  closeModalEstado,
  isOpenEstado,
  obtenerId,
  openModalEstado,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { facturasMensuales, setFacturasMensuales } = useFacturaContext();

  useEffect(() => {
    async function loadData() {
      const res = await obtenerFactura(obtenerId);
      setValue("estado", res.data.estado);
      setValue("id", res.data.id);
    }
    loadData();
  }, [openModalEstado]);

  const estado = watch("estado");

  const onSubmitCrearCliente = handleSubmit(async (data) => {
    try {
      // Actualizar la factura
      const res = await actualizarFactura(obtenerId, data);
      const estadoActualizado = [...facturasMensuales];

      console.log(res);

      // Encuentra el índice del cliente que se actualizó
      const clienteIndex = estadoActualizado.findIndex(
        (cliente) => cliente.id === obtenerId
      );

      const estadoUpdated = JSON.parse(res.config.data);

      // Verifica si se encontró el cliente
      if (clienteIndex !== -1) {
        // Actualiza los campos del cliente en la copia del estado de los clientes
        estadoActualizado[clienteIndex] = {
          ...estadoActualizado[clienteIndex],
          estado: estadoUpdated.estado,
        };
      }

      setFacturasMensuales(estadoActualizado);

      toast.success("¡Estado editado correctamente!", {
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
    } catch (error) {
      console.error("Error al actualizar la factura:", error);
      // Manejar el error, si es necesario
    }
  });

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isOpenEstado} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalEstado}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-10" />
          </Transition.Child>

          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-end items-center">
                  <IoCloseOutline
                    onClick={() => closeModalEstado()}
                    className="bg-red-100 py-1 px-1 rounded-xl text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-500 transition-all ease-linear"
                  />
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Estado del presupuesto
                </Dialog.Title>
                <form
                  onSubmit={onSubmitCrearCliente}
                  className="mt-2 border-t pt-4 pb-4 space-y-2 uppercase"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold">
                      TIPO ESTADO SELECCIONAR:
                    </label>
                    <select
                      {...register("estado", { required: true })}
                      className={`${
                        (estado === "pendiente" &&
                          "bg-orange-100 text-orange-700") ||
                        (estado === "rechazado" && "bg-red-100 text-red-700") ||
                        (estado === "aceptado" && "bg-green-100 text-green-700")
                      } py-2.5 px-4 rounded-xl outline-none text-[15px] uppercase text-sm`}
                    >
                      <option value={"-"}>Seleccionar estado</option>
                      <option value={"pendiente"}>pendiente</option>
                      <option value={"aceptado"}>aceptado</option>
                      <option value={"rechazado"}>rechazado</option>
                    </select>
                  </div>
                  <div className="flex">
                    <input
                      className="uppercase bg-sky-100 hover:shadow-md transition-all ease-in-out py-3 px-5 rounded-xl outline-none text-sky-700 text-sm font-bold text-center cursor-pointer"
                      type="submit"
                      value={"Editar estado"}
                      onClick={closeModalEstado}
                    />
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
