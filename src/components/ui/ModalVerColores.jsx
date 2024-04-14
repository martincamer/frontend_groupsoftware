import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useAluminioContext } from "../../context/AluminioProvider";
import { ModalEditarColor } from "./ModalEditarColor";
import { IoCloseOutline } from "react-icons/io5";

export const ModalVerColores = () => {
  const {
    colores,
    isOpenEditarColores,
    handleColorSeleccionada,
    closeModalEditarColores,
    handleEliminarColor,
    openModalEditarColor,
  } = useAluminioContext();

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenEditarColores} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalEditarColores}
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
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl w-[1000px]">
                <div className="flex justify-end items-center">
                  <IoCloseOutline
                    onClick={() => closeModalEditarColores()}
                    className="bg-red-100 py-1 px-1 rounded-xl text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-500 transition-all ease-linear"
                  />
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Editar o eliminar colores
                </Dialog.Title>
                <div className="grid grid-cols-3 gap-4 my-5 h-[120px] overflow-y-scroll w-full">
                  {colores.map((c) => (
                    <div
                      className="bg-white border-[1px] border-gray-200 py-2 px-2 rounded-2xl hover:shadow-md transition-all ease-linear cursor-pointer flex justify-center gap-3 items-center h-[58px] uppercase text-sm"
                      key={c.id}
                    >
                      <p className="text-black font-bold">{c.color}</p>
                      <BiEdit
                        onClick={() => {
                          handleColorSeleccionada(c.id);
                          openModalEditarColor();
                        }}
                        className="text-[35px] text-sky-400 cursor-pointer bg-white rounded-full py-1 px-1 shadow shadow-black/20 border-[1px] border-black/30"
                      />
                      <AiFillDelete
                        onClick={() => handleEliminarColor(c.id)}
                        className="text-[35px] text-red-400 cursor-pointer bg-white rounded-full py-1 px-1 shadow shadow-black/20 border-[1px] border-black/30"
                      />
                    </div>
                  ))}
                </div>

                <ModalEditarColor />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
