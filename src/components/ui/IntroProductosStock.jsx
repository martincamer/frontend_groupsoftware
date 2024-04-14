import { useEffect, useState } from "react";
import { obtenerFacturasMensuales } from "../../api/factura.api";

export const IntroProductosStock = ({ results }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await obtenerFacturasMensuales();

      setData(res.data);
    }

    loadData();
  }, []);

  console.log(data);

  //sumar totales
  const calcularStockTotal = () => {
    const stockTotal = results.reduce((acumulador, elemento) => {
      // Sumar el stock de cada elemento
      return acumulador + (elemento.stock ? parseInt(elemento.stock) : 0);
    }, 0);

    return stockTotal;
  };

  // Procesamiento de datos
  const processedData = data.reduce((acc, curr) => {
    curr.productos.respuesta.forEach((producto) => {
      if (!acc[producto.categoria]) {
        acc[producto.categoria] = {
          totalKG: 0,
          totalBarras: 0,
          totalPrecioUnitario: 0,
        };
      }
      acc[producto.categoria].totalKG += producto.totalKG;
      acc[producto.categoria].totalBarras += parseInt(producto.barras);
      acc[producto.categoria].totalPrecioUnitario +=
        producto.totalPrecioUnitario;
    });
    return acc;
  }, {});

  // Convertir en arreglo y mapear
  const dataArray = Object.entries(processedData).map(
    ([categoria, valores]) => {
      return {
        categoria: categoria,
        totalKG: valores.totalKG,
        totalBarras: valores.totalBarras,
        totalPrecioUnitario: valores.totalPrecioUnitario,
      };
    }
  );

  console.log(dataArray);

  return (
    <div className="cursor-pointer border-[1px] border-gray-300 rounded-2xl hover:shadow-md transition-all ease-linear flex gap-2 w-full text-center uppercase">
      <div className="py-[30px] px-[10px] border-gray-200 flex flex-col justify-center gap-2 border-r-[1px] w-full">
        <p className="text-lg font-semibold text-sky-500">Unidades en Stock</p>
        <p className="font-bold text-lg text-slate-700 flex gap-2 items-center justify-center">
          <p className="bg-sky-100 text-sky-700 py-2 px-4 rounded-xl">
            {calcularStockTotal()}
          </p>{" "}
          - unidades en stock
        </p>
      </div>
      <div className="py-[30px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="text-lg font-semibold text-sky-500">
          Unidades vendidas por categorias
        </p>
        <div className="font-bold text-lg text-slate-800 grid grid-cols-2 gap-2 items-center h-[70px] overflow-y-scroll">
          {dataArray.map((datos) => (
            <div className="flex gap-2 border-slate-300 border-[1px] py-2 items-center px-5 rounded-xl shadow text-xs">
              <p>{datos.categoria} -</p>
              <p>{datos.totalBarras} brs -</p>
              <p className="bg-sky-100 text-sky-700 py-2 px-2 rounded-xl">
                {datos.totalKG.toFixed(2)} kgs
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="py-[30px] px-[10px] border-gray-200 flex flex-col gap-2 w-full">
        <p className="text-lg font-semibold text-sky-500">
          Total remunerado en aluminio
        </p>
        <div className="font-bold text-lg text-slate-800 flex gap-2 items-center h-[60px] overflow-y-scroll justify-center">
          {dataArray.map((datos) => (
            <div className="text-xs flex gap-2 border-slate-300 border-[1px] py-2 items-center px-5 rounded-xl shadow">
              <p>{datos.categoria} -</p>
              <p className="bg-sky-100 text-sky-700 py-2 px-2 rounded-xl">
                {Number(datos.totalPrecioUnitario).toLocaleString("es-ar", {
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
  );
};
