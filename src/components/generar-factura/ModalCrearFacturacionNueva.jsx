import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useFacturaContext } from "../../context/FacturaProvider";
import { ModalSeleccionarProductoFactura } from "./ModalSeleccionarProductoFactura";
import { ModalSeleccionarClienteFacturacion } from "./ModalSeleccionarClienteFacturacion";
import { editarPerfilEliminarStock } from "../../api/perfiles.api";
import { ModalEliminarProducto } from "./ModalEliminarProducto";
import { ToastContainer } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAluminioContext } from "../../context/AluminioProvider";

export const ModalCrearFacturacionNueva = () => {
  const { closeModal, isOpen, handleEditarProductoModalOpen } =
    useFacturaContext();
  const { setPerfiles, setProductoUnico } = useAluminioContext();
  let [isOpenCliente, setIsOpenCliente] = useState(false);
  let [isOpenProductos, setIsOpenProductos] = useState(false);
  let [isOpenReset, setIsOpenReset] = useState(false);

  const {
    register,
    deleteToResetClientes,
    productoSeleccionado,
    totalKg,
    totalBarras,
    handlePerfil,
    totalPagar,
  } = useFacturaContext();

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

  function closeModalReset() {
    setIsOpenReset(false);
  }

  function openModalReset() {
    setIsOpenReset(true);
  }

  const result = totalPagar().toLocaleString("es-ar", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  const [click, setClick] = useState("");
  const [cantidad, setCantidad] = useState(0);

  const handleEliminarRestaurarStock = async () => {
    const res = await editarPerfilEliminarStock(click, { cantidad });

    const updatePerfil = JSON.parse(res.config.data);

    // Actualizar total_facturado en setClientes
    setPerfiles((perfiles) => {
      return perfiles.map((perfil) => {
        if (perfil.id === click) {
          return {
            ...perfil,
            stock: Number(perfil.stock) + Number(updatePerfil.cantidad),
          };
        }
        return perfil;
      });
    });

    setProductoUnico((prevProducto) => {
      // Realizar una copia del cliente actual
      const nuevoProducto = { ...prevProducto };
      // Buscar el cliente con el ID correspondiente y actualizar sus propiedades
      if (nuevoProducto.id === click) {
        nuevoProducto.stock =
          Number(nuevoProducto.stock) + Number(updatePerfil.cantidad);
      }
      // Devolver el nuevo objeto cliente actualizado
      return nuevoProducto;
    });
  };

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

  // Crear un objeto para almacenar los resultados agrupados
  const resultados = {};

  // Iterar sobre los datos
  productoSeleccionado.forEach((dato) => {
    const clave = `${dato.categoria}-${dato.precio}`;

    // Verificar si la clave ya existe en los resultados
    if (resultados[clave]) {
      // Si existe, sumar los valores correspondientes
      resultados[clave].totalPrecioUnitario += dato.totalPrecioUnitario;
      resultados[clave].totalKG += dato.totalKG;
    } else {
      // Si no existe, agregar una nueva entrada en los resultados
      resultados[clave] = {
        categoria: dato.categoria,
        color: dato.color,
        precio: dato.precio,
        totalPrecioUnitario: dato.totalPrecioUnitario,
        totalKG: dato.totalKG,
      };
    }
  });

  // Convertir el objeto de resultados de nuevo a un array
  const resultadosArray = Object.values(resultados);

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
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-end items-center">
                  <IoCloseOutline
                    onClick={() => closeModal()}
                    className="bg-red-100 py-1 px-1 rounded-xl text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-500 transition-all ease-linear"
                  />
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Crear nueva venta
                </Dialog.Title>
                <form
                  // onSubmit={onSubmit}
                  className="mt-2 border-t pt-4 pb-4 flex flex-col gap-4 w-[1220px]"
                >
                  <div className="font-bold text-[18px] uppercase">
                    Datos Cliente
                  </div>
                  <div className="flex">
                    <Link
                      onClick={openModalCliente}
                      className="font-bold uppercase text-sm bg-sky-100 text-sky-700 py-3 px-5 rounded-xl hover:shadow shadow-black/10 hover:translate-x-1 transition-all ease-in-out flex items-center gap-2"
                    >
                      Seleccionar Cliente
                      <FaUserPlus className="text-2xl" />
                    </Link>
                  </div>
                  <ModalSeleccionarClienteFacturacion
                    openModalCliente={openModalCliente}
                    closeModalCliente={closeModalCliente}
                    isOpenCliente={isOpenCliente}
                  />
                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-bold uppercase">
                        Nombre:
                      </label>
                      <input
                        {...register("nombre", { required: true })}
                        className="border-gray-300 uppercase text-sm border-[1px] py-3 px-4 rounded-2xl shadow shadow-black/10 outline-none placeholder:uppercase"
                        type="text"
                        placeholder="nombre"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-bold uppercase">
                        Apellido:
                      </label>
                      <input
                        {...register("apellido", { required: true })}
                        className="border-gray-300 uppercase text-sm border-[1px] py-3 px-4 rounded-2xl shadow shadow-black/10 outline-none placeholder:uppercase"
                        type="text"
                        placeholder="apellido"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-bold uppercase">
                        Localidad:
                      </label>
                      <input
                        {...register("localidad", { required: true })}
                        className="border-gray-300 uppercase text-sm border-[1px] py-3 px-4 rounded-2xl shadow shadow-black/10 outline-none placeholder:uppercase"
                        type="text"
                        placeholder="localidad"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-bold uppercase">
                        Provincia:
                      </label>
                      <input
                        {...register("provincia", { required: true })}
                        className="border-gray-300 uppercase text-sm border-[1px] py-3 px-4 rounded-2xl shadow shadow-black/10 outline-none placeholder:uppercase"
                        type="text"
                        placeholder="provincia"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-bold uppercase">
                        Email:
                      </label>
                      <input
                        {...register("email", { required: true })}
                        className="border-gray-300 uppercase text-sm border-[1px] py-3 px-4 rounded-2xl shadow shadow-black/10 outline-none placeholder:uppercase"
                        type="text"
                        placeholder="email"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-bold uppercase">
                        Telefono:
                      </label>
                      <input
                        {...register("telefono", { required: true })}
                        className="border-gray-300 uppercase text-sm border-[1px] py-3 px-4 rounded-2xl shadow shadow-black/10 outline-none placeholder:uppercase"
                        type="text"
                        placeholder="telefono"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-bold uppercase">
                        Dni:
                      </label>
                      <input
                        {...register("dni", { required: true })}
                        className="border-gray-300 uppercase text-sm border-[1px] py-3 px-4 rounded-2xl shadow shadow-black/10 outline-none placeholder:uppercase"
                        type="text"
                        placeholder="dni"
                        disabled
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => deleteToResetClientes()}
                      className="inline-flex justify-center px-6 py-3 font-bold text-red-900 bg-red-100 border border-transparent rounded-xl hover:bg-red-200 duration-300 cursor-pointer uppercase text-sm"
                    >
                      Resetear campos del cliente
                    </div>
                  </div>
                  <div className="font-bold text-[18px] mt-5 uppercase">
                    Datos Productos
                  </div>
                  <div>
                    <Link
                      onClick={openModalProductos}
                      className="uppercase text-sm font-bold bg-sky-100 text-sky-700 py-3 px-4 rounded-xl hover:shadow shadow-black/10 hover:translate-x-1 transition-all ease-in-out"
                    >
                      Seleccionar Producto
                    </Link>
                  </div>
                  <ModalSeleccionarProductoFactura
                    openModalProductos={openModalProductos}
                    closeModalProductos={closeModalProductos}
                    isOpenProductos={isOpenProductos}
                  />
                  <div className="border-[1px] border-gray-300 rounded-2xl shadow-black/10 hover:shadow w-full h-[30vh] overflow-y-scroll">
                    <table className="min-w-full uppercase divide-slate-300 divide-y-[1px]">
                      <thead>
                        <tr>
                          {/* <th className="p-2 text-sm font-extrabold text-center w-[20px]">
                            Numero
                          </th> */}
                          <th className="py-4 px-3 text-sm font-extrabold text-center">
                            Codigo
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
                            Barras
                          </th>
                          <th className="py-4 px-3 text-sm font-extrabold text-center">
                            kg
                          </th>
                          <th className="py-4 px-3 text-sm font-extrabold text-center">
                            Eliminar
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-slate-300 divide-y-[1px] font-normal">
                        {productoSeleccionado.map((p) => (
                          <tr key={p.id}>
                            <th className="py-3 px-3 text-sm text-center font-normal">
                              {p.nombre}
                            </th>
                            <th className="py-3 px-3 text-sm text-center font-normal">
                              {p.detalle}
                            </th>
                            <th className="py-3 px-3 text-sm text-center font-normal">
                              {p.color}
                            </th>
                            <th className="py-3 px-3 text-sm text-center font-normal">
                              {p.categoria}
                            </th>
                            <th className="py-3 px-3 text-sm text-center font-bold">
                              {p.barras}
                            </th>
                            <th className="py-3 px-3 text-sm text-center font-bold">
                              {p.totalKG.toLocaleString("arg")} kg
                            </th>
                            <th className="py-3 px-3 text-sm text-center font-normal">
                              <button
                                type="button"
                                className="inline-flex justify-center px-6 py-3 text-sm uppercase text-red-900 bg-red-100 border border-transparent rounded-xl hover:bg-red-200 duration-300 cursor-pointer font-bold text-center"
                                onClick={() => {
                                  handleEditarProductoModalOpen(),
                                    setClick(p?.id),
                                    setCantidad(p?.barras);
                                }}
                              >
                                eliminar producto
                              </button>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* <div>
                    <button
                      onClick={openModalReset}
                      className="inline-flex justify-center px-4 py-2 text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer font-bold uppercase text-sm"
                      type="button"
                    >
                      Resetear productos
                    </button>

                    <ModalResetearCampos
                      closeModalReset={closeModalReset}
                      isOpenReset={isOpenReset}
                    />
                  </div> */}
                  {/* <div className="flex gap-2 items-center">
                    <p className="font-bold uppercase">
                      Seleccionar tipo factura:
                    </p>{" "}
                    <select
                      onChange={(e) => setTipoFactura(e.target.value)}
                      className="py-2 px-4 rounded bg-white font-bold border-[1px] shadow uppercase"
                    >
                      <option>-</option>
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>R</option>
                      <option>N</option>
                      <option>X</option>
                      <option>-</option>
                    </select>
                  </div> */}
                  <div className="flex gap-2 items-center">
                    <p className="font-bold uppercase">Total kg:</p>{" "}
                    <div className="border-[1px] border-gray-200 shadow rounded-xl py-2 px-2 text-center w-[100px] font-extrabold">
                      {totalKg().toLocaleString("arg", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      kg
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="font-bold uppercase">Total de barras:</p>{" "}
                    <div className="border-[1px] border-gray-200 shadow rounded-xl py-2 px-2 text-center w-[100px] font-extrabold">
                      {totalBarras()}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="font-bold uppercase">Total pagar:</p>{" "}
                    <div className="border-[1px] border-gray-200 shadow rounded-xl py-2 px-2 text-center w-[130px] font-extrabold">
                      {result}
                    </div>
                  </div>
                  {resultadosArray?.map((a, index) => (
                    <div key={index}>
                      <p className="font-bold uppercase text-lg text-slate-700 flex gap-2">
                        TOTAL EN {a?.categoria}{" "}
                        <span className="text-sky-500 font-semibold">
                          {" "}
                          {a?.totalPrecioUnitario?.toLocaleString("es-ar", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </p>
                      <p className="font-semibold uppercase text-sm text-slate-700 flex gap-2">
                        Color{" "}
                        <span className=" text-sky-500 font-semibold">
                          {a?.color}
                        </span>
                      </p>
                      <p className="font-semibold uppercase text-sm text-slate-700 flex gap-2">
                        Total en kg:{" "}
                        <span className=" text-sky-500 font-semibold">
                          {a?.totalKG?.toLocaleString("es-ar", {
                            minimumFractionDigits: 2,
                          })}{" "}
                          kg
                        </span>
                      </p>
                      <p className="font-semibold uppercase text-sm text-slate-700 border-b-[1px] border-gray-300 flex gap-2">
                        Precio Unitario
                        <span className=" text-sky-500 font-semibold">
                          {Number(a?.precio).toLocaleString("es-ar", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          })}{" "}
                        </span>
                      </p>
                    </div>
                  ))}

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => {
                        closeModal(), handlePerfil();
                      }}
                      className="bg-sky-100 py-3 px-5 rounded-xl text-sky-700 font-bold hover:shadow-md hover:translate-x-1 transition-all ease-in-out uppercase text-sm flex gap-2 items-center"
                    >
                      Generar Venta
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </form>

                <ModalEliminarProducto
                  handleEliminarRestaurarStock={handleEliminarRestaurarStock}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
