import axios from "./axios";

export const crearPerfilNuevo = (data) => axios.post("/perfiles", data);

export const obtenerDatosPerfiles = () => axios.get("/perfiles");

export const editarPerfil = (obtenerId, data) =>
  axios.put(`/perfiles/${obtenerId}`, data);

export const editarPerfilStock = (id, cantidad) =>
  axios.put(
    `
/perfiles/stock/${id}`,
    cantidad
  );

export const editarPerfilEliminarStock = (id, cantidad) =>
  axios.put(
    `
/perfiles/eliminar-stock/${id}`,
    cantidad
  );

export const obtenerUnicoPerfil = (id) => axios.get(`/perfiles/${id}`);
