import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { SyncLoader } from "react-spinners";
import client from "../../../api/axios";

export const VentasRegistradas = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [datos, setDatos] = useState([]);

  const [loading, setLoading] = useState(false);

  const obtenerIngresoRangoFechas = async (fechaInicio, fechaFin) => {
    try {
      // Setea el estado de loading a true para mostrar el spinner
      setLoading(true);

      // Validación de fechas
      if (!fechaInicio || !fechaFin) {
        console.error("Fechas no proporcionadas");
        return;
      }

      // Verifica y formatea las fechas
      fechaInicio = new Date(fechaInicio).toISOString().split("T")[0];
      fechaFin = new Date(fechaFin).toISOString().split("T")[0];

      const response = await client.post("/facturas-rango-fechas", {
        fechaInicio,
        fechaFin,
      });

      setDatos(response.data); // Maneja la respuesta según tus necesidades
    } catch (error) {
      console.error("Error al obtener salidas:", error);
      // Maneja el error según tus necesidades
    } finally {
      // Independientemente de si la solicitud es exitosa o falla, establece el estado de loading a false
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  console.log(datos);

  const buscarIngresosPorFecha = () => {
    obtenerIngresoRangoFechas(fechaInicio, fechaFin);
  };

  const fechaActual = new Date();
  const numeroDiaActual = fechaActual.getDay(); // Obtener el día del mes actual

  const nombresDias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const numeroMesActual = fechaActual.getMonth() + 1; // Obtener el mes actual
  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const nombreMesActual = nombresMeses[numeroMesActual - 1]; // Obtener el nombre del mes actual

  const nombreDiaActual = nombresDias[numeroDiaActual]; // Obtener el nombre del día actual

  // Obtener la fecha en formato de cadena (YYYY-MM-DD)
  const fechaActualString = fechaActual.toISOString().slice(0, 10);

  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = datos?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(datos?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const rangeSize = 5;

  const startPage = Math.max(1, currentPage - Math.floor(rangeSize / 2));
  const endPage = Math.min(totalPages, startPage + rangeSize - 1);

  const filteredResults = currentResults.filter((factura) => {
    return (
      factura.clientes.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      factura.clientes.apellido.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPagar = () => {
    // Realiza la suma del campo total_pagar de las facturas filtradas
    return datos.reduce((sum, factura) => {
      return sum + Number(factura.estadistica.total_pagar);
    }, 0);
  };

  console.log(datos);
  // Objeto para almacenar el total de kilogramos por categoría
  const totalPorCategoria = datos.reduce((acumulador, factura) => {
    factura.productos.respuesta.forEach((producto) => {
      // Verificar si la categoría del producto existe en el acumulador
      if (!acumulador[producto.categoria]) {
        // Si la categoría no existe, crear una nueva entrada en el objeto acumulador
        acumulador[producto.categoria] = {
          categoria: producto.categoria,
          total_kg: 0,
          totalPrecioUnitario: 0,
        };
      }
      // Sumar el total de kilogramos del producto a la categoría correspondiente
      acumulador[producto.categoria].total_kg += producto.totalKG;
      acumulador[producto.categoria].totalPrecioUnitario +=
        producto.totalPrecioUnitario;
    });
    return acumulador;
  }, {});
  const totalPorCategoriaArray = Object.values(totalPorCategoria);

  console.log(totalPorCategoriaArray);

  return (
    <section className="w-full h-full px-5 max-md:px-4 flex flex-col gap-5 py-8 max-md:gap-3">
      <ToastContainer />
      <div className="grid grid-cols-3 gap-3 ">
        <div className="border-slate-200 border-[1px] rounded shadow py-8 px-10">
          <div className="flex justify-center items-center gap-2 flex-col">
            <p className="text-sky-500 font-bold">
              TOTAL FACTURADO EN EL MES CONSULTADO
            </p>
            <p className="bg-sky-100 text-sky-700 rounded-xl py-3 px-5">
              {totalPagar().toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        <div className="border-slate-200 border-[1px] rounded shadow py-8 px-10">
          <div className="flex justify-center items-center gap-2 flex-col">
            <p className="text-sky-500 font-bold">
              TOTAL EN KG SEPARADOS POR CATEGORIAS
            </p>
            <div className="h-[50px] overflow-y-scroll grid grid-cols-2 gap-2 w-full">
              {totalPorCategoriaArray.map((c) => (
                <div className="border-slate-200 border-[1px] rounded-2xl shadow py-2 px-2 w-full flex gap-2 items-center justify-center">
                  <p className="text-xs uppercase font-bold text-sky-700">
                    {c.categoria}
                  </p>
                  <p className="text-xs uppercase font-bold text-slate-600">
                    {c.total_kg.toFixed(2)} KGS
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-slate-200 border-[1px] rounded shadow py-8 px-10">
          <div className="flex justify-center items-center gap-2 flex-col">
            <p className="text-sky-500 font-bold">
              TOTAL EN GANANCIAS POR CATEGORIA
            </p>
            <div className="h-[50px] overflow-y-scroll grid grid-cols-2 gap-2 w-full">
              {totalPorCategoriaArray.map((c) => (
                <div className="border-slate-200 border-[1px] rounded-2xl shadow py-2 px-2 w-full flex gap-2 items-center justify-center">
                  <p className="text-xs uppercase font-bold text-sky-700">
                    {c.categoria}
                  </p>
                  <p className="text-xs uppercase font-bold text-slate-600">
                    {Number(c.totalPrecioUnitario).toLocaleString("es-ar", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-5 max-md:mt-4">
        <div className="flex gap-6 items-center max-md:flex-col max-md:items-start max-md:gap-3">
          <div className="flex gap-2 items-center">
            <label className="text-sm text-slate-700 max-md:text-sm uppercase">
              Fecha de inicio
            </label>
            <input
              className="text-sm bg-white py-2 px-3 rounded-xl shadow border-slate-300 border-[1px] cursor-pointer text-slate-700 outline-none"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-sm text-slate-700 max-md:text-sm uppercase">
              Fecha fin
            </label>
            <input
              className="text-sm bg-white py-2 px-3 rounded-xl shadow border-slate-300 border-[1px] cursor-pointer text-slate-700 outline-none"
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />

            <button
              onClick={buscarIngresosPorFecha}
              className="max-md:text-sm bg-white border-slate-300 border-[1px] rounded-xl px-2 py-1.5 shadow flex gap-3 text-slate-700 hover:shadow-md transtion-all ease-in-out duration-200 max-md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-slate-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center py-2 px-4 border-slate-300 border-[1px] shadow rounded-xl w-1/4 max-md:w-full max-md:text-sm max-md:mt-5">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className="outline-none text-slate-600 w-full uppercase text-sm"
          placeholder="Buscar el cliente en especifico"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-slate-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      {/* tabla de datos  */}
      <div className="rounded-2xl border-[1px] border-slate-300 hover:shadow cursor-pointer max-md:overflow-x-scroll">
        {loading ? (
          // Muestra el spinner mientras se cargan los datos
          <div className="flex justify-center items-center h-40">
            <SyncLoader color="#4A90E2" size={6} margin={6} />
            <p className="animate-blink text-slate-700 text-sm">
              Buscando los datos...
            </p>
          </div>
        ) : (
          <table className="w-full divide-y-[1px] divide-gray-200 text-sm uppercase">
            <thead className="text-left">
              <tr>
                <th className="px-3 py-4  text-slate-800 font-bold uppercase max-md:text-xs">
                  N°
                </th>
                <th className="px-3 py-4  text-slate-800 font-bold uppercase max-md:text-xs">
                  Cliente
                </th>
                <th className="px-3 py-4  text-slate-800 font-bold uppercase max-md:text-xs">
                  Total Facturado
                </th>
                <th className="px-3 py-4  text-slate-800 font-bold uppercase max-md:text-xs">
                  Estado de la factura
                </th>
                <th className="px-3 py-4  text-slate-800 font-bold uppercase max-md:text-xs">
                  Ver o descargar
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 ">
              {filteredResults.map((f) => (
                <tr key={f.id}>
                  <td className="px-4 py-3 font-medium text-gray-900 max-md:text-xs">
                    {f.id}
                  </td>
                  <td className="px-4 py-3 font-normal text-gray-900 max-md:text-xs">
                    {f?.clientes?.nombre} {f?.clientes?.apellido}
                  </td>
                  <td className="px-4 py-3 font-normal text-gray-900 max-md:text-xs">
                    <div className="flex">
                      <p className="bg-green-100 text-green-700 py-3 px-4 rounded-xl">
                        {Number(f?.estadistica.total_pagar).toLocaleString(
                          "es-ar",
                          {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          }
                        )}
                      </p>
                    </div>
                  </td>
                  <th className="py-4 px-3 text-sm">
                    <div className="flex">
                      <p
                        className={`${
                          (f.estado === "aceptado" &&
                            "bg-green-500/10 text-green-700") ||
                          (f.estado === "rechazado" &&
                            "bg-red-500/10 text-red-700") ||
                          (f.estado === "pendiente" &&
                            "bg-yellow-500/10 text-yellow-700")
                        } py-3 px-6 font-normal rounded-2xl text-sm`}
                      >
                        <span>{f.estado}</span>
                      </p>
                    </div>
                  </th>
                  <th className="py-4 px-3 text-sm">
                    <div className="flex">
                      <Link
                        className="border-slate-300 border-[1px] py-3 px-5 rounded-xl hover:shadow-md transition-all ease-linear font-normal flex gap-2 items-center"
                        target="_blank"
                        to={`/factura-venta/${f.id}`}
                      >
                        Ver factura
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-4 mb-4 gap-1">
            <button
              className="mx-1 px-3 py-1 rounded bg-gray-100 shadow shadow-black/20 text-sm flex gap-1 items-center hover:bg-orange-500 transiton-all ease-in duration-100 hover:text-white"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              Anterior
            </button>
            {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === startPage + index
                    ? "bg-orange-500 hover:bg-white transition-all ease-in-out text-white shadow shadow-black/20 text-sm"
                    : "bg-gray-100 shadow shadow-black/20 text-sm"
                }`}
                onClick={() => handlePageChange(startPage + index)}
              >
                {startPage + index}
              </button>
            ))}
            <button
              className="mx-1 px-3 py-1 rounded bg-gray-100 shadow shadow-black/20 text-sm flex gap-1 items-center hover:bg-orange-500 transiton-all ease-in duration-100 hover:text-white"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
