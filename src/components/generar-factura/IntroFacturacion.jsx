import { useFacturaContext } from "../../context/FacturaProvider";

export const IntroFacturacion = () => {
  const { results } = useFacturaContext();

  // console.log(results.map((price) => price.estadistica.total_pagar));

  const totalPagar = () => {
    return results.reduce((sum, b) => {
      return sum + Number(b.estadistica.total_pagar);
    }, 0);
  };

  console.log(results);

  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex gap-2 w-full text-center">
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="uppercase text-secondary font-semibold text-lg">
          Facturas De Ventas Totales
        </p>
        <p className="font-bold text-lg">{results.length}</p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="uppercase text-secondary font-semibold text-lg">
          Total Facturado - Ventas
        </p>
        <p className="font-bold text-lg">
          {totalPagar().toLocaleString("es-ar", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
          })}
        </p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 w-full">
        <p className="uppercase text-secondary font-semibold text-lg">
          Total Clientes Ventas
        </p>
        <p className="font-bold text-lg">{results.length}</p>
      </div>
    </div>
  );
};
