import axios from "./axios";

// Function to create a new accessory
export const crearAccesorio = (data) => axios.post("/accesorios", data);

// Function to retrieve all accessories
export const obtenerAccesorios = () => axios.get("/accesorios");

export const obtenerVentasAccesorios = () =>
  axios.get("/facturacion-accesorios");

// Function to edit an accessory by ID
export const editarAccesorio = (obtenerId, data) =>
  axios.put(`/accesorios/${obtenerId}`, data);

// Function to retrieve a single accessory by ID
export const obtenerUnicoAccesorio = (id) => axios.get(`/accesorios/${id}`);

// Function to delete an accessory by ID
export const eliminarAccesorio = (id) => axios.delete(`/accesorios/${id}`);
