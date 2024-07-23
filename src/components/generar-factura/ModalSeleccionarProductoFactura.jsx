import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useAluminioContext } from "../../context/AluminioProvider";
import { ModalSeleccionarCantidadProductoFacturacion } from "./ModalSeleccionarCantidadProductoFacturacion";
import { Search } from "../ui/Search";
import { Link } from "react-router-dom";
import { useFacturaContext } from "../../context/FacturaProvider";
import { IoCloseOutline } from "react-icons/io5";

export const ModalSeleccionarProductoFactura = ({
  closeModalProductos,
  isOpenProductos,
}) => {
  const { perfiles: results } = useAluminioContext();
  const { handleSeleccionarProducto, errorProducto } = useFacturaContext();

  let [isOpenModal, setIsModal] = useState(false);

  function closeModalCantidad() {
    setIsModal(false);
  }

  function openModalCantidad() {
    setIsModal(true);
  }

  const [searchTermCliente, setSearchTermCliente] = useState("");

  const handleSearchClienteChange = (e) => {
    setSearchTermCliente(e.target.value);
  };

  let filteredData = results.filter((cliente) => {
    const matchesSearchTermNombre =
      cliente.nombre.toLowerCase().includes(searchTermCliente.toLowerCase()) ||
      cliente.apellido.toLowerCase().includes(searchTermCliente.toLowerCase());

    return matchesSearchTermNombre;
  });

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenProductos} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalProductos}
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
              <div className="w-3/4 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <div className="flex justify-end items-center">
                  <IoCloseOutline
                    onClick={() => closeModalProductos()}
                    className="bg-red-100 py-1 px-1 rounded-xl text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-500 transition-all ease-linear"
                  />
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Elegir Producto
                </Dialog.Title>

                {errorProducto && (
                  <div>
                    <span className="bg-red-500 py-2 px-2 text-white font-bold rounded-md">
                      ¡El producto ya existe!
                    </span>
                  </div>
                )}
                <div className="border-[1px] border-gray-30 rounded-2xl hover:shadow-md w-full h-[30vh] overflow-y-scroll">
                  <table className="cursor-pointer uppercase min-w-full divide-y-[1px] divide-slate-300">
                    <thead>
                      <tr>
                        <th className="py-4 px-3 text-sm font-extrabold text-center">
                          Codigo
                        </th>
                        <th className="py-4 px-3 text-sm font-extrabold text-center">
                          Stock
                        </th>
                        <th className="py-4 px-3 text-sm font-extrabold text-center">
                          Detalle
                        </th>
                        <th className="py-4 px-3 text-sm font-extrabold text-center">
                          Color
                        </th>
                        <th className="py-4 px-3 text-sm font-extrabold text-center">
                          Categoria
                        </th>
                        <th className="py-4 px-3 text-sm font-extrabold text-center">
                          Peso Barra
                        </th>
                        <th className="py-4 px-3 text-sm font-extrabold text-center">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-[1px] divide-slate-300">
                      {filteredData.map((c) => (
                        <tr key={c.id}>
                          {/* <th className="border-[1px] border-gray-300 p-2 text-sm text-center w-[20px]">
                            {c.id}
                          </th> */}
                          <th className="py-3 px-3 text-sm font-bold text-center">
                            {c.nombre}
                          </th>
                          <th className="py-3 px-3 text-sm font-bold text-center flex justify-center">
                            <p
                              className={`${
                                c.stock > 0
                                  ? "bg-green-100 text-green-700 "
                                  : "text-red-800 bg-red-100"
                              } rounded-xl py-2 px-3 shadow-md shadow-gray-300`}
                            >
                              {c.stock}
                            </p>
                          </th>
                          <th className="py-3 px-3 text-sm font-normal text-center">
                            {c.descripcion}
                          </th>
                          <th className="py-3 px-3 text-sm font-normal text-center">
                            {c.color}
                          </th>
                          <th className="py-3 px-3 text-sm font-normal text-center">
                            {c.categoria}
                          </th>
                          <th className="py-3 px-3 text-sm font-bold text-center">
                            {c.peso_neto_barra_6mts} kg
                          </th>
                          <th className="py-3 px-3 text-sm font-normal w-[120px] text-center">
                            <Link
                              onClick={() => {
                                openModalCantidad(),
                                  handleSeleccionarProducto(c.id);
                              }}
                              className="bg-sky-100 py-3 px-2 text-center text-sky-700 rounded-xl"
                            >
                              Seleccionar
                            </Link>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ModalSeleccionarCantidadProductoFacturacion
                  isOpenModal={isOpenModal}
                  closeModalCantidad={closeModalCantidad}
                  openModalCantidad={openModalCantidad}
                  closeModalProductos={closeModalProductos}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
