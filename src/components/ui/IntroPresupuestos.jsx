import { usePresupuestoContext } from "../../context/PresupuestoProvider";

export const IntroPresupuestos = () => {
  const { results } = usePresupuestoContext();

  // console.log(datosPresupuesto.map((price) => price.estadistica.total_pagar));

  const totalPagar = () => {
    return results.reduce((sum, b) => {
      return sum + Number(b.estadistica.total_pagar);
    }, 0);
  };
  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex gap-2 w-full text-center">
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="font-bold text-secondary text-lg uppercase">
          Presupuestos Totales
        </p>
        <p className="font-bold text-lg uppercase">{results.length}</p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="font-bold text-secondary text-lg uppercase">
          Total Facturado - Presupuestos
        </p>
        <p className="font-bold text-lg uppercase">
          {totalPagar().toLocaleString("es-ar", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
          })}
        </p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 w-full">
        <p className="font-bold text-secondary text-lg uppercase">
          Total clientes presupuestos
        </p>
        <p className="font-bold text-lg uppercase">{results.length}</p>
      </div>
    </div>
  );
};
