import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { SearchClientes } from "../ui/SearchClientes";
import { useClientesContext } from "../../context/ClientesProvider";
import { useFacturaContext } from "../../context/FacturaProvider";
import { IoCloseOutline } from "react-icons/io5";

export const ModalSeleccionarClienteFacturacion = ({
  closeModalCliente,
  isOpenCliente,
}) => {
  const { search, searcher, results } = useClientesContext();
  const { addToClientes } = useFacturaContext();

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenCliente} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalCliente}
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
              <div className="w-3/4 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <div className="flex justify-end items-center">
                  <IoCloseOutline
                    onClick={() => closeModalCliente()}
                    className="bg-red-100 py-1 px-1 rounded-xl text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-500 transition-all ease-linear"
                  />
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Elegir cliente
                </Dialog.Title>
                <SearchClientes search={search} searcher={searcher} />
                <div className="border-[1px] border-gray-300 rounded-2xl hover:shadow-black/10 hover:shadow flex flex-col gap-3 w-full h-[30vh] overflow-y-scroll">
                  <table className="min-w-full uppercase divide-y-[1px] divide-slate-300">
                    <thead>
                      <tr>
                        <th className="py-3 px-3 text-sm font-extrabold text-center">
                          Nombre
                        </th>
                        <th className="py-3 px-3 text-sm font-extrabold text-center">
                          Apellido
                        </th>
                        <th className="py-3 px-3 text-sm font-extrabold text-center">
                          Localidad
                        </th>
                        <th className="py-3 px-3 text-sm font-extrabold text-center">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-[1px] divide-slate-300">
                      {results.map((c) => (
                        <tr key={c.id}>
                          <th className="px-3 py-3 font-normal text-sm text-center">
                            {c.nombre}
                          </th>
                          <th className="px-3 py-3 font-normal text-sm text-center">
                            {c.apellido}
                          </th>
                          <th className="px-3 py-3 font-normal text-sm text-center">
                            {c.localidad}
                          </th>
                          <th className="px-3 py-3 text-sm w-[120px] text-center">
                            <button
                              onClick={() => {
                                addToClientes(
                                  c.id,
                                  c.nombre,
                                  c.apellido,
                                  c.localidad,
                                  c.provincia,
                                  c.email,
                                  c.telefono,
                                  c.dni,
                                  c.total_facturado,
                                  c.deuda_restante
                                ),
                                  closeModalCliente();
                              }}
                              className="bg-green-100 py-2 px-4 text-center text-green-700 rounded-xl uppercase"
                            >
                              Seleccionar
                            </button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
