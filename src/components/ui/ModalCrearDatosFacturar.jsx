import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useFacturarDatosContext } from "../../context/FacturaDatosProvider";
import { crearDatosFacturacion } from "../../api/datosFacturacion.api";
import { ToastContainer, toast } from "react-toastify";

export const ModalCrearDatosFacturar = () => {
  const { closeModal, isOpen, setDatosFacturar, datosFacturar } =
    useFacturarDatosContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const { data: nuevoValor } = await crearDatosFacturacion(data);

    const proyectoActualizado = [...datosFacturar, nuevoValor];

    setDatosFacturar(proyectoActualizado);

    toast.success("Datos creados correctamente, ya podes facturar!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    reset();
  });

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Crear datos facturacion
                </Dialog.Title>
                <form
                  onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 space-y-2"
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Nombre de la empresa</label>
                    <input
                      {...register("nombre", { required: true })}
                      className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
                      type="text"
                      placeholder="Nombre de la compania"
                    />
                    {errors.nombre && (
                      <span className="text-xs text-red-500 font-semibold">
                        El nombre es requerido
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Email de la empresa</label>
                    <input
                      {...register("email", { required: true })}
                      className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
                      type="text"
                      placeholder="Email de la compania"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 font-semibold">
                        El email es requerido
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Numero de telefono</label>
                    <input
                      {...register("telefono", { required: true })}
                      className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
                      type="text"
                      placeholder="Numero de telefono de la compania"
                    />
                    {errors.telefono && (
                      <span className="text-xs text-red-500 font-semibold">
                        El telefono es requerido
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Dirección de la compania</label>
                    <input
                      {...register("direccion", { required: true })}
                      className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
                      type="text"
                      placeholder="Dirección de la compania"
                    />
                    {errors.direccion && (
                      <span className="text-xs text-red-500 font-semibold">
                        La direccion es requerido
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Localidad de la compania</label>
                    <input
                      {...register("localidad", { required: true })}
                      className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
                      type="text"
                      placeholder="Localidad de la compania"
                    />
                    {errors.localidad && (
                      <span className="text-xs text-red-500 font-semibold">
                        La localidad es requerido
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Detalle de la distribucion</label>
                    <input
                      {...register("detalle", { required: true })}
                      className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
                      type="text"
                      placeholder="Detalle de la compania"
                    />
                    {errors.detalle && (
                      <span className="text-xs text-red-500 font-semibold">
                        El detalle es requerido
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Crear datos facturación</label>
                    <input
                      onClick={closeModal}
                      type="submit"
                      value={"Crear datos"}
                      className="cursor-pointer py-2 px-2 bg-secondary rounded shadow shadow-black/20 text-white font-bold w-1/2"
                    />
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
                    onClick={closeModal}
                  >
                    Cerrar Ventana
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
