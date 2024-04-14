import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { actualizarCliente, obtenerCliente } from "../../api/clientes.api";
import { useClientesContext } from "../../context/ClientesProvider";
import { ToastContainer, toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";

export const ModalEditarCliente = ({ closeModalEditar, isOpenEditar }) => {
  const { obtenerId, setClientes, clientes, setCliente } = useClientesContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  //datos editar cliente
  useEffect(() => {
    async function loadData() {
      const res = await obtenerCliente(obtenerId);
      setCliente(res.data);

      setValue("nombre", res.data.nombre);
      setValue("apellido", res.data.apellido);
      setValue("email", res.data.email);
      setValue("telefono", res.data.telefono);
      setValue("domicilio", res.data.domicilio);
      setValue("localidad", res.data.localidad);
      setValue("provincia", res.data.provincia);
      setValue("dni", res.data.dni);
      setValue("id", res.data.id);
    }
    loadData();
  }, [obtenerId]);

  //editar cliente
  const onSubmitEditarCliente = handleSubmit(async (data) => {
    const res = await actualizarCliente(obtenerId, data);
    const objetEN = JSON.parse(res.config.data);

    const clientesActualizados = clientes.map((clienteState) =>
      clienteState.id === objetEN.id ? objetEN : clienteState
    );

    setClientes(clientesActualizados);

    toast.success("¡Cliente editado correctamente!", {
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

    return res.config.data;
  });

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenEditar} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalEditar}
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
                    onClick={() => closeModalEditar()}
                    className="bg-red-100 py-1 px-1 rounded-xl text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-500 transition-all ease-linear"
                  />
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Editar el cliente
                </Dialog.Title>
                <form
                  onSubmit={onSubmitEditarCliente}
                  className="mt-2 border-t pt-4 pb-4 space-y-2"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Nombre:
                    </label>
                    <input
                      {...register("nombre", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded-xl text-sm uppercase shadow shadow-black/10 outline-none"
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
                      className="border-gray-300 border-[1px] py-2 px-2 rounded-xl text-sm uppercase shadow shadow-black/10 outline-none"
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
                      className="border-gray-300 border-[1px] py-2 px-2 rounded-xl text-sm uppercase shadow shadow-black/10 outline-none"
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
                      className="border-gray-300 border-[1px] py-2 px-2 rounded-xl text-sm uppercase shadow shadow-black/10 outline-none"
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
                      className="border-gray-300 border-[1px] py-2 px-2 rounded-xl text-sm uppercase shadow shadow-black/10 outline-none"
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
                      className="border-gray-300 border-[1px] py-2 px-2 rounded-xl text-sm uppercase shadow shadow-black/10 outline-none"
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
                      className="border-gray-300 border-[1px] py-2 px-2 rounded-xl text-sm uppercase shadow shadow-black/10 outline-none"
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
                      className="border-gray-300 border-[1px] py-2 px-2 rounded-xl text-sm uppercase shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="dni"
                    />
                  </div>
                  {/* <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      ID NO TOCAR:
                    </label>
                    <input
                      {...register("id", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded-xl text-sm uppercase shadow shadow-black/10 outline-none"
                      type="number"
                      placeholder="id"
                      disabled
                    />
                  </div> */}
                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-sky-100 hover:shadow-md transition-all ease-in-out py-3 px-2 rounded-xl outline-none text-sky-700 font-bold uppercase text-center cursor-pointer text-sm"
                      type="submit"
                      value={"Editar Cliente"}
                      onClick={closeModalEditar}
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
