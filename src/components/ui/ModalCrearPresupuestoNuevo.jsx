import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { usePresupuestoContext } from "../../context/PresupuestoProvider";
import { ModalSeleccionarCliente } from "./ModalSeleccionarCliente";
import { Link } from "react-router-dom";
import { ModalSeleccionarProducto } from "./ModalSeleccionarProducto";

export const ModalCrearPresupuestoNuevo = () => {
  const { closeModal, isOpen } = usePresupuestoContext();
  let [isOpenCliente, setIsOpenCliente] = useState(false);
  let [isOpenProductos, setIsOpenProductos] = useState(false);

  const {
    register,
    deleteToResetClientes,
    productoSeleccionado,
    deleteToResetProductos,
    deleteProducto,
    totalKg,
    totalBarras,
    handlePerfil,
    totalPagar,
  } = usePresupuestoContext();

  function closeModalCliente() {
    setIsOpenCliente(false);
  }

  function openModalCliente() {
    setIsOpenCliente(true);
  }

  function closeModalProductos() {
    setIsOpenProductos(false);
  }

  function openModalProductos() {
    setIsOpenProductos(true);
  }

  const result = totalPagar().toLocaleString("es-ar", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  const sumasPorCategoria = {};

  // Iteramos sobre los resultados
  productoSeleccionado?.forEach((producto) => {
    const { categoria, totalPrecioUnitario, totalKG } = producto;

    // Si la categoría ya existe en el objeto
    if (sumasPorCategoria[categoria]) {
      // Le sumamos el totalPrecioUnitario y totalKG
      sumasPorCategoria[categoria].totalPrecioUnitario += totalPrecioUnitario;
      sumasPorCategoria[categoria].totalKG += totalKG;
    } else {
      // Si no existe, creamos la entrada con el totalPrecioUnitario y totalKG
      sumasPorCategoria[categoria] = {
        totalPrecioUnitario,
        totalKG,
      };
    }
  });

  // Convertimos el objeto a un arreglo
  const arreglo = Object.entries(sumasPorCategoria).map(
    ([categoria, valores]) => ({
      categoria,
      ...valores,
    })
  );

  console.log("Arreglo:", arreglo);

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
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Crear nuevo presupuesto
                </Dialog.Title>
                <form
                  // onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 flex flex-col gap-4 w-[1220px]"
                >
                  <div className="font-semibold text-[18px] uppercase">
                    Datos Cliente
                  </div>
                  <div>
                    <Link
                      onClick={openModalCliente}
                      className="font-semibold uppercase bg-sky-500 text-white py-2 px-2 rounded shadow shadow-black/30 hover:translate-x-1 transition-all ease-in-out text-sm"
                    >
                      Seleccionar Cliente
                    </Link>
                  </div>
                  <ModalSeleccionarCliente
                    openModalCliente={openModalCliente}
                    closeModalCliente={closeModalCliente}
                    isOpenCliente={isOpenCliente}
                  />
                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-semibold uppercase">
                        Nombre:
                      </label>
                      <input
                        {...register("nombre", { required: true })}
                        className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                        type="text"
                        placeholder="NOMBRE"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-semibold uppercase">
                        Apellido:
                      </label>
                      <input
                        {...register("apellido", { required: true })}
                        className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                        type="text"
                        placeholder="APELLIDO"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-semibold uppercase">
                        Localidad:
                      </label>
                      <input
                        {...register("localidad", { required: true })}
                        className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                        type="text"
                        placeholder="LOCALIDAD"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-semibold uppercase">
                        Provincia:
                      </label>
                      <input
                        {...register("provincia", { required: true })}
                        className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                        type="text"
                        placeholder="PROVINCIA"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-semibold uppercase">
                        Email:
                      </label>
                      <input
                        {...register("email", { required: true })}
                        className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                        type="text"
                        placeholder="EMAIL"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-semibold uppercase">
                        Telefono:
                      </label>
                      <input
                        {...register("telefono", { required: true })}
                        className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                        type="text"
                        placeholder="TELEFONO"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-semibold uppercase">
                        Dni:
                      </label>
                      <input
                        {...register("dni", { required: true })}
                        className="border-gray-300 border-[1px] py-2 px-2 rounded shadow shadow-black/10 outline-none"
                        type="text"
                        placeholder="DNI"
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => deleteToResetClientes()}
                      className="inline-flex justify-center px-4 py-2 font-bold text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer uppercase text-sm"
                    >
                      Resetear campos del cliente
                    </div>
                  </div>
                  <div className="font-semibold uppercase text-[18px] mt-5">
                    Datos Productos
                  </div>
                  <div>
                    <Link
                      onClick={openModalProductos}
                      className="font-semibold uppercase text-sm bg-sky-500 text-white py-2 px-2 rounded shadow shadow-black/30 hover:translate-x-1 transition-all ease-in-out"
                    >
                      Seleccionar Producto
                    </Link>
                  </div>
                  <ModalSeleccionarProducto
                    openModalProductos={openModalProductos}
                    closeModalProductos={closeModalProductos}
                    isOpenProductos={isOpenProductos}
                  />
                  <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full h-[40vh] overflow-y-scroll">
                    <table className="border-[1px]  p-[5px] table-auto w-full rounded uppercase">
                      <thead>
                        <tr>
                          {/* <th className="p-2 text-sm font-extrabold text-center w-[20px]">
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
                            Categoria
                          </th>
                          <th className="p-2 text-sm font-extrabold text-center">
                            Barras
                          </th>
                          <th className="p-2 text-sm font-extrabold text-center">
                            kg
                          </th>
                          <th className="p-2 text-sm font-extrabold text-center">
                            Eliminar
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productoSeleccionado.map((p) => (
                          <tr key={p.id}>
                            {/* <th className="border-[1px] border-gray-300 p-2 text-sm text-center w-[20px]">
                              {p.id}
                            </th> */}
                            <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center">
                              {p.nombre}
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center">
                              {p.detalle}
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center">
                              {p.color}
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center">
                              {p.categoria}
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center">
                              {p.barras}
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center">
                              {p.totalKG.toLocaleString("arg")} kg
                            </th>
                            <th className="border-[1px] border-gray-300 p-2 text-sm font-normal text-center">
                              <button
                                className="inline-flex justify-center px-4 py-2 text-xs text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer font-bold text-center uppercase"
                                onClick={() => deleteProducto()}
                              >
                                eliminar producto
                              </button>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <button
                      onClick={() => deleteToResetProductos()}
                      className="inline-flex justify-center px-4 py-2  text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer font-bold uppercase text-sm"
                      type="button"
                    >
                      Resetear productos
                    </button>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="font-semibold uppercase">Total kg:</p>{" "}
                    <div className="border-[1px] border-gray-200 shadow rounded py-2 px-2 text-center w-[160px] font-extrabold">
                      {totalKg().toLocaleString("arg", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      KG
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="font-semibold uppercase">Total de barras:</p>{" "}
                    <div className="border-[1px] border-gray-200 shadow rounded py-2 px-2 text-center w-[160px] font-extrabold">
                      {totalBarras()}
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <p className="font-semibold uppercase">Total pagar:</p>{" "}
                    <div
                      className={
                        " border-[1px] border-gray-200 shadow rounded py-2 px-2 text-center w-[200px] font-extrabold"
                      }
                    >
                      {result}
                    </div>
                  </div>

                  {arreglo?.map((a, index) => (
                    <div key={index}>
                      <p className="font-bold uppercase text-lg text-sky-500">
                        TOTAL EN {a?.categoria}:{" "}
                        <span className="font-normal text-slate-700">
                          {" "}
                          {a?.totalPrecioUnitario?.toLocaleString("es-ar", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </p>
                      <p className="font-semibold uppercase text-sm">
                        Total en kgs: {a?.totalKG} kgs
                      </p>
                    </div>
                  ))}
                  {/* {totalKgNuevoResultado?.map((t) => (
                    <div>
                      <p>{t?.categoria}</p>
                    </div>
                  ))} */}
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => {
                        closeModal(), handlePerfil();
                      }}
                      className="bg-sky-500 py-2 px-2 rounded text-white font-bold shadow-md hover:translate-x-1 transition-all ease-in-out uppercase text-sm"
                    >
                      Generar Presupuesto
                    </button>
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
