//imports
import { createContext, useContext, useEffect, useState } from "react";
import { eliminarCliente, obtenerDatosClientes } from "../api/clientes.api";
import { toast } from "react-toastify";

//context
export const ClientesContext = createContext();

//use context
export const useClientesContext = () => {
  const context = useContext(ClientesContext);
  if (!context) {
    throw new Error("use clientes context");
  }
  return context;
};

//provider
export const ClientesProvider = ({ children }) => {
  //¡hooks creados!
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState("");
  const [obtenerId, setObtenerId] = useState("");
  const [cliente, setCliente] = useState([]);

  //is open
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenEditar, setIsOpenEditar] = useState(false);

  //funciones de edicion
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModalEditar() {
    setIsOpenEditar(false);
  }

  function openModalEditar() {
    setIsOpenEditar(true);
  }

  //buscador de clientes

  let results = [];

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  if (!search) {
    results = clientes;
  } else {
    results = clientes.filter(
      (dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()) ||
        dato.apellido.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  //fin de la busqueda del cliente

  //¡eliminar el cliente!
  const handleEliminar = async (id) => {
    await eliminarCliente(id);

    const clienteActualizado = clientes.filter(
      (clienteState) => clienteState.id !== id
    );

    toast.error("¡Cliente eliminado correctamente!", {
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
    });

    setClientes(clienteActualizado);
  };

  //obtener datos del cliente!
  useEffect(() => {
    obtenerDatosClientes().then((response) => {
      setClientes(response.data);
    });
  }, []);

  //seleccionar el id
  const handleClienteSeleccionado = (id) => {
    setObtenerId(id);
  };

  return (
    <ClientesContext.Provider
      value={{
        search,
        results,
        isOpen,
        isOpenEditar,
        obtenerId,
        clientes,
        cliente,
        searcher,
        closeModal,
        openModal,
        closeModalEditar,
        openModalEditar,
        handleClienteSeleccionado,
        handleEliminar,
        setClientes,
        setCliente,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};
