//imports
import { createContext, useContext, useEffect, useState } from "react";
import { eliminarCliente, obtenerDatosClientes } from "../api/clientes.api";

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
  const [cliente, setCliente] = useState([]);

  //obtener datos del cliente!
  useEffect(() => {
    obtenerDatosClientes().then((response) => {
      setClientes(response.data);
    });
  }, []);

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        cliente,
        setClientes,
        setCliente,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};
