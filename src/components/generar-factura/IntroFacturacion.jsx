import { useFacturaContext } from "../../context/FacturaProvider";
import { BsCashCoin } from "react-icons/bs";

export const IntroFacturacion = () => {
  const { facturasMensuales } = useFacturaContext();

  // console.log(results.map((price) => price.estadistica.total_pagar));

  const totalPagar = () => {
    // Filtra las facturas para no considerar las marcadas como rechazadas
    const facturasFiltradas = facturasMensuales.filter(
      (factura) => factura.estado !== "rechazado"
    );

    // Realiza la suma del campo total_pagar de las facturas filtradas
    return facturasFiltradas.reduce((sum, factura) => {
      return sum + Number(factura.estadistica.total_pagar);
    }, 0);
  };

  return (
    <div className="border-[1px] border-gray-300 rounded-2xl cursor-pointer hover:shadow-md flex gap-2 w-full text-center transition-all ease-linear">
      <div className="py-[28px] px-[10px] border-gray-200 flex justify-center flex-col gap-2 border-r-[1px] w-full">
        <p className="uppercase text-sky-500 font-semibold text-lg">
          Facturas De Ventas en el mes
        </p>
        <p className="font-bold text-xl text-slate-700">
          {facturasMensuales.length}
        </p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col justify-center items-center gap-2 border-r-[1px] w-full">
        <p className="uppercase text-sky-500 font-semibold text-lg">
          Total Facturado - Ventas en el mes
        </p>
        <p className="font-normal text-lg text-green-700 bg-green-100 py-3 px-6 rounded-2xl flex gap-2 items-center">
          {totalPagar().toLocaleString("es-ar", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
          })}
          <BsCashCoin className="text-2xl" />
        </p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col justify-center gap-2 w-full">
        <p className="uppercase text-sky-500 font-semibold text-lg">
          Total de ventas a clientes en el mes
        </p>
        <p className="font-bold text-slate-700 text-xl">
          {facturasMensuales.length}
        </p>
      </div>
    </div>
  );
};
