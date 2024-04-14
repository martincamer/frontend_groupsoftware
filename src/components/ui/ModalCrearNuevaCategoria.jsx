import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAluminioContext } from "../../context/AluminioProvider";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { crearCategorias } from "../../api/categorias.api";
import { IoCloseOutline } from "react-icons/io5";

export const ModalCrearNuevaCategoria = ({
  isOpenCrearCategoria,
  closeModalCrearCategoria,
}) => {
  const { categorias, setCategorias } = useAluminioContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const { data: nuevoValor } = await crearCategorias(data);

    const categoriasActualizadas = [...categorias, nuevoValor];

    setCategorias(categoriasActualizadas);

    console.log(nuevoValor);

    toast.success("¡Categoria creada correctamente!", {
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

    reset();

    closeModalCrearCategoria();
  });

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenCrearCategoria} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalCrearCategoria}
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
                    onClick={() => closeModalCrearCategoria()}
                    className="bg-red-100 py-1 px-1 rounded-xl text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-500 transition-all ease-linear"
                  />
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Crear nueva categoria
                </Dialog.Title>
                <form
                  onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 space-y-2"
                >
                  {errors.categoria && (
                    <p className="inline-flex justify-center px-4 py-2 text-xs text-red-900 bg-red-100 border border-transparent rounded-md w-full uppercase">
                      La categoria a crear es requerida
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Nombre de la categoria:
                    </label>
                    <input
                      {...register("categoria", { required: true })}
                      className="border-gray-300 uppercase text-sm border-[1px] py-2 px-2 rounded-xl shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="NOMBRE DE LA CATEGORIA"
                    />
                  </div>
                  <div className="flex">
                    <input
                      className="bg-sky-100 transition-all ease-in-out py-3 px-5  outline-none text-sky-700 font-bold text-center cursor-pointer uppercase text-sm rounded-xl hover:shadow-md"
                      type="submit"
                      value={"Crear categoria"}
                      // onClick={closeModalCrearCategoria}
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
