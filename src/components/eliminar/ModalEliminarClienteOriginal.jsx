import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useClientesContext } from "../../context/ClientesProvider";
import { IoCloseOutline } from "react-icons/io5";

export const ModalEliminarClienteOriginal = ({
  closeEliminarProducto,
  isOpenModal,
  obtenerIdEliminar,
}) => {
  const { handleEliminar } = useClientesContext();
  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeEliminarProducto}
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
              <div className="space-y-4 w-1/3 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-end items-center">
                  <IoCloseOutline
                    onClick={() => closeEliminarProducto()}
                    className="bg-red-100 py-1 px-1 rounded-xl text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-500 transition-all ease-linear"
                  />
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg uppercase font-medium leading-6 text-gray-900"
                >
                  Eliminar
                </Dialog.Title>
                <div className="flex gap-4 items-center justify-center w-full">
                  <button
                    className="w-full px-4 py-3 text-sm text-red-900 bg-red-100 border border-transparent rounded-xl hover:bg-red-200 duration-300 cursor-pointer"
                    type="button"
                    // onClick={() => {
                    //   handleEliminarRestaurarStock(),
                    //     deleteProducto(),
                    //     handleEditarProductoModalClose();
                    // }}

                    onClick={() => {
                      handleEliminar(obtenerIdEliminar),
                        closeEliminarProducto();
                    }}
                  >
                    ELIMINAR
                  </button>
                  <button
                    className="w-full px-4 py-3 text-sm text-green-900 bg-green-100 border border-transparent rounded-xl hover:bg-green-200 duration-300 cursor-pointer"
                    type="button"
                    onClick={() => closeEliminarProducto()}
                  >
                    CERRAR
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
