//imports
import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { obtenerUnicoPerfil } from "../api/perfiles.api";
import { toast } from "react-toastify";
import {
  crearFacturaNueva,
  deleteFactura,
  obtenerFactura,
  obtenerFacturas,
  obtenerFacturasMensuales,
} from "../api/factura.api";
import { actualizarClienteFacturacion } from "../api/clientes.api";
import { useClientesContext } from "./ClientesProvider";
import client from "../api/axios";
import { showSuccessToast } from "../helpers/toast";

//context
export const FacturaContext = createContext();

//use context
export const useFacturaContext = () => {
  const context = useContext(FacturaContext);
  if (!context) {
    throw new Error("use factura context");
  }
  return context;
};

//provider
export const FacturaProvider = ({ children }) => {
  const { setClientes } = useClientesContext();

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [anioSeleccionado, setAnioSeleccionado] = useState("");
  const [obtenerProductoId, setObtenerProductoId] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);
  const [productoUnicoState, setProductoUnico] = useState([]);
  const [errorProducto, setErrorProducto] = useState(false);
  const [datosPresupuesto, setDatosPresupuesto] = useState([]);
  const [unicoPresupuesto, setUnicoPresupuesto] = useState([]);
  const [tipoFactura, setTipoFactura] = useState([]);
  const [punto, setPunto] = useState("");
  const [facturasMensuales, setFacturasMensuales] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await client.get("/facturacion");

      setFacturasMensuales(res.data);
    }

    loadData();
  }, []);

  let [isOpen, setIsOpen] = useState(false);
  let [isOpenEditarProducto, setIsOpenEditarProducto] = useState(false);

  function handleEditarProductoModalOpen() {
    setIsOpenEditarProducto(true);
  }

  function handleEditarProductoModalClose() {
    setIsOpenEditarProducto(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const resultadosFiltrados = facturasMensuales?.filter((dato) => {
      const fechaPresupuesto = new Date(dato?.created_at);
      const esCategoriaValida =
        categoriaSeleccionada === "" ||
        fechaPresupuesto.getMonth() + 1 === parseInt(categoriaSeleccionada);

      const esAnioValido =
        anioSeleccionado === "" ||
        fechaPresupuesto.getFullYear() === parseInt(anioSeleccionado);

      const esResultadoValido =
        esCategoriaValida &&
        esAnioValido &&
        (search === "" ||
          dato?.clientes?.nombre
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          dato?.clientes?.apellido
            ?.toLowerCase()
            .includes(search.toLowerCase()));

      return esResultadoValido;
    });

    setResults(resultadosFiltrados || facturasMensuales);
  }, [categoriaSeleccionada, anioSeleccionado, search, facturasMensuales]);

  const handleCategoriaChange = (e) => {
    const nuevaCategoria = e.target.value;
    setCategoriaSeleccionada(nuevaCategoria);
  };

  const handleAnioChange = (e) => {
    const nuevoAnio = e.target.value;
    setAnioSeleccionado(nuevoAnio);
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const {
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const respuesta = productoSeleccionado.map(function (e) {
    return {
      id: e.id,
      nombre: e.nombre,
      detalle: e.detalle,
      categoria: e.categoria,
      barras: e.barras,
      totalKG: e.totalKG,
      color: e.color,
      totalPrecioUnitario: e.totalPrecioUnitario,
      precio: e.precio,
    };
  });

  const handlePerfil = async () => {
    try {
      // Crear factura nueva
      const res = await crearFacturaNueva({
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
        productos: { respuesta },
        estadistica: {
          total_kg: totalKg(),
          total_barras: totalBarras(),
          total_pagar: totalPagar(),
        },
        estado: "pendiente",
        punto: punto,
        tipo_factura: "-",
      });

      setFacturasMensuales(res.data);

      showSuccessToast("Orden creada correctamente");
    } catch (error) {
      console.error("Error creating invoice:", error);
      // Handle error, show a toast, etc.
    }
  };

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

  console.log(clienteSeleccionado[0]);

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

  const addToProductos = (
    id,
    nombre,
    detalle,
    color,
    barras,
    totalKG,
    categoria,
    totalPrecioUnitario,
    precio
  ) => {
    const newProducto = {
      id,
      nombre,
      detalle,
      color,
      barras,
      totalKG,
      categoria,
      totalPrecioUnitario,
      precio,
    };

    const productoSeleccionadoItem = productoSeleccionado.find((item) => {
      return item.id === id;
    });

    if (productoSeleccionadoItem) {
      setTimeout(() => {
        setErrorProducto(false);
      }, 2000);
      setErrorProducto(true);
    } else {
      setProductoSeleccionado([...productoSeleccionado, newProducto]);
      setErrorProducto(false);
    }
  };

  const deleteProducto = (
    id,
    nombre,
    detalle,
    color,
    barras,
    totalKG,
    categoria,
    totalPrecioUnitario,
    precio
  ) => {
    const itemIndex = productoSeleccionado?.findIndex(
      (item) =>
        item.id === id &&
        item.nombre === nombre &&
        item.detalle === detalle &&
        item.color === color &&
        item.barras === barras &&
        item.totalKG === totalKG &&
        item.categoria === categoria &&
        item.totalPrecioUnitario === totalPrecioUnitario &&
        item.precio === precio
    );

    if (itemIndex) {
      const newItem = [...productoSeleccionado];
      newItem.splice(itemIndex);
      setProductoSeleccionado(newItem);
    }
  };

  const deleteToResetProductos = () => {
    const newDato = [];
    setProductoSeleccionado(newDato);
  };

  const handleSeleccionarProducto = (id) => {
    setObtenerProductoId(id);
  };

  useEffect(() => {
    async function productoUnico() {
      const res = await obtenerUnicoPerfil(obtenerProductoId);
      setProductoUnico(res.data);
    }
    productoUnico();
  }, [obtenerProductoId]);

  //generar presupuesto pdf and guardar datos

  //obtener datos presupuestos
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await obtenerFacturas();

        setDatosPresupuesto(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  const totalKg = () => {
    return productoSeleccionado.reduce((sum, b) => {
      return sum + Number(b.totalKG);
    }, 0);
  };

  const totalBarras = () => {
    return productoSeleccionado.reduce((sum, b) => {
      return sum + Number(b.barras);
    }, 0);
  };

  const totalPagar = () => {
    return productoSeleccionado.reduce((sum, b) => {
      return sum + Number(b.totalPrecioUnitario);
    }, 0);
  };

  const obtenerDatos = async (id) => {
    const { data } = await obtenerFactura(id);
    setUnicoPresupuesto(data);
  };

  //eliminar presupuesto
  const handleDeletePresupuesto = (id) => {
    deleteFactura(id);

    const presupuestoActualizado = facturasMensuales.filter(
      (perfilState) => perfilState.id !== id
    );

    toast.error(
      "¡Facturado eliminada correctamente, no podras recuperar los datos ni los perfiles!",
      {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
      }
    );

    setFacturasMensuales(presupuestoActualizado);
  };

  return (
    <FacturaContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        results,
        handleSeleccionarProducto,
        obtenerProductoId,
        addToClientes,
        register,
        deleteToResetClientes,
        productoUnicoState,
        addToProductos,
        productoSeleccionado,
        deleteToResetProductos,
        deleteProducto,
        errorProducto,
        handlePerfil,
        datosPresupuesto,
        totalKg,
        totalBarras,
        unicoPresupuesto,
        setUnicoPresupuesto,
        totalPagar,
        datosPresupuesto,
        setDatosPresupuesto,
        obtenerDatos,
        handleDeletePresupuesto,
        setTipoFactura,
        search,
        searcher,
        categoriaSeleccionada,
        handleCategoriaChange,
        anioSeleccionado,
        handleAnioChange,
        handleEditarProductoModalClose,
        isOpenEditarProducto,
        handleEditarProductoModalOpen,
        facturasMensuales,
        setFacturasMensuales,
        setProductoUnico,
        setPunto,
        punto,
      }}
    >
      {children}
    </FacturaContext.Provider>
  );
};
