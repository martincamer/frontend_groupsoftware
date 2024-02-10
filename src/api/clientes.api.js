import axios from "./axios";

export const obtenerDatosClientes = () => axios.get("/clientes");

export const actualizarCliente = (obtenerId, data) =>
  axios.put(`/clientes/${obtenerId}`, data);

export const actualizarClienteEntrega = (obtenerId, data) =>
  axios.put(`/cliente-entrega/${obtenerId}`, data);

export const eliminarCliente = (id) => axios.delete(`/clientes/${id}`);

export const obtenerCliente = (id) => axios.get(`/clientes/${id}`);

export const crearCliente = (data) => axios.post(`/clientes`, data);

export const actualizarClienteFacturacion = (id, data) =>
  axios.put(`/clientes/facturacion/${id}`, data);

export const resetearClienteFacturacion = (id) =>
  axios.put(`/clientes/resetear/${id}`);
