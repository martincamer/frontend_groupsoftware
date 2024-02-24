import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useClientesContext } from "../../context/ClientesProvider";
import { useForm } from "react-hook-form";
import { crearCliente } from "../../api/clientes.api";
import { ToastContainer, toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";

export const ModalCrearCliente = ({ closeModal, isOpen }) => {
  const { setClientes, results } = useClientesContext();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitCrearCliente = handleSubmit(async (data) => {
    try {
      const { data: nuevoValor } = await crearCliente(data);

      const proyectoActualizado = [...results, nuevoValor];

      toast.success("¡Cliente creado correctamente!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setClientes(proyectoActualizado);

      setTimeout(() => {
        location.reload();
      }, 1500);

      closeModal();
    } catch (error) {
      setError(error.response.data);
    }
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
              <div className="inline-block w-2/3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Crear nuevo cliente
                </Dialog.Title>
                <form
                  onSubmit={onSubmitCrearCliente}
                  className="mt-2 border-t pt-4 pb-6 grid grid-cols-2 gap-2"
                >
                  {error && (
                    <p className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md w-full uppercase">
                      Ya existe un email así
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Nombre:
                    </label>
                    <input
                      {...register("nombre", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none placeholder:uppercase"
                      type="text"
                      placeholder="nombre del cliente"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Apellido:
                    </label>
                    <input
                      {...register("apellido", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none placeholder:uppercase"
                      type="text"
                      placeholder="apellido del cliente"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Email:
                    </label>
                    <input
                      {...register("email", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none placeholder:uppercase"
                      type="text"
                      placeholder="email del cliente"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Telefono
                    </label>
                    <input
                      {...register("telefono", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none placeholder:uppercase"
                      type="text"
                      placeholder="telefono"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Domicilio
                    </label>
                    <input
                      {...register("domicilio", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none placeholder:uppercase"
                      type="text"
                      placeholder="domicilio"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Localidad:
                    </label>
                    <input
                      {...register("localidad", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none placeholder:uppercase"
                      type="text"
                      placeholder="localidad"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Provincia:
                    </label>
                    <input
                      {...register("provincia", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none placeholder:uppercase"
                      type="text"
                      placeholder="provincia"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Dni:
                    </label>
                    <input
                      {...register("dni", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none placeholder:uppercase"
                      type="text"
                      placeholder="dni"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Entrega va en 0
                    </label>
                    <input
                      {...register("entrega", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none placeholder:uppercase"
                      type="text"
                      value={0}
                      placeholder="entrega"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Total va en 0
                    </label>
                    <input
                      {...register("total_facturado", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none placeholder:uppercase"
                      type="text"
                      value={0}
                      placeholder="total"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Deuda va en 0
                    </label>
                    <input
                      {...register("deuda_restante", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none placeholder:uppercase"
                      type="text"
                      value={0}
                      placeholder="total"
                    />
                  </div>
                </form>

                <div className="flex gap-2">
                  <input
                    className="bg-sky-500 hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-6 rounded shadow shadow-black/10 outline-none text-white font-bold text-center cursor-pointer text-sm uppercase"
                    type="submit"
                    value={"Crear nuevo cliente"}
                    // onClick={closeModal}
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer uppercase"
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
