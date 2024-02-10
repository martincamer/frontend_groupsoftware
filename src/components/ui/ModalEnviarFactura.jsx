import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export const ModalEnviarFactura = ({ isOpen, closeModal }) => {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [pdf, setPdf] = useState();

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "gmailMessage",
        "template_6phnoc1",
        form.current,
        "nNctAPcyYJvqDUxkT"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

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
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Enviar factura
                </Dialog.Title>
                <form
                  ref={form}
                  onSubmit={sendEmail}
                  className="mt-2 border-t pt-4 pb-4 grid grid-cols-2 gap-4 w-[600px]"
                >
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-[14px] font-bold w-full">
                      Nombre:
                    </label>
                    <input
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="nombre del cliente"
                      name="nombre"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-[14px] font-bold w-full">
                      Apellido:
                    </label>
                    <input
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="nombre del cliente"
                      name="apellido"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-[14px] font-bold w-full">
                      Localidad:
                    </label>
                    <input
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="text"
                      placeholder="nombre del cliente"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-[14px] font-bold w-full">
                      Email:
                    </label>
                    <input
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="email"
                      name="email"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-[14px] font-bold w-full">
                      Telefono:
                    </label>
                    <input
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      id="number"
                      placeholder="Si lo envias por whatshap - email no"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full col-span-2">
                    <label className="text-[14px] font-bold w-full">
                      Mensaje factura:
                    </label>
                    <textarea
                      name="message"
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full col-span-2">
                    <label className="text-[14px] font-bold w-full">
                      Cargar factura:
                    </label>
                    <input
                      name="pdf"
                      className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                      type="file"
                    />
                  </div>
                  <div className="flex gap-2 col-span-2">
                    <button
                      type="submit"
                      className="bg-secondary py-2 px-4 rounded text-white font-bold shadow shadow-black/20"
                    >
                      Enviar por email
                    </button>
                    {/* <ReactWhatsapp
                      type="button"
                      number={number}
                      message={message}
                      className="bg-green-500 py-2 px-4 rounded text-white font-bold shadow shadow-black/20"
                    >
                      Enviar por whatshap
                    </ReactWhatsapp> */}
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
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
