import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { usePresupuestoContext } from "../../context/PresupuestoProvider";

export const ModalSeleccionarCantidadProducto = ({
  isOpenModal,
  closeModalCantidad,
}) => {
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [pesoBarraNeto, setPesoBarra6mts] = useState(0);

  const { productoUnicoState, addToProductos } = usePresupuestoContext();

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalCantidad}
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
              <div className="w-4/5 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Elegir Cantidad Producto
                </Dialog.Title>

                <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full uppercase">
                  <table className="border-[1px]  p-[5px] table-auto w-full rounded">
                    <thead>
                      <tr>
                        {/* <th className="p-2 text-sm font-extrabold text-center">
                          Numero
                        </th> */}
                        <th className="p-2 text-sm font-extrabold text-center">
                          Codigo
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Detalle
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Color
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Peso Barra
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Stock de brs.
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Cantidad de barras
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Precio total kg
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <th className="border-[1px] border-gray-300 p-2 text-sm text-center w-[20px]">
                        {productoUnicoState.id}
                      </th> */}
                      <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center w-[20px]">
                        {productoUnicoState.nombre}
                      </th>
                      <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center w-[50px]">
                        {productoUnicoState.descripcion}
                      </th>
                      <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center w-[20px]">
                        {productoUnicoState.color}
                      </th>
                      <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center w-[20px] capitalize">
                        peso neto{" "}
                        <span className="font-bold">
                          ({productoUnicoState.peso_neto_barra_6mts} kg)
                        </span>
                        <input
                          onChange={(e) => setPesoBarra6mts(e.target.value)}
                          value={pesoBarraNeto}
                          type="number"
                          className="border-[1px] border-black/30 rounded p-2 w-[100px] outline-none ml-2"
                          placeholder="ej: 2.55"
                        />{" "}
                      </th>
                      <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center w-[20px]">
                        {productoUnicoState.stock}
                      </th>
                      <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center w-[100px]">
                        <input
                          onChange={(e) => setCantidad(e.target.value)}
                          type="number"
                          className="border-[1px] border-black/30 rounded p-2 w-[100px] outline-none"
                          placeholder="cantidad"
                        />
                      </th>
                      <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center w-[100px]">
                        <input
                          onChange={(e) => setPrecio(e.target.value)}
                          type="number"
                          className="border-[1px] border-black/30 rounded p-2 w-[100px] outline-none"
                          placeholder="precio kg"
                        />
                      </th>
                    </tbody>
                  </table>
                </div>
                <div>
                  <button
                    onClick={() => {
                      addToProductos(
                        productoUnicoState.id,
                        productoUnicoState.nombre,
                        productoUnicoState.descripcion,
                        productoUnicoState.color,
                        cantidad,
                        pesoBarraNeto * cantidad,
                        productoUnicoState.categoria,
                        pesoBarraNeto * cantidad * precio
                      ),
                        closeModalCantidad();
                    }}
                    className="bg-sky-500 text-white py-2 px-2 rounded font-bold hover:shadow-md hover:shadow-black/20 hover:translate-x-1 transition-all ease-in-out uppercase text-sm"
                  >
                    Crear producto facturar
                  </button>
                </div>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer uppercase"
                  onClick={closeModalCantidad}
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
