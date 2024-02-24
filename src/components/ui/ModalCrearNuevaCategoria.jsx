import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAluminioContext } from "../../context/AluminioProvider";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { crearCategorias } from "../../api/categorias.api";

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

    closeModalCrearCategoria();
  });

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
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
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="NOMBRE DE LA CATEGORIA"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-sky-500 hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded shadow shadow-black/10 outline-none text-white font-bold text-center cursor-pointer uppercase text-sm"
                      type="submit"
                      value={"Crear categoria"}
                      // onClick={closeModalCrearCategoria}
                    />
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer uppercase"
                    onClick={closeModalCrearCategoria}
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
