export const formatearFecha = (fecha) =>
  new Date(fecha).toLocaleString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export const formatearTipoMes = (fecha) =>
  new Date(fecha).toLocaleString("es-AR", {
    month: "long", // Para el nombre completo del mes
  });
