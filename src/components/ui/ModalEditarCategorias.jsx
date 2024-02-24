import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useAluminioContext } from "../../context/AluminioProvider";
import { useForm } from "react-hook-form";
import {
  editarCategoria,
  obtenerUnicaCategoria,
} from "../../api/categorias.api";
import { ToastContainer, toast } from "react-toastify";

export const ModalEditarCategorias = () => {
  const {
    closeModalEditarCategoria,
    isOpenEditarCategorias,
    categorias,
    setCategorias,
    obtenerIdCategoria,
    openModalEditarCategoria,
  } = useAluminioContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    async function loadData() {
      const res = await obtenerUnicaCategoria(obtenerIdCategoria);

      setValue("categoria", res.data.categoria);
      setValue("id", res.data.id);
    }
    loadData();
  }, [openModalEditarCategoria]);

  const onSubmit = handleSubmit(async (data) => {
    const res = await editarCategoria(obtenerIdCategoria, data);

    const objetEN = JSON.parse(res.config.data);

    const categoriaActualizada = categorias.map((categoriaState) =>
      categoriaState.id === objetEN.id ? objetEN : categoriaState
    );

    setCategorias(categoriaActualizada);

    toast.success("Categoria editada correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  });

  return (
    <Menu as="div" className="z-50">
      {/* <ToastContainer /> */}
      <Transition appear show={isOpenEditarCategorias} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalEditarCategoria}
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
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl w-[350px]">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Editar categoria
                </Dialog.Title>
                <form
                  onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 space-y-2"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Editar la categoria:
                    </label>
                    <input
                      {...register("categoria", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="Editar la categoria"
                    />
                  </div>
                  <div className="flex flex-col gap-2 uppercase">
                    <label className="text-[14px] font-bold">
                      ID categoria:
                    </label>
                    <input
                      {...register("id", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="id no tocar"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-sky-500 hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded shadow shadow-black/10 outline-none text-white font-bold text-center cursor-pointer uppercase text-sm"
                      type="submit"
                      value={"Editar categoria"}
                      onClick={closeModalEditarCategoria}
                    />
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer uppercase"
                    onClick={closeModalEditarCategoria}
                  >
                    Cerrar Ventana
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
          <ToastContainer />
        </Dialog>
      </Transition>
    </Menu>
  );
};
