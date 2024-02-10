import axios from "./axios";

export const crearColor = (data) => axios.post("/colores", data);

export const obtenerColores = () => axios.get("/colores");

export const editarColor = (obtenerId, data) =>
  axios.put(`/colores/${obtenerId}`, data);

export const obtenerUnicaColor = (id) => axios.get(`/colores/${id}`);

export const eliminarColor = (id) => axios.delete(`/colores/${id}`);
