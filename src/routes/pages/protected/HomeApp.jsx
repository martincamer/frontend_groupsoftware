import { useEffect, useState } from "react";
import { useFacturaContext } from "../../../context/FacturaProvider";
import ApexCharts from "react-apexcharts";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { formatearDinero } from "../../../helpers/formatearDinero";
import { formatearTipoMes } from "../../../helpers/formatearFecha";

export const HomeApp = () => {
  const [ventasPorMes, setVentasPorMes] = useState([]);
  const [clientesVendidos, setClientesVendidos] = useState(0);
  const [totalKgVendidos, setTotalKgVendidos] = useState(0);
  const { facturasMensuales } = useFacturaContext();
  const { datosPresupuesto } = useFacturaContext();
  const { ventasAccesorios } = useAccesoriosContext();

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Convertir las fechas en formato YYYY-MM-DD para los inputs tipo date
  const fechaInicioPorDefecto = firstDayOfMonth.toISOString().split("T")[0];
  const fechaFinPorDefecto = lastDayOfMonth.toISOString().split("T")[0];

  // Estado inicial de las fechas con el rango del mes actual
  const [fechaInicio, setFechaInicio] = useState(fechaInicioPorDefecto);
  const [fechaFin, setFechaFin] = useState(fechaFinPorDefecto);

  // Handler para el cambio de fecha de inicio
  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  // Handler para el cambio de fecha de fin
  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);
  };

  // Filtrar por rango de fechas
  let facturasFiltradas = [...facturasMensuales]; // Copia de las facturas originales
  let ventasFiltradasAccesorios = [...ventasAccesorios]; // Copia de las facturas originales

  if (fechaInicio && fechaFin) {
    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);

    facturasFiltradas = facturasFiltradas.filter((item) => {
      const fechaOrden = new Date(item.created_at);
      return fechaOrden >= fechaInicioObj && fechaOrden <= fechaFinObj;
    });

    ventasFiltradasAccesorios = ventasFiltradasAccesorios.filter((item) => {
      const fechaOrden = new Date(item.created_at);
      return fechaOrden >= fechaInicioObj && fechaOrden <= fechaFinObj;
    });
  }

  // Ordenar por fecha de mayor a menor
  facturasFiltradas.sort((a, b) => {
    const fechaA = new Date(a.created_at);
    const fechaB = new Date(b.created_at);
    return fechaB - fechaA; // Ordena de mayor a menor (fecha más reciente primero)
  });

  useEffect(() => {
    const calcularVentasPorMes = () => {
      const ventasMes = {};

      facturasFiltradas.forEach((venta) => {
        const fecha = new Date(venta.created_at);
        const mes = fecha.toLocaleString("default", { month: "long" });

        if (!ventasMes[mes]) {
          ventasMes[mes] = {
            ventas: [],
            totalBarras: 0,
            totalKg: 0,
            clientes: new Set(),
          };
        }

        ventasMes[mes].ventas.push(venta);

        // Sumar las barras de cada perfil vendido en la venta actual
        const barrasVendidas = venta.productos.respuesta.reduce(
          (total, perfil) => total + parseInt(perfil.barras || 0),
          0
        );

        ventasMes[mes].totalBarras += barrasVendidas;

        // Sumar los kg de cada perfil vendido en la venta actual
        const kgVendidos = venta.productos.respuesta.reduce(
          (total, perfil) => total + parseFloat(perfil.totalKG || 0),
          0
        );

        ventasMes[mes].totalKg += kgVendidos;

        // Agregar clientes vendidos
        ventasMes[mes].clientes.add(venta.clientes.id);
      });

      const estadisticasVentasPorMes = Object.keys(ventasMes).map((mes) => {
        const { ventas, totalBarras, totalKg, clientes } = ventasMes[mes];
        const totalVentas = ventas.reduce(
          (total, venta) => total + venta.estadistica.total_pagar,
          0
        );

        const perfilesVendidos = totalBarras;
        const clientesVendidos = clientes.size;
        const kgVendidos = totalKg;

        return {
          mes,
          totalVentas,
          promedioVentas: totalVentas / ventas.length,
          cantidadVentas: ventas.length,
          perfilesVendidos,
          clientesVendidos,
          kgVendidos,
        };
      });

      setVentasPorMes(estadisticasVentasPorMes);

      // Calcular clientes vendidos en total
      const totalClientesVendidos = new Set();
      facturasFiltradas.forEach((venta) =>
        totalClientesVendidos.add(venta.clientes.id)
      );
      setClientesVendidos(totalClientesVendidos.size);

      // Calcular kg vendidos en total
      const totalKg = estadisticasVentasPorMes.reduce(
        (total, mesVentas) => total + mesVentas.kgVendidos,
        0
      );
      setTotalKgVendidos(totalKg);
    };

    calcularVentasPorMes();
  }, [facturasFiltradas]);

  // Calcular el total de totalPrecioUnitario por categoría y color
  const totalPorCategoriaColor = facturasFiltradas.reduce(
    (acumulador, factura) => {
      factura.productos.respuesta.forEach((producto) => {
        if (!acumulador[producto.categoria]) {
          acumulador[producto.categoria] = {};
        }
        if (!acumulador[producto.categoria][producto.color]) {
          acumulador[producto.categoria][producto.color] = 0;
        }
        acumulador[producto.categoria][producto.color] +=
          producto.totalPrecioUnitario;
      });
      return acumulador;
    },
    {}
  );

  // Calcular el total general de totalPrecioUnitario
  const totalGeneral = Object.values(totalPorCategoriaColor)
    .flatMap((categoria) => Object.values(categoria))
    .reduce((total, precio) => total + precio, 0);

  const totalPorCategoriaColorKG = facturasFiltradas.reduce(
    (acumulador, factura) => {
      factura.productos.respuesta.forEach((producto) => {
        if (!acumulador[producto.categoria]) {
          acumulador[producto.categoria] = {};
        }
        if (!acumulador[producto.categoria][producto.color]) {
          acumulador[producto.categoria][producto.color] = 0;
        }
        acumulador[producto.categoria][producto.color] += producto.totalKG;
      });
      return acumulador;
    },
    {}
  );

  // Calcular el total general de total_kg
  const totalGeneralKg = Object.values(totalPorCategoriaColorKG)
    .flatMap((categoria) => Object.values(categoria))
    .reduce((total, kg) => total + kg, 0);

  // Agrupar las facturas por trimestre
  const facturasPorTrimestre = datosPresupuesto.reduce(
    (acumulador, factura) => {
      const fecha = new Date(factura.created_at);
      const mes = fecha.toLocaleString("default", { month: "long" });
      const trimestre = Math.floor(fecha.getMonth() / 3) + 1; // Obtener el trimestre
      const trimestreKey = `${fecha.getFullYear()}-T${trimestre}`;

      if (!acumulador[trimestreKey]) {
        acumulador[trimestreKey] = {
          trimestre: `${mes} - T${trimestre}`,
          total_pagar: 0,
        };
      }

      acumulador[trimestreKey].total_pagar += factura.estadistica.total_pagar;
      return acumulador;
    },
    {}
  );

  // Calcular el total de ganancias por trimestre
  const gananciasPorTrimestre = Object.values(facturasPorTrimestre);

  // Configuración de ApexCharts
  const options = {
    chart: {
      id: "ganancias-trimestrales",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: gananciasPorTrimestre.map((item) => item.trimestre),
      labels: {
        rotate: -45,
        style: {
          colors: "#333",
        },
      },
    },
    yaxis: {
      title: {
        text: "Ganancias (ARS)",
      },
      labels: {
        formatter: function (value) {
          return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(value);
        },
      },
    },
    colors: ["rgba(14 165 233)"],

    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "10%",
        borderRadius: "20",
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Ganancias",
      data: gananciasPorTrimestre.map((item) => item.total_pagar),
    },
  ];

  console.log("asdasd", ventasFiltradasAccesorios);

  const subtotales = ventasFiltradasAccesorios.map((venta) => {
    return venta.productos.respuesta.reduce((acc, producto) => {
      return acc + producto.subtotal;
    }, 0);
  });

  const totalGlobal = subtotales.reduce((acc, subtotal) => acc + subtotal, 0);

  return (
    <div className="py-[50px] px-[30px] w-full h-full flex flex-col gap-6">
      {" "}
      <div className="flex gap-2 items-stretch">
        <div className="">
          <input
            value={fechaInicio}
            onChange={handleFechaInicioChange}
            type="date"
            className="bg-white text-sm font-semibold border border-gray-300 rounded-md py-2 px-3 outline-none"
            placeholder="Fecha de inicio"
          />
        </div>
        <div>
          <input
            value={fechaFin}
            onChange={handleFechaFinChange}
            type="date"
            className="bg-white text-sm font-semibold border border-gray-300 rounded-md py-2 px-3 outline-none"
            placeholder="Fecha fin"
          />
        </div>

        <div className="flex gap-1 uppercase border border-gray-300 py-1.5 px-2 rounded-md">
          <p className="font-medium">MES FILTRADO</p>
          <p className="font-bold text-blue-500">
            {formatearTipoMes(fechaFin)}
          </p>
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-4 gap-5">
          {ventasPorMes.map((mesVentas) => (
            <div
              key={mesVentas.mes}
              className="border-[1px] border-gray-200 rounded w-full px-[20px] py-[20px] shadow-md shadow-black/5 flex flex-col gap-2 hover:shadow-black/20 hover:shadow-md hover:translate-x-1 cursor-pointer transition-all ease-in-out uppercase"
            >
              <p className="font-semibold text-center text-blue-500">
                VENTAS EN PERFILES
              </p>
              <p className="text-2xl font-bold text-center text-slate-700">
                {mesVentas.totalVentas.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </p>
              {/* <p className="text-sm text-gray-500 text-center">
                Perfiles Vendidos: {mesVentas.perfilesVendidos}
              </p>
              <p className="text-sm text-gray-500 text-center">
                KG Vendidos: {mesVentas.kgVendidos.toFixed(2)}
              </p> */}
            </div>
          ))}
          {/* Cuarto cuadro para los perfiles vendidos */}
          <div className="border-[1px] border-gray-200 rounded w-full px-[20px] py-[20px] shadow-md shadow-black/5 flex flex-col gap-2 hover:shadow-black/20 hover:shadow-md hover:translate-x-1 cursor-pointer transition-all ease-in-out justify-center">
            <p className="font-semibold text-center text-blue-500">
              PERFILES VENDIDOS
            </p>
            <p className="text-2xl font-bold text-center text-slate-700">
              {ventasPorMes.reduce(
                (total, mesVentas) => total + mesVentas.perfilesVendidos,
                0
              )}
            </p>
          </div>
          {/* Quinto cuadro para los clientes vendidos */}

          {/* Sexto cuadro para los KG vendidos */}
          <div className="border-[1px] border-gray-200 rounded w-full px-[20px] py-[20px] shadow-md shadow-black/5 flex flex-col gap-2 hover:shadow-black/20 hover:shadow-md hover:translate-x-1 cursor-pointer transition-all ease-in-out justify-center">
            <p className="font-semibold text-center text-blue-500">
              KG VENDIDOS
            </p>
            <p className="text-2xl font-bold text-center text-slate-700">
              {totalKgVendidos.toFixed(2)}
            </p>
          </div>
          <div className="border-[1px] border-gray-200 rounded w-full px-[20px] py-[20px] shadow-md shadow-black/5 flex flex-col gap-2 hover:shadow-black/20 hover:shadow-md hover:translate-x-1 cursor-pointer transition-all ease-in-out justify-center">
            <p className="font-semibold text-center text-blue-500">
              CLIENTES VENDIDOS
            </p>
            <p className="text-2xl font-bold text-center text-slate-700">
              {clientesVendidos + ventasFiltradasAccesorios.length}
            </p>
          </div>
          <div className="border-[1px] border-gray-200 rounded w-full px-[20px] py-[20px] shadow-md shadow-black/5 flex flex-col gap-2 hover:shadow-black/20 hover:shadow-md hover:translate-x-1 cursor-pointer transition-all ease-in-out justify-center">
            <p className="font-semibold text-center text-blue-500">
              TOTAL EN ACCESORIOS VENDIDOS
            </p>
            <p className="text-2xl font-bold text-center text-slate-700">
              {formatearDinero(totalGlobal)}
            </p>
          </div>
          <div className="border-[1px] border-gray-200 rounded w-full px-[20px] py-[20px] shadow-md shadow-black/5 flex flex-col gap-2 hover:shadow-black/20 hover:shadow-md hover:translate-x-1 cursor-pointer transition-all ease-in-out justify-center">
            <p className="font-semibold text-center text-blue-500">
              TOTAL UNIDADES DE ACCESORIOS
            </p>
            <p className="text-2xl font-bold text-center text-slate-700">
              {ventasFiltradasAccesorios.length}
            </p>
          </div>
          <div className="border-[1px] border-gray-200 rounded w-full px-[20px] py-[20px] shadow-md shadow-black/5 flex flex-col gap-2 hover:shadow-black/20 hover:shadow-md hover:translate-x-1 cursor-pointer transition-all ease-in-out justify-center">
            <p className="font-semibold text-center text-blue-500">
              GANANCIA TOTAL SISTEMA
            </p>
            <p className="text-2xl font-bold text-center text-slate-700">
              {formatearDinero(
                totalGlobal +
                  ventasPorMes.reduce(
                    (total, mesVentas) => total + mesVentas.totalVentas,
                    0
                  )
              )}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="text-slate-700 pb-2 mt-4 font-bold">
          PROGRESO EN VENTAS/GANANCIAS POR CATEGORIA
        </div>
        <div className="border-slate-200 border-[1px] rounded py-10 px-10 shadow flex flex-col gap-3">
          {Object.entries(totalPorCategoriaColor).map(
            ([categoria, colores]) => (
              <div
                className="flex flex-col gap-1 border-slate-200 border-[1px] py-2 px-3 rounded shadow"
                key={categoria}
              >
                <h3 className="uppercase font-bold">{categoria}</h3>
                {Object.entries(colores).map(([color, precio]) => {
                  const porcentaje = (precio / totalGeneral) * 1000;
                  return (
                    <div key={color}>
                      <p className="uppercase font-semibold text-slate-600">
                        {color}{" "}
                        <span className="font-extrabold text-blue-600">
                          {Number(precio).toLocaleString("es-ar", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </p>
                      <progress
                        className="[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg rounded-full  [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-[#FD454D] [&::-moz-progress-bar]:bg-[#FD454D] w-full"
                        value={porcentaje}
                        max="100"
                      >
                        {porcentaje.toFixed(2)}%
                      </progress>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>
      </div>
      <div>
        <div className="text-slate-700 font-bold pb-2 mt-4">
          PROGRESO DE KILOGRAMOS VENDIDOS SEPARADOS POR CATEGORIAS
        </div>
        <div className="border-slate-200 border-[1px] rounded py-10 px-10 shadow flex flex-col gap-3">
          {Object.entries(totalPorCategoriaColorKG).map(
            ([categoria, colores]) => (
              <div
                className="flex flex-col gap-1 border-slate-200 border-[1px] py-2 px-3 rounded shadow w-full"
                key={categoria}
              >
                <h3 className="uppercase font-bold">{categoria}</h3>
                {Object.entries(colores).map(([color, kg]) => {
                  const porcentaje = (kg / totalGeneralKg) * 1000;
                  return (
                    <div key={color}>
                      <p className="uppercase font-semibold text-slate-600">
                        {color}{" "}
                        <span className="font-extrabold text-blue-600">
                          {Number(kg).toFixed(2)} kg
                        </span>
                      </p>
                      <progress
                        className="[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg rounded-full  [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-[#FD454D] [&::-moz-progress-bar]:bg-[#FD454D] w-full"
                        value={porcentaje}
                        max="100"
                      >
                        {porcentaje.toFixed(2)}%
                      </progress>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>
      </div>
      {/* <div className="uppercase text-slate-600">Grafico de ganancias</div>
      <div className="border-slate-200 border-[1px] shadow rounded">
        <ApexCharts
          className="uppercase px-10 py-5"
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div> */}
    </div>
  );
};
