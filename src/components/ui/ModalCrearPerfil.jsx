import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useAluminioContext } from "../../context/AluminioProvider";
import { crearPerfilNuevo } from "../../api/perfiles.api";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export const ModalCrearPerfil = ({ closeModal, isOpen }) => {
  const { results, setPerfiles, categorias, colores } = useAluminioContext();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: nuevoValor } = await crearPerfilNuevo(data);

      const proyectoActualizado = [...results, nuevoValor];

      setPerfiles(proyectoActualizado);

      toast.success("¡Producto creado correctamente!", {
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Crear nuevo producto
                </Dialog.Title>
                <form
                  onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 space-y-2"
                >
                  {error && (
                    <p className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md w-full uppercase">
                      Ya existe un producto así
                    </p>
                  )}
                  {errors.nombre && (
                    <p className="inline-flex justify-center px-4 py-2 text-xs text-red-900 bg-red-100 border border-transparent rounded-md w-full uppercase">
                      El codigo es requerido
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Codigo:
                    </label>
                    <input
                      {...register("nombre", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="nombre del codigo"
                    />
                  </div>
                  {errors.color && (
                    <p className="inline-flex justify-center px-4 py-2 text-xs text-red-900 bg-red-100 border border-transparent rounded-md w-full uppercase">
                      El codigo es requerido
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Color:
                    </label>
                    <select
                      {...register("color", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none bg-white"
                    >
                      <option className="text-black">Seleccionar color</option>
                      {colores.map((c) => (
                        <option className="text-black" key={c.id}>
                          {c.color}
                        </option>
                      ))}
                    </select>
                  </div>
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
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="number"
                      placeholder="cantidad de productos"
                    />
                  </div>
                  {errors.peso_neto_barra_6mts && (
                    <p className="inline-flex justify-center px-4 py-2 text-xs text-red-900 bg-red-100 border border-transparent rounded-md w-full uppercase">
                      El peso es requerido
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Kg barra estimado:
                    </label>
                    <input
                      {...register("peso_neto_barra_6mts", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="kg estimado de la barra"
                    />
                  </div>
                  {errors.categoria && (
                    <p className="inline-flex justify-center px-4 py-2 text-xs text-red-900 bg-red-100 border border-transparent rounded-md w-full uppercase">
                      La categoria es requerida
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Categoria:
                    </label>
                    <select
                      {...register("categoria", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none bg-white"
                    >
                      <option className="text-black" key={categorias.id}>
                        Seleccionar categoria
                      </option>
                      {categorias.map((cat) => (
                        <option className="text-black" key={cat.id}>
                          {cat.categoria}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.descripcion && (
                    <p className="inline-flex justify-center px-4 py-2 text-xs text-red-900 bg-red-100 border border-transparent rounded-md w-full uppercase">
                      El detalle es requerido
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase">
                      Detalle:
                    </label>
                    <input
                      {...register("descripcion", { required: true })}
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="detalle ej perfil pesado ventana"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-sky-500 hover:shadow-black/20 hover:shadow transition-all ease-in-out py-2 px-2 rounded shadow shadow-black/10 outline-none text-white font-bold uppercase text-center cursor-pointer text-sm"
                      type="submit"
                      value={"Crear producto"}
                      // onClick={closeModal}
                    />
                  </div>
                </form>

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
