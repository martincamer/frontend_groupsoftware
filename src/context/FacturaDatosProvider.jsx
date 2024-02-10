//imports
import { createContext, useContext, useEffect, useState } from "react";
import {
  obtenerDatosFacturacion,
  actualizarDatosFacturacion,
} from "../api/datosFacturacion.api";
import { useForm } from "react-hook-form";

//context
export const FacturarDatosContext = createContext();

//use context
export const useFacturarDatosContext = () => {
  const context = useContext(FacturarDatosContext);
  if (!context) {
    throw new Error("use facturar context");
  }
  return context;
};

//provider
export const FacturarDatosProvider = ({ children }) => {
  const [datosFacturar, setDatosFacturar] = useState([]);
  let [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    async function loadData() {
      const res = await obtenerDatosFacturacion();

      setValue("nombre", res.data[0].nombre);
      setValue("email", res.data[0].email);
      setValue("detalle", res.data[0].detalle);
      setValue("telefono", res.data[0].telefono);
      setValue("direccion", res.data[0].direccion);
      setValue("localidad", res.data[0].localidad);
      setValue("id", res.data[0].id);

      setDatosFacturar(res.data);
    }
    loadData();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const res = await actualizarDatosFacturacion(datosFacturar[0]?.id, data);

    const objetEN = JSON.parse(res.config.data);

    const datosActualizados = datosFacturar.map((datosState) =>
      datosState.id === objetEN.id ? objetEN : datosState
    );

    setTimeout(() => {
      location.reload();
    }, 1500);

    setDatosFacturar(datosActualizados);
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <FacturarDatosContext.Provider
      value={{
        register,
        onSubmit,
        closeModal,
        openModal,
        isOpen,
        setDatosFacturar,
        datosFacturar,
      }}
    >
      {children}
    </FacturarDatosContext.Provider>
  );
};
