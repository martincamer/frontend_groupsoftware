import { useClientesContext } from "../../../context/ClientesProvider";
import { useEffect, useState } from "react";
import { FaList, FaSearch } from "react-icons/fa";
import { formatearFecha } from "../../../helpers/formatearFecha";
import { useObtenerId } from "../../../helpers/obtenerId";
import { formatearDinero } from "../../../helpers/formatearDinero";
import { useForm } from "react-hook-form";
import {
  showSuccessToast,
  showSuccessToastError,
} from "../../../helpers/toast";
import { BiDownload, BiFile } from "react-icons/bi";
import { Link } from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { DescargarPresupuesto } from "../../../components/DescargarPresupuesto";
import client from "../../../api/axios";
import { useFacturarDatosContext } from "../../../context/FacturaDatosProvider";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { FacturaDocumentDonwloadAccesorios } from "../../../components/FacturaDocumentDonwloadAccesorios";
import { DescargarPresupuestoAccesorios } from "../../../components/DescargarPresupuestoAccesorios";

export const VentasAccesorios = () => {
  const { ventasAccesorios } = useAccesoriosContext();

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

  let filteredData = ventasAccesorios?.filter((cliente) => {
    // Verificar que cliente y cliente.clientes estén definidos
    if (cliente && cliente.clientes) {
      // Convertir nombres y apellidos a minúsculas y buscar coincidencias
      const nombreCliente = cliente.clientes.nombre
        ? cliente.clientes.nombre.toLowerCase()
        : "";
      const apellidoCliente = cliente.clientes.apellido
        ? cliente.clientes.apellido.toLowerCase()
        : "";
      const searchTerm = searchTermCliente.toLowerCase();

      const matchesSearchTermNombre = nombreCliente.includes(searchTerm);
      const matchesSearchTermApellido = apellidoCliente.includes(searchTerm);

      return matchesSearchTermNombre || matchesSearchTermApellido;
    }

    return false; // Filtro por defecto retorna falso si cliente o cliente.clientes son undefined
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

  return (
    <main className="h-full w-full min-h-screen max-h-full">
      <section className="max-md:w-full mx-auto h-full flex flex-col gap-10">
        <div className="bg-gray-100 py-10 px-10 flex justify-between">
          <p className="text-gray-900 font-bold text-xl">
            Crear nuevas ventas o presupuestos de accesorios.
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
        </div>
        <div className="mx-10 pb-10">
          <table className="table">
            <thead>
              <tr>
                <th className="font-bold text-gray-900 text-xs">Numero</th>
                <th className="font-bold text-gray-900 text-xs">Cliente</th>

                <th className="font-bold text-gray-900 text-xs">Estado</th>
                <th className="font-bold text-gray-900 text-xs">Punto</th>
                <th className="font-bold text-gray-900 text-xs">
                  Fecha de emisión
                </th>
                <th className="font-bold text-gray-900 text-xs">Total</th>
              </tr>
            </thead>
            <tbody className="uppercase text-xs font-medium">
              {filteredData.map((p) => {
                // Calculate subtotal using reduce
                const subtotal = p.productos.respuesta.reduce(
                  (acc, producto) => acc + producto.subtotal,
                  0
                );

                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      {p.clientes.nombre} {p.clientes.apellido}
                    </td>
                    <td>
                      <div className="flex">
                        <p
                          className={`${
                            p.punto === "venta"
                              ? "bg-green-100/80 text-green-600"
                              : "bg-orange-100/80 text-orange-600"
                          } py-1 px-2 font-semibold rounded-md`}
                        >
                          {p.punto === "venta"
                            ? "Venta finalizada"
                            : "En espera de presupuesto."}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex">
                        <p
                          className={`${
                            p.punto === "venta"
                              ? "bg-green-100/80 text-green-600"
                              : "bg-orange-100/80 text-orange-600"
                          } py-1 px-2 font-semibold rounded-md`}
                        >
                          {p.punto}
                        </p>
                      </div>
                    </td>
                    <td>{formatearFecha(p.created_at)}</td>
                    <td className="font-bold">
                      {formatearDinero(Number(subtotal))}
                    </td>{" "}
                    {/* Displaying the subtotal */}
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
                            <>
                              <li className="hover:bg-gray-700 hover:text-white text-xs rounded-md font-semibold">
                                <button
                                  onClick={() => {
                                    handleObtenerId(p.id);
                                    document
                                      .getElementById(
                                        "my_modal_actualizar_registro"
                                      )
                                      .showModal();
                                  }}
                                  type="button"
                                >
                                  Actualizar la orden
                                </button>
                              </li>
                              <li className="hover:bg-gray-700 hover:text-white text-xs rounded-md font-semibold">
                                <button
                                  onClick={() => {
                                    handleObtenerId(p.id);
                                    document
                                      .getElementById(
                                        "my_modal_factura_presupuesto"
                                      )
                                      .showModal();
                                  }}
                                  type="button"
                                >
                                  Descargar presupuesto
                                </button>
                              </li>
                            </>
                          )}
                          {p.punto === "venta" && (
                            <li className="hover:bg-gray-700 hover:text-white text-xs rounded-md font-semibold">
                              <button
                                onClick={() => {
                                  handleObtenerId(p.id);
                                  document
                                    .getElementById("my_modal_factura_venta")
                                    .showModal();
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
                                handleObtenerId(p.id);
                                document
                                  .getElementById("my_modal_eliminar")
                                  .showModal();
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
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <ModalCrearPresupuestoVenta />
      <ModalActualizarRegistro idObtenida={idObtenida} />
      <ModalEliminar idObtenida={idObtenida} />
      <ModalFacturaVenta idObtenida={idObtenida} />
      <ModalFacturaPresupuesto idObtenida={idObtenida} />
    </main>
  );
};

// VENTANAS MODAL.
const ModalCrearPresupuestoVenta = () => {
  const { setVentasAccesorios, setAccesorios } = useAccesoriosContext();
  const { setClientes } = useClientesContext();

  const [clienteSeleccionado, setClienteSeleccionado] = useState([]);

  const addToClientes = (
    id,
    nombre,
    apellido,
    localidad,
    provincia,
    email,
    telefono,
    dni,
    total_facturado,
    deuda_restante
  ) => {
    const newCliente = {
      id,
      nombre,
      apellido,
      localidad,
      provincia,
      email,
      telefono,
      dni,
      total_facturado,
      deuda_restante,
    };

    setClienteSeleccionado([...clienteSeleccionado, newCliente]);
  };

  useEffect(() => {
    setValue("nombre", clienteSeleccionado[0]?.nombre);
    setValue("apellido", clienteSeleccionado[0]?.apellido);
    setValue("localidad", clienteSeleccionado[0]?.localidad);
    setValue("provincia", clienteSeleccionado[0]?.provincia);
    setValue("email", clienteSeleccionado[0]?.email);
    setValue("telefono", clienteSeleccionado[0]?.telefono);
    setValue("dni", clienteSeleccionado[0]?.dni);
  }, [clienteSeleccionado]);

  const deleteToResetClientes = () => {
    const newDato = [];
    setClienteSeleccionado(newDato);
  };

  const [accesoriosSeleccionado, setAccesoriosSeleccionado] = useState([]);

  const agregarProducto = (
    id,
    codigo,
    descripcion,
    precio,
    cantidad,
    subtotal
  ) => {
    const data = { id, codigo, descripcion, precio, cantidad, subtotal };

    setAccesoriosSeleccionado([...accesoriosSeleccionado, data]);
  };

  const totalSubtotal = accesoriosSeleccionado.reduce(
    (acc, product) => acc + product.subtotal,
    0
  );

  const respuesta = accesoriosSeleccionado.map(function (e) {
    return {
      id: e.id,
      codigo: e.codigo,
      descripcion: e.descripcion,
      precio: e.precio,
      cantidad: e.cantidad,
      subtotal: e.subtotal,
    };
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const punto = watch("punto");

  const onSubmit = async (formData) => {
    try {
      const facturacionAccData = {
        punto: formData.punto,
        productos: { respuesta },
        clientes: {
          id: clienteSeleccionado[0]?.id,
          nombre: clienteSeleccionado[0]?.nombre,
          apellido: clienteSeleccionado[0]?.apellido,
          localidad: clienteSeleccionado[0]?.localidad,
          provincia: clienteSeleccionado[0]?.provincia,
          email: clienteSeleccionado[0]?.email,
          telefono: clienteSeleccionado[0]?.telefono,
          dni: clienteSeleccionado[0]?.dni,
        },
      };

      const res = await client.post(
        "/facturacion-accesorios",
        facturacionAccData
      );

      setVentasAccesorios(res.data.facturas);

      setAccesorios(res.data.productos);
      setClientes(res.data.clientes);

      document.getElementById("my_modal_crear_cliente").close();

      showSuccessToast("Registro cargado correctamente");

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const eliminarProducto = (id) => {
    // Filter out the product with the specified id
    const updatedAccesoriosSeleccionado = accesoriosSeleccionado.filter(
      (producto) => producto.id !== id
    );

    // Update the state with the new array
    setAccesoriosSeleccionado(updatedAccesoriosSeleccionado);
  };

  return (
    <dialog id="my_modal_crear_cliente" className="modal">
      <div className="modal-box rounded-none max-w-full max-h-full h-full w-full z-0">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">
            Crear nuevo presupuesto o venta.
          </h3>
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
                {...register("punto", { required: true })}
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
                <label className="text-[14px] font-bold uppercase">
                  Nombre:
                </label>
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
                <label className="text-[14px] font-bold uppercase">
                  Email:
                </label>
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
                Seleccionar Accesorio
              </button>
            </div>
            <div>
              <table className="table">
                <thead className="text-gray-900 font-bold">
                  <tr>
                    <th>Codigo</th>
                    <th>Detalle</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody className="uppercase text-xs font-medium">
                  {accesoriosSeleccionado.map((p) => (
                    <tr key={p.id}>
                      <td>{p.codigo}</td>
                      <td>{p.descripcion}</td>
                      <td>{formatearDinero(Number(p.precio))}</td>
                      <td>{p.cantidad}</td>
                      <td className="font-bold">
                        {formatearDinero(Number(p.subtotal))}
                      </td>
                      <th>
                        <button
                          onClick={() => eliminarProducto(p.id)}
                          type="button"
                          className="inline-flex bg-red-500 px-2 py-1 rounded-md text-white uppercase"
                        >
                          eliminar producto
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="bg-gray-800 py-10 px-10 rounded-md text-white mt-5 flex flex-col gap-2">
                <p className="font-bold text-blue-300 text-xl">
                  Total en accesorios.
                </p>
                <p className="font-medium text-2xl">
                  {formatearDinero(totalSubtotal)}
                </p>
              </div>
            </div>
          </article>

          <div>
            <button
              className="bg-red-500 text-white px-5 rounded-md py-2 text-sm font-bold cursor-pointer"
              type="submit"
            >
              Guardar el {punto}
            </button>
          </div>
        </form>
        <ModalSeleccionarCliente addToClientes={addToClientes} />
        <ModalSeleccionarPerfiles agregarProducto={agregarProducto} />
      </div>
    </dialog>
  );
};

const ModalSeleccionarCliente = ({ addToClientes }) => {
  const { clientes: results } = useClientesContext();

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
                      type="button"
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

const ModalSeleccionarPerfiles = ({ agregarProducto }) => {
  const { accesorios } = useAccesoriosContext();
  const { handleObtenerId, idObtenida } = useObtenerId();

  const [searchTermCliente, setSearchTermCliente] = useState("");

  const handleSearchClienteChange = (e) => {
    setSearchTermCliente(e.target.value);
  };

  let filteredData = accesorios.filter((perfil) => {
    const matchesSearchTermDescripcion =
      perfil.descripcion
        .toLowerCase()
        .includes(searchTermCliente.toLowerCase()) ||
      perfil.codigo.toLowerCase().includes(searchTermCliente.toLowerCase());

    // Retornar solo aquellos accesorios cuyo detalle (descripcion) coincida con el término de búsqueda
    return matchesSearchTermDescripcion;
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
        </div>

        <div className="mt-2">
          <table className="table">
            <thead>
              <tr>
                <th className="font-bold text-gray-900">Codigo</th>
                <th className="font-bold text-gray-900">Stock</th>
                <th className="font-bold text-gray-900">Descripción</th>
              </tr>
            </thead>
            <tbody className="uppercase text-xs font-medium">
              {filteredData
                .sort((a, b) => b.stock - a.stock)
                .map((c) => (
                  <tr key={c.id}>
                    <th>{c.codigo}</th>
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
                    <th>
                      <button
                        onClick={() => {
                          handleObtenerId(c.id),
                            document
                              .getElementById("my_modal_seleccionar_cantidad")
                              .showModal();
                        }}
                        className="bg-blue-500 py-1 px-4 rounded-md text-white"
                        type="button"
                      >
                        Seleccionar
                      </button>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <ModalSeleccionarCantidadPerfil
          idObtenida={idObtenida}
          agregarProducto={agregarProducto}
        />
      </div>
    </dialog>
  );
};

const ModalSeleccionarCantidadPerfil = ({ idObtenida, agregarProducto }) => {
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [codigo, setCodigo] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const res = await client.get(`/accesorios/${idObtenida}`);
      setDescripcion(res.data.descripcion);
      setPrecio(res.data.precio);
      setCodigo(res.data.codigo);
    };
    loadData();
  }, [idObtenida]);

  const [isEditable, setIsEditable] = useState(false);

  const handleInputClick = () => {
    setIsEditable(true);
  };

  const idRandom = Math.floor(Math.random() * 1000000); // Generate a random ID

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
                <th>Cantidad</th>
                <th>Precio del producto</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody className="uppercase text-xs font-medium">
              <td>{codigo}</td>
              <td>{descripcion}</td>
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
              <th className="py-4 px-3 text-sm text-center">
                {formatearDinero(Number(precio * cantidad))}
              </th>
            </tbody>
          </table>
        </div>
        <div>
          <button
            onClick={() => {
              {
                agregarProducto(
                  idObtenida,
                  codigo,
                  descripcion,
                  precio,
                  cantidad,
                  Number(precio * cantidad)
                ),
                  document
                    .getElementById("my_modal_seleccionar_cantidad")
                    .close(),
                  document
                    .getElementById("my_modal_seleccionar_productos")
                    .close();
              }
            }}
            type="button"
            // id, codigo, descripcion,precio, detalle, cantidad, subtotal
            className="bg-[#FD454D] px-4 py-1 text-white font-semibold text-sm rounded-md"
          >
            Cargar el producto
          </button>
        </div>
      </div>
    </dialog>
  );
};

//ACTUALIZAR FACTURA
const ModalActualizarRegistro = ({ idObtenida }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const punto = watch("punto");

  const { setVentasAccesorios, setAccesorios } = useAccesoriosContext();
  const { setClientes } = useClientesContext();

  const [clienteSeleccionado, setClienteSeleccionado] = useState([]);

  const addToClientes = (
    id,
    nombre,
    apellido,
    localidad,
    provincia,
    email,
    telefono,
    dni,
    total_facturado,
    deuda_restante
  ) => {
    const newCliente = {
      id,
      nombre,
      apellido,
      localidad,
      provincia,
      email,
      telefono,
      dni,
      total_facturado,
      deuda_restante,
    };

    setClienteSeleccionado([...clienteSeleccionado, newCliente]);
  };

  const deleteToResetClientes = () => {
    const newDato = [];
    setClienteSeleccionado(newDato);
  };

  const [accesoriosSeleccionado, setAccesoriosSeleccionado] = useState([]);

  const agregarProducto = (
    id,
    codigo,
    descripcion,
    precio,
    cantidad,
    subtotal
  ) => {
    const data = { id, codigo, descripcion, precio, cantidad, subtotal };

    setAccesoriosSeleccionado([...accesoriosSeleccionado, data]);
  };

  const eliminarProducto = (id) => {
    // Filter out the product with the specified id
    const updatedAccesoriosSeleccionado = accesoriosSeleccionado.filter(
      (producto) => producto.id !== id
    );

    // Update the state with the new array
    setAccesoriosSeleccionado(updatedAccesoriosSeleccionado);
  };

  const totalSubtotal = accesoriosSeleccionado.reduce(
    (acc, product) => acc + product.subtotal,
    0
  );

  const respuesta = accesoriosSeleccionado.map(function (e) {
    return {
      id: e.id,
      codigo: e.codigo,
      descripcion: e.descripcion,
      precio: e.precio,
      cantidad: e.cantidad,
      subtotal: e.subtotal,
    };
  });

  useEffect(() => {
    const loadData = async () => {
      const res = await client.get(`/facturacion-accesorios/${idObtenida}`);
      setAccesoriosSeleccionado(res?.data?.productos?.respuesta);
      setClienteSeleccionado(res?.data?.clientes);
      setValue("punto", res?.data?.punto);
    };
    loadData();
  }, [idObtenida]);

  useEffect(() => {
    setValue("nombre", clienteSeleccionado?.nombre);
    setValue("apellido", clienteSeleccionado?.apellido);
    setValue("localidad", clienteSeleccionado?.localidad);
    setValue("provincia", clienteSeleccionado?.provincia);
    setValue("email", clienteSeleccionado?.email);
    setValue("telefono", clienteSeleccionado?.telefono);
    setValue("dni", clienteSeleccionado?.dni);
  }, [clienteSeleccionado]);

  const onSubmit = async (formData) => {
    try {
      const facturacionAccData = {
        punto: formData.punto,
        productos: { respuesta },
        clientes: {
          id: clienteSeleccionado?.id,
          nombre: clienteSeleccionado?.nombre,
          apellido: clienteSeleccionado?.apellido,
          localidad: clienteSeleccionado?.localidad,
          provincia: clienteSeleccionado?.provincia,
          email: clienteSeleccionado?.email,
          telefono: clienteSeleccionado?.telefono,
          dni: clienteSeleccionado?.dni,
        },
      };

      const res = await client.put(
        `/facturacion-accesorios/${idObtenida}`,
        facturacionAccData
      );

      setVentasAccesorios(res.data.facturas);
      setAccesorios(res.data.productos);
      setClientes(res.data.clientes);

      // facturas: allFacturas.rows,
      // clientes: allClientes.rows,
      // productos: allProductos.rows,

      document.getElementById("my_modal_actualizar_registro").close();

      showSuccessToast("Registro actualizado correctamente");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <dialog id="my_modal_actualizar_registro" className="modal">
      <div className="modal-box rounded-none max-w-full max-h-full h-full w-full z-0">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">
            Actualizar el registro N°{" "}
            <span className="text-blue-500">{idObtenida}</span>
          </h3>
          <article className="mt-2 border-t pt-4 pb-4 space-y-2">
            {" "}
            <div className="mb-4 flex-col gap-2 inline-flex">
              <label className="text-sm font-bold">
                Seleccionar el punto de venta
              </label>
              <select
                className="border py-1 px-2 rounded-md text-sm font-semibold"
                {...register("punto", { required: true })}
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
                <label className="text-[14px] font-bold uppercase">
                  Nombre:
                </label>
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
                <label className="text-[14px] font-bold uppercase">
                  Email:
                </label>
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
            <div className="pt-4">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("my_modal_seleccionar_productos_actualizar")
                    .showModal()
                }
                className="bg-blue-600 text-white py-1 px-4  rounded-md text-sm font-bold"
              >
                Seleccionar Accesorio
              </button>
            </div>
            <div>
              <table className="table">
                <thead className="text-gray-900 font-bold">
                  <tr>
                    <th>Codigo</th>
                    <th>Detalle</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody className="uppercase text-xs font-medium">
                  {accesoriosSeleccionado.map((p) => (
                    <tr key={p.id}>
                      <td>{p.codigo}</td>
                      <td>{p.descripcion}</td>
                      <td>{formatearDinero(Number(p.precio))}</td>
                      <td>{p.cantidad}</td>
                      <td className="font-bold">
                        {formatearDinero(Number(p.subtotal))}
                      </td>
                      <th>
                        <button
                          onClick={() => eliminarProducto(p.id)}
                          type="button"
                          className="inline-flex bg-red-500 px-2 py-1 rounded-md text-white uppercase"
                        >
                          eliminar producto
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="bg-gray-800 py-10 px-10 rounded-md text-white mt-5 flex flex-col gap-2">
                <p className="font-bold text-blue-300 text-xl">
                  Total en accesorios.
                </p>
                <p className="font-medium text-2xl">
                  {formatearDinero(totalSubtotal)}
                </p>
              </div>
            </div>
          </article>

          <div>
            <button
              className="bg-red-500 text-white px-5 rounded-md py-2 text-sm font-bold cursor-pointer"
              type="submit"
            >
              Actualizar {punto === "venta" ? "la venta" : "el presupuesto"}
            </button>
          </div>
        </form>
        <ModalSeleccionarPerfilesActualizar agregarProducto={agregarProducto} />
      </div>
    </dialog>
  );
};

const ModalSeleccionarPerfilesActualizar = ({ agregarProducto }) => {
  const { accesorios } = useAccesoriosContext();
  const { handleObtenerId, idObtenida } = useObtenerId();

  const [searchTermCliente, setSearchTermCliente] = useState("");

  const handleSearchClienteChange = (e) => {
    setSearchTermCliente(e.target.value);
  };

  let filteredData = accesorios.filter((perfil) => {
    const matchesSearchTermDescripcion =
      perfil.descripcion
        .toLowerCase()
        .includes(searchTermCliente.toLowerCase()) ||
      perfil.codigo.toLowerCase().includes(searchTermCliente.toLowerCase());

    // Retornar solo aquellos accesorios cuyo detalle (descripcion) coincida con el término de búsqueda
    return matchesSearchTermDescripcion;
  });

  filteredData.sort((a, b) => b.stock - a.stock);

  return (
    <dialog id="my_modal_seleccionar_productos_actualizar" className="modal">
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
        </div>

        <div className="mt-2">
          <table className="table">
            <thead>
              <tr>
                <th className="font-bold text-gray-900">Codigo</th>
                <th className="font-bold text-gray-900">Stock</th>
                <th className="font-bold text-gray-900">Descripción</th>
              </tr>
            </thead>
            <tbody className="uppercase text-xs font-medium">
              {filteredData
                .sort((a, b) => b.stock - a.stock)
                .map((c) => (
                  <tr key={c.id}>
                    <th>{c.codigo}</th>
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
                    <th>
                      <button
                        onClick={() => {
                          handleObtenerId(c.id),
                            document
                              .getElementById(
                                "my_modal_seleccionar_cantidad_actualizar"
                              )
                              .showModal();
                        }}
                        className="bg-blue-500 py-1 px-4 rounded-md text-white"
                        type="button"
                      >
                        Seleccionar
                      </button>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <ModalSeleccionarCantidadPerfilActualizar
          idObtenida={idObtenida}
          agregarProducto={agregarProducto}
        />
      </div>
    </dialog>
  );
};

const ModalSeleccionarCantidadPerfilActualizar = ({
  idObtenida,
  agregarProducto,
}) => {
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [codigo, setCodigo] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const res = await client.get(`/accesorios/${idObtenida}`);
      setDescripcion(res.data.descripcion);
      setPrecio(res.data.precio);
      setCodigo(res.data.codigo);
    };
    loadData();
  }, [idObtenida]);

  const [isEditable, setIsEditable] = useState(false);

  const handleInputClick = () => {
    setIsEditable(true);
  };

  const idRandom = Math.floor(Math.random() * 1000000); // Generate a random ID

  return (
    <dialog id="my_modal_seleccionar_cantidad_actualizar" className="modal">
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
                <th>Cantidad</th>
                <th>Precio del producto</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody className="uppercase text-xs font-medium">
              <td>{codigo}</td>
              <td>{descripcion}</td>
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
              <th className="py-4 px-3 text-sm text-center">
                {formatearDinero(Number(precio * cantidad))}
              </th>
            </tbody>
          </table>
        </div>
        <div>
          <button
            onClick={() => {
              {
                agregarProducto(
                  idObtenida,
                  codigo,
                  descripcion,
                  precio,
                  cantidad,
                  Number(precio * cantidad)
                ),
                  document
                    .getElementById("my_modal_seleccionar_cantidad_actualizar")
                    .close(),
                  document
                    .getElementById("my_modal_seleccionar_productos_actualizar")
                    .close();
              }
            }}
            type="button"
            // id, codigo, descripcion,precio, detalle, cantidad, subtotal
            className="bg-[#FD454D] px-4 py-1 text-white font-semibold text-sm rounded-md"
          >
            Cargar el producto
          </button>
        </div>
      </div>
    </dialog>
  );
};

const ModalEliminar = ({ idObtenida }) => {
  const { handleSubmit } = useForm();

  const { setAccesorios, setVentasAccesorios } = useAccesoriosContext();
  const { setClientes } = useClientesContext();

  const onSubmit = async () => {
    try {
      const res = await client.delete(`/facturacion-accesorios/${idObtenida}`);

      showSuccessToastError("Eliminado correctamente");

      setAccesorios(res.data.productos);
      setVentasAccesorios(res.data.facturas);
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
      const res = await client.get(`/facturacion-accesorios/${idObtenida}`);

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

  const totalSubtotal = datos?.productos?.respuesta.reduce(
    (acc, product) => acc + product.subtotal,
    0
  );

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
                    <FacturaDocumentDonwloadAccesorios
                      datos={datos}
                      datosFacturar={datosFacturar}
                    />
                  }
                >
                  descargar orden de venta
                </PDFDownloadLink>
              </button>
              {/* <button className="bg-[#FD454D] flex gap-2 py-1 px-4 rounded-md items-center text-white text-sm font-bold">
                <BiFile />{" "}
                <Link to={`/view-factura-venta/${datos.id}`}>
                  imprimir directo
                </Link>
              </button> */}
            </div>

            <div className="bg-gray-700 py-5 px-5 rounded-md text-white">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold text-center">
                  Total de la venta
                </p>
                <p className="text-md font-medium text-center">
                  {Number(totalSubtotal).toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}
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
                  <th className="p-3">Codigo</th>
                  <th className="p-3">Descripcion</th>
                  <th className="p-3">Precio</th>
                  <th className="p-3">Cantidad</th>
                  <th className="p-3">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {datos?.productos?.respuesta.map((p, index) => (
                  <tr className="uppercase text-xs" key={index}>
                    <th className="">{p.codigo}</th>
                    <th className="">{p.descripcion}</th>
                    <th className="">{formatearDinero(Number(p.precio))}</th>
                    <th className="">{p.cantidad}</th>
                    <th className="">{formatearDinero(Number(p.subtotal))}</th>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-2 items-end w-full px-12 py-12">
              <div className="flex gap-6 border-b-[1px] border-black/20">
                <div className="pb-2">
                  <p className="font-bold">Subtotal</p>{" "}
                  <p className="text-sm text-[#FD454D] font-semibold"></p>
                </div>
                <div>
                  <p className="font-bold">IVA (0%)</p>{" "}
                  <p className="text-sm">$0</p>
                </div>
              </div>

              <div>
                <p className="font-bold  text-xl flex gap-2 items-center text-[#FD454D]">
                  <span className="font-bold text-lg text-black">Total:</span>{" "}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* <PDFViewer className="w-full h-full">
          <FacturaDocumentDonwloadAccesorios
            datos={datos}
            datosFacturar={datosFacturar}
          />
        </PDFViewer> */}
      </div>
    </dialog>
  );
};

const ModalFacturaPresupuesto = ({ idObtenida }) => {
  const [datos, setDatos] = useState([]);
  const { datosFacturar } = useFacturarDatosContext();

  useEffect(() => {
    async function loadData() {
      const res = await client.get(`/facturacion-accesorios/${idObtenida}`);

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

  const totalSubtotal = datos?.productos?.respuesta.reduce(
    (acc, product) => acc + product.subtotal,
    0
  );
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
                    <DescargarPresupuestoAccesorios
                      datos={datos}
                      datosFacturar={datosFacturar}
                    />
                  }
                >
                  descargar presupuesto
                </PDFDownloadLink>
              </button>
              {/* <button className="bg-[#FD454D] flex gap-2 py-1 px-4 rounded-md items-center text-white text-sm font-bold">
                <BiFile />{" "}
                <Link to={`/view-factura/${datos.id}`}>imprimir directo</Link>
              </button> */}
            </div>

            <div className="bg-gray-700 py-5 px-5 rounded-md text-white">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold text-center">
                  Total del Presupuesto
                </p>
                <p className="text-md font-medium text-center">
                  {formatearDinero(totalSubtotal)}
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
                  <th className="p-3">Codigo</th>
                  <th className="p-3">Descripcion</th>
                  <th className="p-3">Precio</th>
                  <th className="p-3">Cantidad</th>
                  <th className="p-3">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {datos?.productos?.respuesta.map((p, index) => (
                  <tr className="uppercase text-xs" key={index}>
                    <th className="">{p.codigo}</th>
                    <th className="">{p.descripcion}</th>
                    <th className="">{formatearDinero(Number(p.precio))}</th>
                    <th className="">{p.cantidad}</th>
                    <th className="">{formatearDinero(Number(p.subtotal))}</th>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-2 items-end w-full px-12 py-12">
              <div className="flex gap-6 border-b-[1px] border-black/20">
                <div className="pb-2">
                  <p className="font-bold">Subtotal</p>{" "}
                  <p className="text-sm text-[#FD454D] font-semibold">
                    {formatearDinero(totalSubtotal)}
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
                  {formatearDinero(totalSubtotal)}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </dialog>
  );
};
