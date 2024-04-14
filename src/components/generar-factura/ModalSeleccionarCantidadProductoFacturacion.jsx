import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useFacturaContext } from "../../context/FacturaProvider";
import { editarPerfilStock } from "../../api/perfiles.api";
import { IoCloseOutline } from "react-icons/io5";
import { useAluminioContext } from "../../context/AluminioProvider";

export const ModalSeleccionarCantidadProductoFacturacion = ({
  isOpenModal,
  closeModalCantidad,
}) => {
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [totalKgFinal, setTotalKgFinal] = useState(0);
  const { productoUnicoState, setProductoUnico, addToProductos } =
    useFacturaContext();
  const { setPerfiles } = useAluminioContext();

  const [error, setError] = useState(false);

  const handleClickEditarStock = async () => {
    try {
      const res = await editarPerfilStock(productoUnicoState?.id, { cantidad });

      const updatePerfil = JSON.parse(res.config.data);

      // Actualizar total_facturado en setClientes
      setPerfiles((perfiles) => {
        return perfiles.map((perfil) => {
          if (perfil.id === productoUnicoState?.id) {
            return {
              ...perfil,
              stock: Number(perfil.stock) - Number(updatePerfil.cantidad),
            };
          }
          return perfil;
        });
      });

      setProductoUnico((prevProducto) => {
        // Realizar una copia del cliente actual
        const nuevoProducto = { ...prevProducto };
        // Buscar el cliente con el ID correspondiente y actualizar sus propiedades
        if (nuevoProducto.id === productoUnicoState?.id) {
          nuevoProducto.stock =
            Number(nuevoProducto.stock) - Number(updatePerfil.cantidad);
        }
        // Devolver el nuevo objeto cliente actualizado
        return nuevoProducto;
      });

      // Agregar producto al contexto o hacer lo que sea necesario
      addToProductos(
        productoUnicoState.id,
        productoUnicoState.nombre,
        productoUnicoState.descripcion,
        productoUnicoState.color,
        cantidad,
        totalKgFinal * cantidad,
        productoUnicoState.categoria,
        Number(totalKgFinal * cantidad * precio),
        precio
      );

      closeModalCantidad();
    } catch (error) {
      setTimeout(() => {
        setError(false);
      }, 1500);
      setError(error.response.data);
    }
  };

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
              <div className="w-4/5 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <div className="flex justify-end items-center">
                  <IoCloseOutline
                    onClick={() => closeModalCantidad()}
                    className="bg-red-100 py-1 px-1 rounded-xl text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-500 transition-all ease-linear"
                  />
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Elegir Cantidad Producto
                </Dialog.Title>
                {error && (
                  <p className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md w-full uppercase">
                    La cantidad ingresada es mayor al stock
                  </p>
                )}
                <div className="border-[1px] border-gray-200 rounded-2xl shadow-black/10 hover:shadow w-full">
                  <table className="uppercase divide-y-[1px] divide-slate-300 min-w-full">
                    <thead>
                      <tr>
                        <th className="py-3 px-3 text-sm font-extrabold text-center">
                          Codigo
                        </th>
                        <th className="py-3 px-3 text-sm font-extrabold text-center">
                          Detalle
                        </th>
                        <th className="py-3 px-3 text-sm font-extrabold text-center">
                          Color
                        </th>
                        <th className="py-3 px-3 text-sm font-extrabold text-center">
                          Barras
                        </th>
                        <th className="py-3 px-3 text-sm font-extrabold text-center">
                          Peso de la barra
                        </th>
                        <th className="py-3 px-3 text-sm font-extrabold text-center">
                          Cantidad de barras
                        </th>
                        <th className="py-3 px-3 text-sm font-extrabold text-center">
                          Precio total kg
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-[1px] divide-slate-300 cursor-pointer">
                      <th className="py-4 px-3 text-sm text-center font-normal w-[20px]">
                        {productoUnicoState.nombre}
                      </th>
                      <th className="py-4 px-3 text-sm text-center font-normal w-[50px]">
                        {productoUnicoState.descripcion}
                      </th>
                      <th className="py-4 px-3 text-sm text-center font-normal w-[20px]">
                        {productoUnicoState.color}
                      </th>

                      <th className="py-4 px-3 text-sm text-center font-normal w-[20px]">
                        {productoUnicoState.stock}
                      </th>
                      <th className="py-4 px-3 text-sm text-center font-normal w-[50px]">
                        <div className="flex gap-5 items-center justify-center">
                          Peso neto - {productoUnicoState.peso_neto_barra_6mts}{" "}
                          kg
                          <input
                            onChange={(e) => setTotalKgFinal(e.target.value)}
                            type="text"
                            value={totalKgFinal}
                            className="border-[1px] border-black/30 rounded-xl p-2 w-[100px] outline-none uppercase text-xs"
                          />
                        </div>
                      </th>
                      <th className="py-4 px-3 text-sm text-center w-[120px]">
                        <input
                          onChange={(e) => setCantidad(e.target.value)}
                          type="number"
                          className="border-[1px] border-black/30 rounded-xl p-2 w-[130px] outline-none uppercase text-xs"
                          placeholder="Cant de brs."
                        />
                      </th>
                      <th className="py-4 px-3 text-sm text-center w-[120px]">
                        <input
                          onChange={(e) => setPrecio(e.target.value)}
                          type="number"
                          className="border-[1px] border-black/30 rounded-xl p-2 w-[115px] outline-none uppercase text-xs"
                          placeholder="Precio kg"
                        />
                      </th>
                    </tbody>
                  </table>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleClickEditarStock();
                    }}
                    className="bg-sky-100 text-sky-700 py-3 px-4 rounded-xl font-bold hover:shadow-md hover:shadow-black/20 hover:translate-x-1 transition-all ease-in-out uppercase text-sm"
                  >
                    Crear producto facturar
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
