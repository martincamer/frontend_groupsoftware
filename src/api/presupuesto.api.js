import axios from "./axios";

export const crearPresupuestoNuevo = (datos) =>
  axios.post("/presupuesto", datos);

export const obtenerPresupuestos = () => axios.get("/presupuesto");

export const obtenerPresupuesto = (id) => axios.get(`/presupuesto/${id}`);

export const deletePresupuesto = (id) => axios.delete(`/presupuesto/${id}`);

export const actualizarPresupuesto = (id, data) =>
  axios.put(`/presupuesto/${id}`, data);
