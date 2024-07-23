//imports
import { createContext, useContext, useEffect, useState } from "react";
import { obtenerDatosPerfiles } from "../api/perfiles.api";
import { obtenerCategorias } from "../api/categorias.api";
import { obtenerColores } from "../api/colores.api";

export const AluminioContext = createContext();

export const useAluminioContext = () => {
  const context = useContext(AluminioContext);
  if (!context) {
    throw new Error("use Auth propvider");
  }
  return context;
};

export const AluminioProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [colores, setColores] = useState([]);
  const [perfiles, setPerfiles] = useState([]);

  useEffect(() => {
    obtenerDatosPerfiles().then((response) => {
      setPerfiles(response.data);
    });
  }, []);

  useEffect(() => {
    obtenerCategorias().then((response) => {
      setCategorias(response.data);
    });
  }, []);

  useEffect(() => {
    obtenerColores().then((response) => {
      setColores(response.data);
    });
  }, []);

  return (
    <AluminioContext.Provider
      value={{
        perfiles,
        setPerfiles,
        categorias,
        setCategorias,
        colores,
        setColores,
      }}
    >
      {children}
    </AluminioContext.Provider>
  );
};
