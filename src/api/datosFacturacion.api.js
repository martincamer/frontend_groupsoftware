import axios from "./axios";

export const obtenerDatosFacturacion = () => axios.get("/datos-facturacion");

export const actualizarDatosFacturacion = (datosFacturar, data) =>
  axios.put(`/datos-facturacion/${datosFacturar}`, data);

export const crearDatosFacturacion = (data) =>
  axios.post(`/datos-facturacion`, data);
