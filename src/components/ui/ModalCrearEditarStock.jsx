import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editarPerfil, obtenerUnicoPerfil } from "../../api/perfiles.api";
import { useAluminioContext } from "../../context/AluminioProvider";
import { toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";

export const ModalCrearEditarStock = ({ closeModalEditar, isOpenEditar }) => {
  const { obtenerId, perfiles, setPerfiles } = useAluminioContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    async function loadData() {
      const res = await obtenerUnicoPerfil(obtenerId);

      setValue("nombre", res.data.nombre);
      setValue("color", res.data.color);
      setValue("stock", res.data.stock);
      setValue("peso_neto_barra_6mts", res.data.peso_neto_barra_6mts);
      setValue("categoria", res.data.categoria);
      setValue("descripcion", res.data.descripcion);
      setValue("disponible", res.data.disponible);
      setValue("id", res.data.id);
    }
    loadData();
  }, [obtenerId]);

  const onSubmitEditar = handleSubmit(async (data) => {
    const res = await editarPerfil(obtenerId, data);

    const objetEN = JSON.parse(res.config.data);

    const perfilesActualizados = perfiles.map((perfilState) =>
      perfilState.id === objetEN.id ? objetEN : perfilState
    );

    setPerfiles(perfilesActualizados);

    toast.success("¡Producto editado correctamente!", {
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

    closeModalEditar();
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
                  Editar el producto
                </Dialog.Title>
                <form
                  onSubmit={onSubmitEditar}
                  className="mt-2 border-t pt-4 pb-4 space-y-2"
                >
                  {errors.stock && (
                    <p className="inline-flex justify-center px-4 py-2 text-xs text-red-900 bg-red-100 border border-transparent rounded-md w-full uppercase">
                      El stock es requerido
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Stock total:
                    </label>
                    <input
                      {...register("stock", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded-xl uppercase text-sm shadow shadow-black/10 outline-none"
                      type="number"
                      placeholder="cantidad de productos"
                    />
                  </div>
                  <div className="flex">
                    <input
                      className="bg-sky-100 transition-all ease-in-out py-3 px-8 rounded-2xl outline-none text-sky-700 uppercase text-center cursor-pointer text-sm hover:shadow-md hover:font-bold"
                      type="submit"
                      value={"Editar producto"}
                      // onClick={closeModalEditar}
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
