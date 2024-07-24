import { useClientesContext } from "../../../context/ClientesProvider";
import { useFacturaContext } from "../../../context/FacturaProvider";
import { useEffect, useState } from "react";
import { useAluminioContext } from "../../../context/AluminioProvider";
import { FaList, FaSearch } from "react-icons/fa";
import { formatearFecha } from "../../../helpers/formatearFecha";
import { useObtenerId } from "../../../helpers/obtenerId";
import { formatearDinero } from "../../../helpers/formatearDinero";
import { useForm } from "react-hook-form";
import { showSuccessToastError } from "../../../helpers/toast";
import { BiDownload, BiEdit, BiFile, BiSend } from "react-icons/bi";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DescargarPresupuesto } from "../../../components/DescargarPresupuesto";
import client from "../../../api/axios";
import { useFacturarDatosContext } from "../../../context/FacturaDatosProvider";
import { FacturaDocumentDonwload } from "../../../components/FacturaDocumentDonwload";

export const VentasRealizadas = () => {
  const { facturasMensuales } = useFacturaContext();

  const { handleObtenerId, idObtenida } = useObtenerId();

  const [searchTermCliente, setSearchTermCliente] = useState(""); // Obtener el primer día del mes actual
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Convertir las fechas en formato YYYY-MM-DD para los inputs tipo date
  const fechaInicioPorDefecto = firstDayOfMonth.toISOString().split("T")[0];
  const fechaFinPorDefecto = lastDayOfMonth.toISOString().split("T")[0];

  // Estado inicial de las fechas con el rango del mes actual
  const [fechaInicio, setFechaInicio] = useState(fechaInicioPorDefecto);
  const [fechaFin, setFechaFin] = useState(fechaFinPorDefecto);

  const handleSearchClienteChange = (e) => {
    setSearchTermCliente(e.target.value);
  };

  let filteredData = facturasMensuales.filter((cliente) => {
    const matchesSearchTermNombre =
      cliente.clientes.nombre
        .toLowerCase()
        .includes(searchTermCliente.toLowerCase()) ||
      cliente.clientes.apellido
        .toLowerCase()
        .includes(searchTermCliente.toLowerCase());

    return matchesSearchTermNombre;
  });

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);
  };

  // Filtrar por rango de fechas
  if (fechaInicio && fechaFin) {
    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);
    filteredData = filteredData.filter((item) => {
      const fechaOrden = new Date(item.created_at);
      return fechaOrden >= fechaInicioObj && fechaOrden <= fechaFinObj;
    });
  }

  // Ordenar por fecha de mayor a menor
  filteredData.sort((a, b) => {
    const fechaA = new Date(a.created_at);
    const fechaB = new Date(b.created_at);
    return fechaB - fechaA; // Ordena de mayor a menor (fecha más reciente primero)
  });

  filteredData.sort((a, b) => b.id - a.id);

  console.log(filteredData);

  const totalPagarVentas = filteredData
    .filter((factura) => factura.punto === "venta")
    .reduce((total, factura) => total + factura.estadistica.total_pagar, 0);

  const totalDeKgVendidos = filteredData
    .filter((factura) => factura.punto === "venta")
    .reduce((total, factura) => total + factura.estadistica.total_kg, 0);

  const totalDeBarrasVendidas = filteredData
    .filter((factura) => factura.punto === "venta")
    .reduce((total, factura) => total + factura.estadistica.total_barras, 0);

  const totalPagarPresupuestos = filteredData
    .filter((factura) => factura.punto === "presupuesto")
    .reduce((total, factura) => total + factura.estadistica.total_pagar, 0);

  return (
    <main className="h-full w-full min-h-screen max-h-full">
      <section className="max-md:w-full mx-auto h-full flex flex-col gap-10">
        <div className="bg-gray-100 py-10 px-10 flex justify-between">
          <p className="text-gray-900 font-bold text-xl">
            Crear nuevas ventas o presupuestos.
          </p>
          <div className="">
            <button
              onClick={() =>
                document.getElementById("my_modal_crear_cliente").showModal()
              }
              type="button"
              className="font-semibold text-sm bg-[#FD454D] text-white py-1.5 px-5 rounded-md"
            >
              Crear nuevo presupuesto o venta.
            </button>
          </div>
        </div>
        <div className="mx-10 flex justify-between items-center">
          <div className="flex gap-2 w-1/2">
            <div className="border flex gap-2 items-center border-gray-300 py-1 px-3 text-sm rounded-md w-1/2">
              <FaSearch className="text-gray-400" />
              <input
                value={searchTermCliente}
                onChange={handleSearchClienteChange}
                placeholder="Buscar el cliente por el nombre o apellido.."
                className="outline-none font-medium w-full"
              />{" "}
            </div>
            <div className="flex gap-2 items-center">
              <div className="">
                <input
                  value={fechaInicio}
                  onChange={handleFechaInicioChange}
                  type="date"
                  className="bg-white text-sm font-semibold border border-gray-300 rounded-md py-2 px-3 outline-none"
                  placeholder="Fecha de inicio"
                />
              </div>
              <div>
                <input
                  value={fechaFin}
                  onChange={handleFechaFinChange}
                  type="date"
                  className="bg-white text-sm font-semibold border border-gray-300 rounded-md py-2 px-3 outline-none"
                  placeholder="Fecha fin"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="dropdown dropdown-left dropdown-hover">
              <div tabIndex={0} role="button">
                <button className="font-semibold text-sm bg-blue-500 py-2 px-2 rounded-md text-white">
                  Estadisticas de las ordenes
                </button>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-gray-700 rounded-md z-[1] w-[600px] px-5 py-5 mr-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50/10 border border-gray-500 py-5 px-5 rounded-md flex flex-col gap-1">
                    <p className="font-medium text-white text-lg">
                      Total en ventas
                    </p>
                    <p className="text-white font-bold text-lg">
                      {formatearDinero(totalPagarVentas)}
                    </p>
                  </div>
                  <div className="bg-gray-50/10 border border-gray-500 py-5 px-5 rounded-md flex flex-col gap-1">
                    <p className="font-medium text-white text-lg">
                      Total en presupuestos
                    </p>
                    <p className="text-white font-bold text-lg">
                      {formatearDinero(totalPagarPresupuestos)}
                    </p>
                  </div>
                  <div className="bg-gray-50/10 border border-gray-500 py-5 px-5 rounded-md flex flex-col gap-1">
                    <p className="font-medium text-white text-lg">
                      Total en kg vendidos
                    </p>
                    <p className="text-white font-bold text-lg">
                      {totalDeKgVendidos} kgs
                    </p>
                  </div>{" "}
                  <div className="bg-gray-50/10 border border-gray-500 py-5 px-5 rounded-md flex flex-col gap-1">
                    <p className="font-medium text-white text-lg">
                      Total en barras
                    </p>
                    <p className="text-white font-bold text-lg">
                      {totalDeBarrasVendidas} brs
                    </p>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div></div>
        <div className="mx-10 pb-10">
          <table className="table">
            <thead>
              <tr>
                <th className="font-bold text-gray-900 text-xs">Numero</th>
                <th className="font-bold text-gray-900 text-xs">Cliente</th>
                <th className="font-bold text-gray-900 text-xs">Total</th>
                <th className="font-bold text-gray-900 text-xs">
                  Tipo de estado
                </th>{" "}
                <th className="font-bold text-gray-900 text-xs">Punto</th>
                <th className="font-bold text-gray-900 text-xs">
                  Fecha de emisión
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="uppercase text-xs font-medium">
              {filteredData.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    {p.clientes.nombre} {p.clientes.apellido}
                  </td>{" "}
                  <td>
                    <div className="flex">
                      <p
                        className={` ${
                          p.punto === "venta"
                            ? "bg-green-100/80 text-green-600"
                            : "bg-orange-100/80 text-orange-600"
                        }  py-1 px-2 font-semibold  rounded-md`}
                      >
                        {Number(p.estadistica.total_pagar).toLocaleString(
                          "es-ar",
                          {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          }
                        )}
                      </p>
                    </div>
                  </td>{" "}
                  <td>
                    {" "}
                    <div className="flex">
                      <p
                        className={` ${
                          p.punto === "venta"
                            ? "bg-green-100/80 text-green-600"
                            : "bg-orange-100/80 text-orange-600"
                        }  py-1 px-2 font-semibold  rounded-md`}
                      >
                        {p.punto === "venta"
                          ? "Venta finalizada"
                          : "En espera de presupuesto."}
                      </p>
                    </div>
                  </td>
                  <td>
                    {" "}
                    <div className="flex">
                      <p
                        className={` ${
                          p.punto === "venta"
                            ? "bg-green-100/80 text-green-600"
                            : "bg-orange-100/80 text-orange-600"
                        }  py-1 px-2 font-semibold  rounded-md`}
                      >
                        {p.punto}
                      </p>
                    </div>
                  </td>
                  <td>{formatearFecha(p.created_at)}</td>{" "}
                  <td>
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="hover:bg-[#FD454D] py-2 px-2 rounded-full hover:text-white text-lg"
                      >
                        <FaList />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-white rounded-md shadow-2xl z-[1] w-52 p-1"
                      >
                        {p.punto === "presupuesto" && (
                          <li className="hover:bg-gray-700 hover:text-white text-xs rounded-md font-semibold">
                            <button
                              onClick={() => {
                                {
                                  handleObtenerId(p.id),
                                    document
                                      .getElementById(
                                        "my_modal_actualizar_presupuesto_venta"
                                      )
                                      .showModal();
                                }
                              }}
                              type="button"
                            >
                              Actualizar la orden
                            </button>
                          </li>
                        )}
                        {p.punto === "presupuesto" && (
                          <li className="hover:bg-gray-700 hover:text-white text-xs rounded-md font-semibold">
                            <button
                              onClick={() => {
                                {
                                  handleObtenerId(p.id),
                                    document
                                      .getElementById(
                                        "my_modal_factura_presupuesto"
                                      )
                                      .showModal();
                                }
                              }}
                              type="button"
                            >
                              Descargar presupuesto
                            </button>
                          </li>
                        )}
                        {p.punto === "venta" && (
                          <li className="hover:bg-gray-700 hover:text-white text-xs rounded-md font-semibold">
                            <button
                              onClick={() => {
                                {
                                  handleObtenerId(p.id),
                                    document
                                      .getElementById("my_modal_factura_venta")
                                      .showModal();
                                }
                              }}
                              type="button"
                            >
                              Descargar venta realizada
                            </button>
                          </li>
                        )}
                        <li className="hover:bg-gray-700 hover:text-white text-xs rounded-md font-semibold">
                          <button
                            onClick={() => {
                              {
                                handleObtenerId(p.id),
                                  document
                                    .getElementById("my_modal_eliminar")
                                    .showModal();
                              }
                            }}
                            type="button"
                          >
                            Eliminar venta
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <ModalCrearPresupuestoVenta />
      <ModalActualizarPresupuesto idObtenida={idObtenida} />
      <ModalEliminar idObtenida={idObtenida} />
      <ModalFacturaPresupuesto idObtenida={idObtenida} />
      <ModalFacturaVenta idObtenida={idObtenida} />
    </main>
  );
};

