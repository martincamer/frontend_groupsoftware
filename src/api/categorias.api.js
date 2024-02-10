import axios from "./axios";

export const crearCategorias = (data) => axios.post("/categorias", data);

export const obtenerCategorias = () => axios.get("/categorias");

export const editarCategoria = (obtenerId, data) =>
  axios.put(`/categorias/${obtenerId}`, data);

export const obtenerUnicaCategoria = (id) => axios.get(`/categorias/${id}`);

export const eliminarCategoria = (id) => axios.delete(`/categorias/${id}`);
