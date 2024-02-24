import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  actualizarClienteEntrega,
  obtenerCliente,
} from "../../api/clientes.api";
import { useClientesContext } from "../../context/ClientesProvider";
import { ToastContainer, toast } from "react-toastify";

export const ModalEditarEntrega = ({ isOpen, closeModal }) => {
  const { obtenerId, setClientes, clientes, cliente, setCliente, results } =
    useClientesContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm();

  //datos editar cliente
  useEffect(() => {
    async function loadData() {
      const res = await obtenerCliente(obtenerId);
      setCliente(res.data);

      // setValue("nombre", res.data.nombre);
      // setValue("apellido", res.data.apellido);
      // setValue("email", res.data.email);
      // setValue("telefono", res.data.telefono);
      // setValue("domicilio", res.data.domicilio);
      // setValue("localidad", res.data.localidad);
      // setValue("provincia", res.data.provincia);
      // setValue("id", res.data.id);
      // setValue("total_facturado", res.data.total_facturado);
      setValue("entrega", res.data.entrega);
      setValue("deuda_restante", res.data.deuda_restante);
    }
    loadData();
  }, [obtenerId]);

  const onSubmitEditarCliente = handleSubmit(async (data) => {
    try {
      // Validar que la entrega no sea mayor que la deuda restante
      // const entrega = parseFloat(data.entrega);
      // const deudaRestante = parseFloat(data.deuda_restante);

      // if (entrega > deudaRestante) {
      //   toast.error("La entrega no puede ser mayor que la deuda restante", {
      //     Configuración del mensaje de error
      //   });
      //   return;
      // }

      // Continuar con la lógica para actualizar el cliente si la validación es exitosa

      const res = await actualizarClienteEntrega(obtenerId, data);

      // const objetEN = JSON.parse(res.config.data);

      // const clientesActualizados = results.map((clienteState) =>
      //   clienteState.id === objetEN.id ? objetEN : clienteState
      // );

      // setClientes(clientesActualizados);

      setTimeout(() => {
        location.reload();
      }, 1000);

      toast.success("¡Cliente editado correctamente!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return res.config.data;
    } catch (error) {
      // Validar que la entrega no sea mayor que la deuda restante
      const entrega = parseFloat(data.entrega);
      const deudaRestante = parseFloat(data.deuda_restante);
      if (entrega > deudaRestante) {
        toast.error("La entrega no puede ser mayor que la deuda restante", {
          // Configuración del mensaje de error
        });
        return;
      }
      console.log(error.response.data);
      // Continuar con la lógica para actualizar el cliente si la validación es exitosa
    }
  });

  console.log(cliente?.deuda_restante);

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
                  Editar entrega - cliente
                </Dialog.Title>
                <form
                  onSubmit={onSubmitEditarCliente}
                  className="mt-2 border-t pt-4 pb-4 space-y-2"
                >
                  {errors.entrega && <p>Debes pagar lo que falta</p>}

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold">
                      Editar Entrega:
                    </label>
                    <input
                      // value={value}
                      // onChange={(e) => setVal(e.target.value)}
                      {...register("entrega", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="editar entrega"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[14px] font-bold">
                      Deuda Restante:
                    </label>
                    <div className="font-bold text-green-500 text-lg">
                      {Number(cliente?.deuda_restante).toLocaleString("es-ar", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-sky-500 text-sm uppercase hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded shadow shadow-black/10 outline-none text-white font-bold text-center cursor-pointer"
                      type="submit"
                      value={"Editar Entrega"}
                      // onClick={closeModal}
                    />
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="uppercase inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
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