// VENTANAS MODAL.
const ModalCrearPresupuestoVenta = () => {
  const { setPerfiles, setProductoUnico } = useAluminioContext();

  const {
    register,
    deleteToResetClientes,
    productoSeleccionado,
    totalKg,
    totalBarras,
    handlePerfil,
    totalPagar,
    deleteProducto,
    setPunto,
    punto,
  } = useFacturaContext();

  const [isEditable, setIsEditable] = useState(false);

  const handleInputClick = () => {
    setIsEditable(true);
  };

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

  const resultados = {};

  // Iterar sobre los datos
  productoSeleccionado.forEach((dato) => {
    const clave = `${dato.categoria}-${dato.precio}`;

    if (resultados[clave]) {
      resultados[clave].totalPrecioUnitario += dato.totalPrecioUnitario;
      resultados[clave].totalKG += dato.totalKG;
    } else {
      resultados[clave] = {
        categoria: dato.categoria,
        color: dato.color,
        precio: dato.precio,
        totalPrecioUnitario: dato.totalPrecioUnitario,
        totalKG: dato.totalKG,
      };
    }
  });

  const resultadosArray = Object.values(resultados);

  return (
    <dialog id="my_modal_crear_cliente" className="modal">
      <div className="modal-box rounded-none max-w-full max-h-full h-full w-full z-0">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Crear nuevo presupuesto o venta.</h3>
        <p className="py-1 text-sm font-medium">
          En esta sesión podras crear un nuevo presupuesto o venta.
        </p>
        <article className="mt-2 border-t pt-4 pb-4 space-y-2">
          {" "}
          <div className="mb-4 flex-col gap-2 inline-flex">
            <label className="text-sm font-bold">
              Seleccionar el punto de venta
            </label>
            <select
              className="border py-1 px-2 rounded-md text-sm font-semibold"
              value={punto}
              onChange={(e) => setPunto(e.target.value)}
            >
              <option className="font-bold text-xs text-blue-500" value={""}>
                Seleccionar tipo
              </option>{" "}
              <option className="text-xs font-semibold" value={"presupuesto"}>
                Presupuesto
              </option>
              <option className="text-xs font-semibold" value={"venta"}>
                Venta
              </option>
            </select>
          </div>
          <div className="flex">
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("my_modal_seleccionar_cliente")
                  .showModal()
              }
              className="bg-blue-600 text-white py-1 px-4  rounded-md text-sm font-bold"
            >
              Seleccionar Cliente
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold uppercase">Nombre:</label>
              <input
                {...register("nombre", { required: true })}
                className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase"
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
                className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase"
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
                className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase"
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
                className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase"
                type="text"
                placeholder="provincia"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold uppercase">Email:</label>
              <input
                {...register("email", { required: true })}
                className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase"
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
                className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase"
                type="text"
                placeholder="telefono"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold uppercase">Dni:</label>
              <input
                {...register("dni", { required: true })}
                className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase"
                type="text"
                placeholder="dni"
                disabled
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => deleteToResetClientes()}
              className="bg-red-500 inline-flex px-4 py-1 text-white font-semibold text-sm rounded-md"
            >
              Resetear campos del cliente
            </button>
          </div>
          <div className="pt-4">
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("my_modal_seleccionar_productos")
                  .showModal()
              }
              className="bg-blue-600 text-white py-1 px-4  rounded-md text-sm font-bold"
            >
              Seleccionar Producto
            </button>
          </div>
          <div>
            <table className="table">
              <thead className="text-gray-900 font-bold">
                <tr>
                  <th>Codigo</th>
                  <th>Detalle</th>
                  <th>Color</th>
                  <th>Categoria</th>
                  <th>Barras</th>
                  <th>kg</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody className="uppercase text-xs font-medium">
                {productoSeleccionado.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>{p.detalle}</td>
                    <td>{p.color}</td>
                    <td>{p.categoria}</td>
                    <th className="font-bold">{p.barras}</th>
                    <th className="font-bold">
                      {p.totalKG.toLocaleString("arg")} kg
                    </th>
                    <th>
                      <button
                        type="button"
                        className="inline-flex bg-red-500 px-2 py-1 rounded-md text-white uppercase"
                        onClick={() => deleteProducto(p?.id)}
                      >
                        eliminar producto
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-4 px-4 bg-gray-700 text-white">
            <div className="flex gap-2 items-center">
              <p className="font-bold uppercase">Total kg:</p>{" "}
              <div className="font-semibold text-gray-300">
                {totalKg().toLocaleString("arg", {
                  minimumFractionDigits: 2,
                })}{" "}
                kg
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-bold uppercase">Total de barras:</p>{" "}
              <div className="font-semibold text-gray-300">{totalBarras()}</div>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-bold uppercase">Total pagar:</p>{" "}
              <div className="font-semibold text-gray-300">{result}</div>
            </div>
          </div>
          {resultadosArray?.map((a, index) => (
            <div key={index}>
              <p className="font-bold uppercase text-lg text-slate-700 flex gap-2">
                TOTAL EN {a?.categoria}{" "}
                <span className="text-blue-500 font-semibold">
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
                <span className=" text-blue-500 font-semibold">{a?.color}</span>
              </p>
              <p className="font-semibold uppercase text-sm text-slate-700 flex gap-2">
                Total en kg:{" "}
                <span className=" text-blue-500 font-semibold">
                  {a?.totalKG?.toLocaleString("es-ar", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  kg
                </span>
              </p>
              <p className="font-semibold uppercase text-sm text-slate-700 border-b-[1px] border-gray-300 flex gap-2">
                Precio Unitario
                <span className=" text-blue-500 font-semibold">
                  {Number(a?.precio).toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}{" "}
                </span>
              </p>
            </div>
          ))}
          <div className="flex pt-3">
            <input
              onClick={() => handlePerfil()}
              className="bg-red-500 text-white px-5 rounded-md py-1 text-sm font-bold cursor-pointer"
              type="button"
              value={"Generar presupuesto o venta"}
            />
          </div>
        </article>

        <ModalSeleccionarCliente />
        <ModalSeleccionarPerfiles />
      </div>
    </dialog>
  );
};

const ModalSeleccionarCliente = () => {
  const { clientes: results } = useClientesContext();
  const { addToClientes } = useFacturaContext();

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
    <dialog id="my_modal_seleccionar_cliente" className="modal">
      <div className="modal-box rounded-md max-w-4xl h-[50vh] scroll-bar">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Seleccionar un cliente.</h3>
        <div className="border flex gap-2 items-center border-gray-300 py-1 px-3 text-sm rounded-md">
          <FaSearch className="text-gray-400" />
          <input
            value={searchTermCliente}
            onChange={handleSearchClienteChange}
            placeholder="Buscar el cliente por el nombre o apellido.."
            className="outline-none font-medium w-full"
          />{" "}
        </div>
        <div className="mt-4">
          <table className="table">
            <thead className="font-bold text-gray-900">
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Localidad</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((c) => (
                <tr className="upppercase text-xs font-medium" key={c.id}>
                  <td className=" uppercase">{c.nombre}</td>
                  <td className=" uppercase">{c.apellido}</td>
                  <td className=" uppercase">{c.localidad}</td>
                  <td className=" uppercase">
                    <button
                      onClick={() => {
                        document
                          .getElementById("my_modal_seleccionar_cliente")
                          .close(),
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
                          );
                      }}
                      className="bg-blue-500 py-1 px-5 rounded-md text-white font-semibold"
                    >
                      SELECCIONAR CLIENTE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
};

const ModalSeleccionarPerfiles = () => {
  const { perfiles: results } = useAluminioContext();
  const { handleSeleccionarProducto, errorProducto } = useFacturaContext();
  const { categorias, colores } = useAluminioContext();

  const [searchTermCliente, setSearchTermCliente] = useState("");
  const [selectedColor, setSelectedColor] = useState(""); // Estado para el color seleccionado
  const [selectedCategoria, setSelectedCategoria] = useState(""); // Estado para la categoría seleccionada

  const handleSearchClienteChange = (e) => {
    setSearchTermCliente(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setSelectedCategoria(e.target.value);
  };

  let filteredData = results.filter((perfil) => {
    const matchesSearchTermNombre = perfil.nombre
      .toLowerCase()
      .includes(searchTermCliente.toLowerCase());

    const matchesSearchTermDescripcion = perfil.descripcion
      .toLowerCase()
      .includes(searchTermCliente.toLowerCase());

    const matchesColor = selectedColor === "" || perfil.color === selectedColor; // Filtrar por color
    const matchesCategoria =
      selectedCategoria === "" || perfil.categoria === selectedCategoria; // Filtrar por categoría

    // Verificar si se seleccionó "Todos los colores" o "Todas las categorías"
    const showAllColors = selectedColor === "";
    const showAllCategories = selectedCategoria === "";

    // Mostrar todos los perfiles si se selecciona "Todos los colores" o "Todas las categorías"
    if (showAllColors && showAllCategories) {
      return matchesSearchTermNombre || matchesSearchTermDescripcion;
    }

    // Aplicar el filtro normalmente si se selecciona un color y/o categoría específicos
    return (
      (matchesSearchTermNombre || matchesSearchTermDescripcion) &&
      matchesColor &&
      matchesCategoria
    );
  });

  filteredData.sort((a, b) => b.stock - a.stock);

  return (
    <dialog id="my_modal_seleccionar_productos" className="modal">
      <div className="modal-box rounded-md max-w-7xl h-[50vh] scroll-bar">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Seleccionar un perfil.</h3>
        <div className="flex gap-2 mt-2 w-full">
          <div className="border flex gap-2 items-center border-gray-300 py-1 px-3 w-1/4 text-sm rounded-md">
            <FaSearch className="text-gray-400" />
            <input
              value={searchTermCliente}
              onChange={handleSearchClienteChange}
              placeholder="Buscar.."
              className="outline-none font-medium"
            />{" "}
          </div>
          <div className="border border-gray-300 py-1 px-3 text-sm rounded-md">
            <select
              value={selectedCategoria}
              onChange={handleCategoriaChange}
              className="outline-none cursor-pointer uppercase text-xs font-semibold"
            >
              <option value={""} className="uppercase font-bold text-xs">
                Todas las categorias
              </option>{" "}
              {categorias.map((c) => (
                <option
                  className="uppercase font-semibold text-xs"
                  value={c.categoria}
                >
                  {c.categoria}
                </option>
              ))}
            </select>{" "}
          </div>
          <div className="border border-gray-300 py-1 px-3 text-sm rounded-md">
            <select
              value={selectedColor}
              onChange={handleColorChange}
              className="outline-none cursor-pointer uppercase text-xs font-semibold"
            >
              <option value={""} className="uppercase font-bold text-xs">
                Todos los colores
              </option>
              {colores.map((c) => (
                <option
                  className="uppercase font-semibold text-xs"
                  value={c.color}
                >
                  {c.color}
                </option>
              ))}
            </select>{" "}
          </div>
        </div>
        {errorProducto && (
          <div>
            <span className="bg-red-500 py-2 px-2 text-white font-bold rounded-md">
              ¡El producto ya existe!
            </span>
          </div>
        )}
        <div className="mt-2">
          <table className="table">
            <thead>
              <tr>
                <th className="font-bold text-gray-900">Codigo</th>
                <th className="font-bold text-gray-900">Stock</th>
                <th className="font-bold text-gray-900">Detalle</th>
                <th className="font-bold text-gray-900">Color</th>
                <th className="font-bold text-gray-900">Categoria</th>
                <th className="font-bold text-gray-900">Peso Barra</th>
                <th className="font-bold text-gray-900">Seleccionar</th>
              </tr>
            </thead>
            <tbody className="uppercase text-xs font-medium">
              {filteredData
                .sort((a, b) => b.stock - a.stock)
                .map((c) => (
                  <tr key={c.id}>
                    <th>{c.nombre}</th>
                    <th>
                      <div className="flex">
                        <p
                          className={`${
                            c.stock > 0
                              ? "bg-green-100 text-green-700 "
                              : "text-red-800 bg-red-100"
                          }  py-1 px-2 rounded-md`}
                        >
                          {c.stock}
                        </p>
                      </div>
                    </th>
                    <th>{c.descripcion}</th>
                    <th>{c.color}</th>
                    <th>{c.categoria}</th>
                    <th>{c.peso_neto_barra_6mts} kg</th>
                    <th>
                      <button
                        onClick={() => {
                          handleSeleccionarProducto(c.id),
                            document
                              .getElementById("my_modal_seleccionar_cantidad")
                              .showModal();
                        }}
                        className="bg-blue-500 py-1 px-4 rounded-md text-white"
                      >
                        Seleccionar
                      </button>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <ModalSeleccionarCantidadPerfil />
      </div>
    </dialog>
  );
};

const ModalSeleccionarCantidadPerfil = () => {
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [totalKgFinal, setTotalKgFinal] = useState(0);
  const { productoUnicoState, addToProductos } = useFacturaContext();

  const crearProductoNuevo = () => {
    try {
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

      document.getElementById("my_modal_seleccionar_cantidad").close();
    } catch (error) {
      console.log(error);
    }
  };

  const [isEditable, setIsEditable] = useState(false);

  const handleInputClick = () => {
    setIsEditable(true);
  };

  return (
    <dialog id="my_modal_seleccionar_cantidad" className="modal">
      <div className="modal-box rounded-md max-w-6xl scroll-bar">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">
          Rellena los campos y crea el producto a facturar o presupuestar.
        </h3>
        <div className="my-4">
          <table className="table">
            <thead className="font-bold text-gray-900">
              <tr>
                <th>Codigo</th>
                <th>Detalle</th>
                <th>Color</th>
                <th>Barras</th>
                <th>Peso de la barra</th>
                <th>Cantidad de barras</th>
                <th>Precio total kg</th>
              </tr>
            </thead>
            <tbody className="uppercase text-xs font-medium">
              <td>{productoUnicoState.nombre}</td>
              <td>{productoUnicoState.descripcion}</td>
              <td>{productoUnicoState.color}</td>

              <td>{productoUnicoState.stock}</td>
              <th>
                <div className="flex gap-5 items-center justify-center">
                  {productoUnicoState.peso_neto_barra_6mts} kg
                  <input
                    onChange={(e) => setTotalKgFinal(e.target.value)}
                    type="text"
                    value={totalKgFinal}
                    className="border-[1px] border-gray-300 rounded-md p-2 outline-none uppercase text-xs"
                  />
                </div>
              </th>
              <th className="py-4 px-3 text-sm text-center ">
                <input
                  onChange={(e) => setCantidad(e.target.value)}
                  value={cantidad}
                  type="number"
                  className="border-[1px] border-gray-300 rounded-md p-2 outline-none uppercase text-xs"
                  placeholder="Cant de brs."
                />
              </th>
              <th className="py-4 px-3 text-sm text-center">
                <div onClick={handleInputClick}>
                  {isEditable ? (
                    <input
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                      onBlur={() => setIsEditable(false)}
                      type="number"
                      className="border-[1px] border-gray-300 rounded-md p-2 outline-none uppercase text-xs"
                      placeholder="Precio kg"
                    />
                  ) : (
                    <p
                      className="border-[1px] border-gray-300 rounded-md p-2 outline-none uppercase text-xs"
                      type="text"
                    >
                      {formatearDinero(Number(precio))}
                    </p>
                  )}
                </div>
              </th>
            </tbody>
          </table>
        </div>
        <div>
          <button
            onClick={() => {
              crearProductoNuevo();
            }}
            className="bg-[#FD454D] px-4 py-1 text-white font-semibold text-sm rounded-md"
          >
            Crear producto facturar
          </button>
        </div>
      </div>
    </dialog>
  );
};

// VENTANAS MODAL.
const ModalActualizarPresupuesto = ({ idObtenida }) => {
  const {
    register,
    deleteToResetClientes,
    productoSeleccionado,
    totalKg,
    totalBarras,
    handlePerfilActualizar,
    totalPagar,
    deleteProducto,
    setPunto,
    punto,
    setProductoSeleccionado,
    setClienteSeleccionadoActualizar,
    clienteSeleccionadoActualizar,
  } = useFacturaContext();

  useEffect(() => {
    const obtenerDatos = async () => {
      const res = await client.get(`/facturacion/${idObtenida}`);
      console.log("datos obtenidos", res.data);

      setPunto(res.data.punto);

      setProductoSeleccionado(res.data.productos.respuesta);
      setClienteSeleccionadoActualizar(res.data.clientes);
    };

    obtenerDatos();
  }, [idObtenida]);

  const { setPerfiles, setProductoUnico } = useAluminioContext();

  const [isEditable, setIsEditable] = useState(false);

  const handleInputClick = () => {
    setIsEditable(true);
  };

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

  const resultados = {};

  // Iterar sobre los datos
  productoSeleccionado.forEach((dato) => {
    const clave = `${dato.categoria}-${dato.precio}`;

    if (resultados[clave]) {
      resultados[clave].totalPrecioUnitario += dato.totalPrecioUnitario;
      resultados[clave].totalKG += dato.totalKG;
    } else {
      resultados[clave] = {
        categoria: dato.categoria,
        color: dato.color,
        precio: dato.precio,
        totalPrecioUnitario: dato.totalPrecioUnitario,
        totalKG: dato.totalKG,
      };
    }
  });

  const resultadosArray = Object.values(resultados);

  return (
    <dialog id="my_modal_actualizar_presupuesto_venta" className="modal">
      <div className="modal-box rounded-none max-w-full max-h-full h-full w-full z-0">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">
          Actualizar la orden numero {idObtenida}.
        </h3>
        <p className="py-1 text-sm font-medium">
          En esta sesión podras actualizar el presupuesto o venta.
        </p>
        <form className="mt-2 border-t pt-4 pb-4 space-y-2">
          {" "}
          <div className="mb-4 flex-col gap-2 inline-flex">
            <label className="text-sm font-bold">
              Seleccionar el punto de venta
            </label>
            <select
              className="border py-1 px-2 rounded-md text-sm font-semibold"
              value={punto}
              onChange={(e) => setPunto(e.target.value)}
            >
              <option className="font-bold text-xs text-blue-500" value={""}>
                Seleccionar tipo
              </option>{" "}
              <option className="text-xs font-semibold" value={"presupuesto"}>
                Presupuesto
              </option>
              <option className="text-xs font-semibold" value={"venta"}>
                Venta
              </option>
            </select>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold uppercase">Nombre:</label>
              <p className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase">
                {clienteSeleccionadoActualizar.nombre}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold uppercase">
                Apellido:
              </label>
              <p className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase">
                {clienteSeleccionadoActualizar.apellido}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold uppercase">
                Localidad:
              </label>
              <p className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase">
                {clienteSeleccionadoActualizar.localidad}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold uppercase">
                Provincia:
              </label>
              <p className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase">
                {clienteSeleccionadoActualizar.provincia}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold uppercase">Email:</label>
              <p className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase">
                {clienteSeleccionadoActualizar.email}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold uppercase">
                Telefono:
              </label>
              <p className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase">
                {clienteSeleccionadoActualizar.telefono}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold uppercase">Dni:</label>
              <p className="border border-gray-300 py-2 px-2 text-sm rounded-md font-semibold uppercase">
                {clienteSeleccionadoActualizar.dni}
              </p>
            </div>
          </div>
          <div>
            <table className="table">
              <thead className="text-gray-900 font-bold">
                <tr>
                  <th>Codigo</th>
                  <th>Detalle</th>
                  <th>Color</th>
                  <th>Categoria</th>
                  <th>Barras</th>
                  <th>Kg</th>
                </tr>
              </thead>
              <tbody className="uppercase text-xs font-medium">
                {productoSeleccionado.map((p) => (
                  <tr key={p.id}>
                    <th>{p.nombre}</th>
                    <td>{p.detalle}</td>
                    <td>{p.color}</td>
                    <td>{p.categoria}</td>
                    <th className="font-bold">{p.barras}</th>
                    <th className="font-bold">
                      {p.totalKG.toLocaleString("arg")} kg
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-4 px-4 bg-gray-700 text-white">
            <div className="flex gap-2 items-center">
              <p className="font-bold uppercase">Total kg:</p>{" "}
              <div className="font-semibold text-gray-300">
                {totalKg().toLocaleString("arg", {
                  minimumFractionDigits: 2,
                })}{" "}
                kg
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-bold uppercase">Total de barras:</p>{" "}
              <div className="font-semibold text-gray-300">{totalBarras()}</div>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-bold uppercase">Total pagar:</p>{" "}
              <div className="font-semibold text-gray-300">{result}</div>
            </div>
          </div>
          {resultadosArray?.map((a, index) => (
            <div key={index}>
              <p className="font-bold uppercase text-lg text-slate-700 flex gap-2">
                TOTAL EN {a?.categoria}{" "}
                <span className="text-blue-500 font-semibold">
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
                <span className=" text-blue-500 font-semibold">{a?.color}</span>
              </p>
              <p className="font-semibold uppercase text-sm text-slate-700 flex gap-2">
                Total en kg:{" "}
                <span className=" text-blue-500 font-semibold">
                  {a?.totalKG?.toLocaleString("es-ar", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  kg
                </span>
              </p>
              <p className="font-semibold uppercase text-sm text-slate-700 border-b-[1px] border-gray-300 flex gap-2">
                Precio Unitario
                <span className=" text-blue-500 font-semibold">
                  {Number(a?.precio).toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}{" "}
                </span>
              </p>
            </div>
          ))}
          <div className="flex pt-3">
            <input
              onClick={() => handlePerfilActualizar(idObtenida)}
              className="bg-red-500 text-white px-5 rounded-md py-1 text-sm font-bold cursor-pointer"
              type="button"
              value={"Actualizar la orden"}
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

const ModalEliminar = ({ idObtenida }) => {
  const { handleSubmit } = useForm();

  const { setPerfiles } = useAluminioContext();
  const { setFacturasMensuales } = useFacturaContext();
  const { setClientes } = useClientesContext();

  const onSubmit = async () => {
    try {
      const res = await client.delete(`/facturacion/${idObtenida}`);

      showSuccessToastError("Eliminado correctamente");

      setPerfiles(res.data.productos);
      setFacturasMensuales(res.data.facturas);
      setClientes(res.data.clientes);

      document.getElementById("my_modal_eliminar").close();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <dialog id="my_modal_eliminar" className="modal">
      <div className="modal-box rounded-md max-w-md">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <img
              className="w-44 mx-auto"
              src="https://app.holded.com/assets/img/document/doc_delete.png"
            />
          </div>
          <div className="font-semibold text-sm text-gray-400 text-center">
            REFERENCIA {idObtenida}
          </div>
          <div className="font-semibold text-[#FD454D] text-lg text-center">
            Eliminar la orden..
          </div>
          <div className="text-sm text-gray-400 text-center mt-1">
            La orden ya no podra ser recuperado se descontara del cliente el
            monto cargado y los perfiles volveran al stock...
          </div>
          <div className="mt-4 text-center w-full px-16">
            <button
              type="submit"
              className="bg-red-500 py-1 px-4 text-center font-bold text-white text-sm rounded-md w-full"
            >
              Confirmar
            </button>{" "}
            <button
              type="button"
              onClick={() =>
                document.getElementById("my_modal_eliminar").close()
              }
              className="bg-orange-100 py-1 px-4 text-center font-bold text-orange-600 mt-2 text-sm rounded-md w-full"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

const ModalFacturaVenta = ({ idObtenida }) => {
  const [datos, setDatos] = useState([]);
  const { datosFacturar } = useFacturarDatosContext();

  useEffect(() => {
    async function loadData() {
      const res = await client.get(`/facturacion/${idObtenida}`);

      setDatos(res.data);
    }
    loadData();
  }, [idObtenida]);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function dateTime(data) {
    return new Date(data).toLocaleDateString("arg", options);
  }

  return (
    <dialog id="my_modal_factura_venta" className="modal">
      <div className="modal-box rounded-md max-w-7xl h-full sroll-bar">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <section className="py-[50px] mx-auto w-full flex flex-col gap-10 h-full">
          <div className="w-[1220px] mx-auto space-y-3">
            <div>
              <p className="font-bold text-2xl text-[#FD454D]">
                Venta realizada{" "}
                <span className="text-black font-extrabold">
                  N° {datos?.id}
                </span>
              </p>
            </div>

            <div className="space-x-2 flex">
              <button className="bg-blue-500 flex gap-2 py-1 px-4 rounded-md items-center text-white text-sm font-bold">
                <BiDownload />{" "}
                <PDFDownloadLink
                  fileName={`${datos?.clientes?.nombre}_${datos?.clientes?.apellido}_000111${datos?.id}`}
                  document={
                    <FacturaDocumentDonwload
                      datos={datos}
                      datosFacturar={datosFacturar}
                    />
                  }
                >
                  descargar orden de venta
                </PDFDownloadLink>
              </button>
              <button className="bg-[#FD454D] flex gap-2 py-1 px-4 rounded-md items-center text-white text-sm font-bold">
                <BiFile />{" "}
                <Link to={`/view-factura-venta/${datos.id}`}>
                  imprimir directo
                </Link>
              </button>
            </div>

            <div className="bg-gray-700 py-5 px-5 rounded-md text-white">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold text-center">
                  Total de la venta
                </p>
                <p className="text-md font-medium text-center">
                  {Number(datos?.estadistica?.total_pagar).toLocaleString(
                    "es-ar",
                    {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                    }
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="px-10 py-10 ">
            <div className="flex flex-col text-center space-y-1 w-full relative">
              <p className="font-extrabold text-xl text-blue-500 capitalize">
                {datosFacturar[0]?.nombre}
              </p>
              <p className="text-base text-gray-600">
                + {datosFacturar[0]?.telefono}
              </p>
              <p className="text-gray-600">{datosFacturar[0]?.email}</p>
              <div className="absolute right-0">
                <span className="text-blue-500 font-extrabold text-2xl">
                  No.
                </span>{" "}
                {datos?.id}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="border-b-[1px] border-black/20 flex justify-between px-6 pb-4">
                <div className="flex gap-3 items-center">
                  <p className="font-bold">Cliente</p>
                  <p className="font-light text-gray-700 text-sm capitalize">
                    {datos?.clientes?.nombre}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <p className="font-bold">Creacion</p>
                  <p className="font-light text-gray-700 text-sm">
                    {dateTime(datos?.created_at)}
                  </p>
                </div>
              </div>
              <div className="border-b-[1px] border-black/20 flex justify-between px-6 py-4">
                <div className="flex gap-3 items-center">
                  <p className="font-bold">Dni</p>
                  <p className="font-light text-gray-700 text-sm">
                    {" "}
                    {datos?.clientes?.dni}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <p className="font-bold">Vencimiento</p>
                  <p className="font-light text-gray-700 text-sm">
                    {dateTime(datos?.created_at)}
                  </p>
                </div>
              </div>
              <div className="border-b-[1px] border-black/20 flex justify-between px-6 py-4">
                <div className="flex gap-3 items-center">
                  <p className="font-bold">Telefono</p>
                  <p className="font-light text-gray-700 text-sm">
                    {" "}
                    +{datos?.clientes?.telefono}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <p className="font-bold">Plazo de pago</p>
                  <p className="font-light text-gray-700 text-sm">-</p>
                </div>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr className="bg-gray-700 text-white text-xs uppercase">
                  <th className="p-3">Cant.</th>
                  <th className="p-3">Cod.</th>
                  <th className="p-3">Kg</th>
                  <th className="p-3">Cat.</th>
                  <th className="p-3">Color</th>
                  <th className="p-3">Detalle</th>
                  <th className="p-3">Precio total por barras</th>
                </tr>
              </thead>
              <tbody>
                {datos?.productos?.respuesta.map((p, index) => (
                  <tr className="uppercase text-xs" key={index}>
                    <th className="">{p.barras}</th>
                    <th>{p.nombre}</th>
                    <th>
                      {Number(p.totalKG).toLocaleString("es-ar", {
                        minimumFractionDigits: 2,
                      })}
                    </th>
                    <th>{p.categoria}</th>
                    <th>{p.color}</th>
                    <th>{p.detalle}</th>
                    <th>
                      {Number(p.totalPrecioUnitario).toLocaleString("es-ar", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-2 items-end w-full px-12 py-12">
              <div className="flex gap-6 border-b-[1px] border-black/20">
                <div className="pb-2">
                  <p className="font-bold">Subtotal</p>{" "}
                  <p className="text-sm text-[#FD454D] font-semibold">
                    {Number(datos?.estadistica?.total_pagar).toLocaleString(
                      "es-ar",
                      {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="font-bold">IVA (0%)</p>{" "}
                  <p className="text-sm">$0</p>
                </div>
              </div>

              <div>
                <p className="font-bold  text-xl flex gap-2 items-center text-[#FD454D]">
                  <span className="font-bold text-lg text-black">Total:</span>{" "}
                  {Number(datos?.estadistica?.total_pagar).toLocaleString(
                    "es-ar",
                    {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                    }
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </dialog>
  );
};

const ModalFacturaPresupuesto = ({ idObtenida }) => {
  const [datos, setDatos] = useState([]);
  const { datosFacturar } = useFacturarDatosContext();

  useEffect(() => {
    async function loadData() {
      const res = await client.get(`/facturacion/${idObtenida}`);

      setDatos(res.data);
    }
    loadData();
  }, [idObtenida]);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function dateTime(data) {
    return new Date(data).toLocaleDateString("arg", options);
  }

  return (
    <dialog id="my_modal_factura_presupuesto" className="modal">
      <div className="modal-box rounded-md max-w-7xl h-full sroll-bar">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <section className="py-[50px] mx-auto w-full flex flex-col gap-10 h-full">
          <div className="w-[1220px] mx-auto space-y-3">
            <div>
              <p className="font-bold text-2xl text-[#FD454D]">
                Presupuesto de venta{" "}
                <span className="text-black font-extrabold">
                  N° {datos?.id}
                </span>
              </p>
            </div>

            <div className="space-x-2 flex">
              <button className="bg-blue-500 flex gap-2 py-1 px-4 rounded-md items-center text-white text-sm font-bold">
                <BiDownload />{" "}
                <PDFDownloadLink
                  fileName={`${datos?.clientes?.nombre}_${datos?.clientes?.apellido}_N_${datos?.id}`}
                  document={
                    <DescargarPresupuesto
                      datos={datos}
                      datosFacturar={datosFacturar}
                    />
                  }
                >
                  descargar presupuesto
                </PDFDownloadLink>
              </button>
              <button className="bg-[#FD454D] flex gap-2 py-1 px-4 rounded-md items-center text-white text-sm font-bold">
                <BiFile />{" "}
                <Link to={`/view-factura/${datos.id}`}>imprimir directo</Link>
              </button>
            </div>

            <div className="bg-gray-700 py-5 px-5 rounded-md text-white">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold text-center">
                  Total del Presupuesto
                </p>
                <p className="text-md font-medium text-center">
                  {Number(datos?.estadistica?.total_pagar).toLocaleString(
                    "es-ar",
                    {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                    }
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="px-10 py-10 ">
            <div className="flex flex-col text-center space-y-1 w-full relative">
              <p className="font-extrabold text-xl text-blue-500 capitalize">
                {datosFacturar[0]?.nombre}
              </p>
              <p className="text-base text-gray-600">
                + {datosFacturar[0]?.telefono}
              </p>
              <p className="text-gray-600">{datosFacturar[0]?.email}</p>
              <div className="absolute right-0">
                <span className="text-blue-500 font-extrabold text-2xl">
                  No.
                </span>{" "}
                {datos?.id}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="border-b-[1px] border-black/20 flex justify-between px-6 pb-4">
                <div className="flex gap-3 items-center">
                  <p className="font-bold">Cliente</p>
                  <p className="font-light text-gray-700 text-sm capitalize">
                    {datos?.clientes?.nombre}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <p className="font-bold">Creacion</p>
                  <p className="font-light text-gray-700 text-sm">
                    {dateTime(datos?.created_at)}
                  </p>
                </div>
              </div>
              <div className="border-b-[1px] border-black/20 flex justify-between px-6 py-4">
                <div className="flex gap-3 items-center">
                  <p className="font-bold">Dni</p>
                  <p className="font-light text-gray-700 text-sm">
                    {" "}
                    {datos?.clientes?.dni}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <p className="font-bold">Vencimiento</p>
                  <p className="font-light text-gray-700 text-sm">
                    {dateTime(datos?.created_at)}
                  </p>
                </div>
              </div>
              <div className="border-b-[1px] border-black/20 flex justify-between px-6 py-4">
                <div className="flex gap-3 items-center">
                  <p className="font-bold">Telefono</p>
                  <p className="font-light text-gray-700 text-sm">
                    {" "}
                    +{datos?.clientes?.telefono}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <p className="font-bold">Plazo de pago</p>
                  <p className="font-light text-gray-700 text-sm">-</p>
                </div>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr className="bg-gray-700 text-white text-xs uppercase">
                  <th className="p-3">Cant.</th>
                  <th className="p-3">Cod.</th>
                  <th className="p-3">Kg</th>
                  <th className="p-3">Cat.</th>
                  <th className="p-3">Color</th>
                  <th className="p-3">Detalle</th>
                  <th className="p-3">Precio total por barras</th>
                </tr>
              </thead>
              <tbody>
                {datos?.productos?.respuesta.map((p, index) => (
                  <tr className="uppercase text-xs" key={index}>
                    <th className="">{p.barras}</th>
                    <th>{p.nombre}</th>
                    <th>
                      {Number(p.totalKG).toLocaleString("es-ar", {
                        minimumFractionDigits: 2,
                      })}
                    </th>
                    <th>{p.categoria}</th>
                    <th>{p.color}</th>
                    <th>{p.detalle}</th>
                    <th>
                      {Number(p.totalPrecioUnitario).toLocaleString("es-ar", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-2 items-end w-full px-12 py-12">
              <div className="flex gap-6 border-b-[1px] border-black/20">
                <div className="pb-2">
                  <p className="font-bold">Subtotal</p>{" "}
                  <p className="text-sm text-[#FD454D] font-semibold">
                    {Number(datos?.estadistica?.total_pagar).toLocaleString(
                      "es-ar",
                      {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="font-bold">IVA (0%)</p>{" "}
                  <p className="text-sm">$0</p>
                </div>
              </div>

              <div>
                <p className="font-bold  text-xl flex gap-2 items-center text-[#FD454D]">
                  <span className="font-bold text-lg text-black">Total:</span>{" "}
                  {Number(datos?.estadistica?.total_pagar).toLocaleString(
                    "es-ar",
                    {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                    }
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </dialog>
  );
};
