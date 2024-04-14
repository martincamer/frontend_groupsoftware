import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useAluminioContext } from "../../context/AluminioProvider";
import { useForm } from "react-hook-form";
import {
  editarCategoria,
  obtenerUnicaCategoria,
} from "../../api/categorias.api";
import { ToastContainer, toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";

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

    toast.success("¡Categoria editada correctamente!", {
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
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl w-[350px]">
                <div className="flex justify-end items-center">
                  <IoCloseOutline
                    onClick={() => closeModalVerCategoria()}
                    className="bg-red-100 py-1 px-1 rounded-xl text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-500 transition-all ease-linear"
                  />
                </div>

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
                      className="border-gray-300 border-[1px] py-2 px-2 rounded-xl text-sm uppercase shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="Editar la categoria"
                    />
                  </div>
                  {/* <div className="flex flex-col gap-2 uppercase">
                    <label className="text-[14px] font-bold">
                      ID categoria:
                    </label>
                    <input
                      {...register("id", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded-xl text-sm uppercase shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="id no tocar"
                      disabled
                    />
                  </div> */}
                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-sky-100  transition-all ease-in-out py-3 px-2 rounded-xl outline-none text-sky-700 hover:shadow-md font-bold text-center cursor-pointer uppercase text-sm"
                      type="submit"
                      value={"Editar categoria"}
                      onClick={closeModalEditarCategoria}
                    />
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
          <ToastContainer />
        </Dialog>
      </Transition>
    </Menu>
  );
};
