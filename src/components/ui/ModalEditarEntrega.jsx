import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  actualizarClienteEntrega,
  obtenerCliente,
} from "../../api/clientes.api";
import { useClientesContext } from "../../context/ClientesProvider";
import { toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";

export const ModalEditarEntrega = ({ isOpen, closeModal }) => {
  const { obtenerId, setClientes, clientes, cliente, setCliente } =
    useClientesContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const entrega = watch("entrega");

  //datos editar cliente
  useEffect(() => {
    async function loadData() {
      const res = await obtenerCliente(obtenerId);
      setCliente(res.data);

      setValue("entrega", res.data.entrega);
      setValue("deuda_restante", res.data.deuda_restante);
    }
    loadData();
  }, [obtenerId]);

  console.log(clientes);

  const onSubmitEditarCliente = handleSubmit(async (data) => {
    try {
      const res = await actualizarClienteEntrega(obtenerId, data);

      const updateRes = JSON.parse(res.config.data);

      setClientes((clientes) => {
        return clientes.map((cliente) => {
          if (cliente.id === obtenerId) {
            return {
              ...cliente,
              deuda_restante:
                Number(cliente.deuda_restante) - Number(updateRes.entrega),
              entrega: Number(cliente.entrega) + Number(updateRes.entrega), // Sumar al total_facturado existente
            };
          }
          return cliente;
        });
      });

      setCliente((prevCliente) => {
        // Realizar una copia del cliente actual
        const nuevoCliente = { ...prevCliente };
        // Buscar el cliente con el ID correspondiente y actualizar sus propiedades
        if (nuevoCliente.id === obtenerId) {
          nuevoCliente.deuda_restante =
            Number(nuevoCliente.deuda_restante) - Number(updateRes.entrega);
          nuevoCliente.entrega =
            Number(nuevoCliente.entrega) + Number(updateRes.entrega);
        }
        // Devolver el nuevo objeto cliente actualizado
        return nuevoCliente;
      });

      toast.success("¡Entrega del cliente realizada correctamente!", {
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

      closeModal();

      reset();

      return res.config.data;
    } catch (error) {
      // Validar que la entrega no sea mayor que la deuda restante
      const entrega = parseFloat(data.entrega);
      const deudaRestante = parseFloat(data.deuda_restante);
      if (entrega > deudaRestante) {
        toast.error(
          "¡La entrega no puede ser mayor a la deuda que queda restante!",
          {
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
          }
        );
        return;
      }
      console.log(error.response.data);
      // Continuar con la lógica para actualizar el cliente si la validación es exitosa
    }
  });

  return (
    <Menu as="div" className="z-50">
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
                <div className="flex justify-end items-center">
                  <IoCloseOutline
                    onClick={() => closeModal()}
                    className="bg-red-100 py-1 px-1 rounded-xl text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-500 transition-all ease-linear"
                  />
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium uppercase leading-6 text-gray-900"
                >
                  Editar entrega del cliente{" "}
                  <span className="text-slate-500 font-normal underlines">
                    {cliente.nombre} {cliente.apellido}
                  </span>
                </Dialog.Title>
                <form
                  onSubmit={onSubmitEditarCliente}
                  className="mt-2 border-t pt-4 pb-4 space-y-2"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Poner el total de la entrega:
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        {...register("entrega", { required: true })}
                        className="border-gray-300 border-[1px] py-2 px-2 rounded-xl shadow shadow-black/10 outline-none uppercase text-sm"
                        type="text"
                        placeholder="editar entrega"
                      />
                      <p className="bg-sky-100 text-sky-700 py-2 px-5 rounded-xl shadow-md shadow-gray-300">
                        {Number(entrega).toLocaleString("es-ar", {
                          style: "currency",
                          currency: "ARS",
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start uppercase">
                    <label className="text-[14px] font-bold">
                      Deuda Restante:
                    </label>
                    <div className="font-bold text-green-700 bg-green-100 py-2 px-4 rounded-xl text-sm">
                      {Number(cliente?.deuda_restante).toLocaleString("es-ar", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-sky-100 text-sm uppercase transition-all ease-in-out py-3 px-2 rounded-xl hover:shadow-md outline-none text-sky-700 font-bold text-center cursor-pointer"
                      type="submit"
                      value={"Cargar la nueva entrega"}
                      // onClick={closeModal}
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
