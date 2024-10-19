//imports
import { createContext, useContext, useEffect, useState } from "react";
import {
  obtenerAccesorios,
  obtenerVentasAccesorios,
} from "../api/accesorios.api";

export const AccesoriosContext = createContext();

export const useAccesoriosContext = () => {
  const context = useContext(AccesoriosContext);
  if (!context) {
    throw new Error("use Accesorios provider");
  }
  return context;
};

export const AccesoriosProvider = ({ children }) => {
  const [accesorios, setAccesorios] = useState([]);
  const [ventasAccesorios, setVentasAccesorios] = useState([]);

  useEffect(() => {
    obtenerAccesorios().then((response) => {
      setAccesorios(response.data);
    });
  }, []);

  useEffect(() => {
    obtenerVentasAccesorios().then((response) => {
      setVentasAccesorios(response.data);
    });
  }, []);

  return (
    <AccesoriosContext.Provider
      value={{
        accesorios,
        setAccesorios,
        ventasAccesorios,
        setVentasAccesorios,
      }}
    >
      {children}
    </AccesoriosContext.Provider>
  );
};
