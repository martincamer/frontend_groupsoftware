import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { SearchClientes } from "./SearchClientes";
import { useClientesContext } from "../../context/ClientesProvider";
import { usePresupuestoContext } from "../../context/PresupuestoProvider";
import { useFacturaContext } from "../../context/FacturaProvider";

export const ModalSeleccionarCliente = ({
  closeModalCliente,
  isOpenCliente,
}) => {
  const [dis, setDis] = useState(false);

  const { search, searcher, clientes: results } = useClientesContext();

  const { handleSeleccionarCliente, addToClientes } = usePresupuestoContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Elegir cliente
                </Dialog.Title>
                <SearchClientes search={search} searcher={searcher} />
                <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full h-[30vh] overflow-y-scroll">
                  <table className="border-[1px]  p-[5px] table-auto w-full rounded uppercase">
                    <thead>
                      <tr>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Nombre
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Apellido
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Localidad
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((c) => (
                        <tr key={c.id}>
                          <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center">
                            {c.nombre}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center">
                            {c.apellido}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center">
                            {c.localidad}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm  w-[120px] text-center">
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
                                  c.dni
                                ),
                                  closeModalCliente();
                              }}
                              className="bg-cyan-500 py-1 px-2 text-center text-white rounded-md uppercase text-sm"
                            >
                              Seleccionar
                            </button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
                  onClick={closeModalCliente}
                >
                  Cerrar Ventana
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
