import { useEffect, useState } from "react";
import { obtenerFacturasMensuales } from "../../../api/factura.api";
import ChartVentasPorMes from "../../../components/ui/ChartJsVentas";

export const HomeApp = () => {
  const [ventasPorMes, setVentasPorMes] = useState([]);
  const [clientesVendidos, setClientesVendidos] = useState(0);
  const [totalKgVendidos, setTotalKgVendidos] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await obtenerFacturasMensuales();

      setData(res.data);
    }

    loadData();
  }, []);

  useEffect(() => {
    const calcularVentasPorMes = () => {
      const ventasMes = {};

      data?.forEach((venta) => {
        const fecha = new Date(venta?.created_at);
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
      data.forEach((venta) => totalClientesVendidos.add(venta.clientes.id));
      setClientesVendidos(totalClientesVendidos.size);

      // Calcular kg vendidos en total
      const totalKg = estadisticasVentasPorMes.reduce(
        (total, mesVentas) => total + mesVentas.kgVendidos,
        0
      );
      setTotalKgVendidos(totalKg);
    };

    calcularVentasPorMes();
  }, [data]);

  return (
    <div className="py-[50px] px-[30px] w-full h-full flex flex-col gap-6">
      <div className="">
        <div className="grid grid-cols-4 gap-10">
          {ventasPorMes.map((mesVentas) => (
            <div
              key={mesVentas.mes}
              className="border-[1px] border-gray-200 rounded w-full px-[20px] py-[20px] shadow-md shadow-black/5 flex flex-col gap-2 hover:shadow-black/20 hover:shadow-md hover:translate-x-1 cursor-pointer transition-all ease-in-out uppercase"
            >
              <p className="font-semibold text-center text-sky-500">
                VENTAS {mesVentas.mes.toUpperCase()}
              </p>
              <p className="text-2xl font-bold text-center text-slate-700">
                {mesVentas.totalVentas.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="text-sm text-gray-500 text-center">
                Perfiles Vendidos: {mesVentas.perfilesVendidos}
              </p>
              <p className="text-sm text-gray-500 text-center">
                KG Vendidos: {mesVentas.kgVendidos.toFixed(2)}
              </p>
            </div>
          ))}
          {/* Cuarto cuadro para los perfiles vendidos */}
          <div className="border-[1px] border-gray-200 rounded w-full px-[20px] py-[20px] shadow-md shadow-black/5 flex flex-col gap-2 hover:shadow-black/20 hover:shadow-md hover:translate-x-1 cursor-pointer transition-all ease-in-out justify-center">
            <p className="font-semibold text-center text-sky-500">
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
          <div className="border-[1px] border-gray-200 rounded w-full px-[20px] py-[20px] shadow-md shadow-black/5 flex flex-col gap-2 hover:shadow-black/20 hover:shadow-md hover:translate-x-1 cursor-pointer transition-all ease-in-out justify-center">
            <p className="font-semibold text-center text-sky-500">
              CLIENTES VENDIDOS
            </p>
            <p className="text-2xl font-bold text-center text-slate-700">
              {clientesVendidos}
            </p>
          </div>
          {/* Sexto cuadro para los KG vendidos */}
          <div className="border-[1px] border-gray-200 rounded w-full px-[20px] py-[20px] shadow-md shadow-black/5 flex flex-col gap-2 hover:shadow-black/20 hover:shadow-md hover:translate-x-1 cursor-pointer transition-all ease-in-out justify-center">
            <p className="font-semibold text-center text-sky-500">
              KG VENDIDOS
            </p>
            <p className="text-2xl font-bold text-center text-slate-700">
              {totalKgVendidos.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full h-full mx-auto border-[1px] py-10 px-4 rounded shadow">
        <ChartVentasPorMes ventasPorMes={ventasPorMes} />
      </div>
    </div>
  );
};
