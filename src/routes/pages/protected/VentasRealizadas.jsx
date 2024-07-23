import { useClientesContext } from "../../../context/ClientesProvider";
import { useFacturaContext } from "../../../context/FacturaProvider";
import { useState } from "react";
import { useAluminioContext } from "../../../context/AluminioProvider";
import { FaUserPlus, FaList, FaSearch } from "react-icons/fa";

export const VentasRealizadas = () => {
  const { facturasMensuales } = useFacturaContext();

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
        <div className="mx-10 w-1/5">
          {/* <div className="border flex gap-2 items-center border-gray-300 py-1 px-3 text-sm rounded-md">
            <FaSearch className="text-gray-400" />
            <input
              value={searchTermCliente}
              onChange={handleSearchClienteChange}
              placeholder="Buscar el cliente por el nombre o apellido.."
              className="outline-none font-medium w-full"
            />{" "}
          </div> */}
        </div>
        <div className="mx-10 pb-10">
          <table className="table">
            <thead>
              <tr>
                <th className="font-bold text-gray-900 text-xs">
                  Nombre completo
                </th>
                <th className="font-bold text-gray-900 text-xs">
                  Localidad/Provincia
                </th>
                <th className="font-bold text-gray-900 text-xs">
                  Deuda del cliente
                </th>{" "}
                <th className="font-bold text-gray-900 text-xs">Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="uppercase text-xs font-medium">
              {facturasMensuales.map((p) => (
                <tr key={p.id}>
                  <td></td>
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
                        <li className="hover:bg-gray-700 hover:text-white text-xs rounded-md font-semibold">
                          <button
                            onClick={() => {
                              {
                                handleObtenerId(p.id),
                                  document
                                    .getElementById(
                                      "my_modal_actualizar_cliente"
                                    )
                                    .showModal();
                              }
                            }}
                            type="button"
                          >
                            Editar
                          </button>
                        </li>
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
                            Eliminar
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
      <div className="modal-box rounded-md max-w-full max-h-full h-full w-full z-0">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Crear nuevo presupuesto o venta.</h3>
        <p className="py-1 text-sm font-medium">
          En esta sesión podras crear un nuevo presupuesto o venta.
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
            <div
              onClick={() => deleteToResetClientes()}
              className="bg-red-500 inline-flex px-4 py-1 text-white font-semibold text-sm rounded-md"
            >
              Resetear campos del cliente
            </div>
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
              // type="submit"
              type="button"
              value={"Generar presupuesto o venta"}
            />
          </div>
        </form>

        <ModalSeleccionarCliente />
        <ModalSeleccionarPerfiles />
      </div>
    </dialog>
  );
};

//modal seleccionar cliente facturación.

// VENTANAS MODAL.
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

  // const handleSearchClienteChange = (e) => {
  //   setSearchTermCliente(e.target.value);
  // };

  // let filteredData = results.filter((cliente) => {
  //   const matchesSearchTermNombre =
  //     cliente.nombre.toLowerCase().includes(searchTermCliente.toLowerCase()) ||
  //     cliente.apellido.toLowerCase().includes(searchTermCliente.toLowerCase());

  //   return matchesSearchTermNombre;
  // });

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
        <div className="border flex gap-2 items-center border-gray-300 py-1 px-3 text-sm rounded-md w-1/3 my-3">
          <FaSearch className="text-gray-400" />
          <input
            // value={searchTermCliente}
            // onChange={handleSearchClienteChange}
            placeholder="Buscar el codigo del perfil o descripcion.."
            className="outline-none font-medium w-full"
          />{" "}
        </div>
        {errorProducto && (
          <div>
            <span className="bg-red-500 py-2 px-2 text-white font-bold rounded-md">
              ¡El producto ya existe!
            </span>
          </div>
        )}
        <div>
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
              {results.map((c) => (
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

  const [error] = useState(false);

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
