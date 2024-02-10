import { useClientesContext } from "../../context/ClientesProvider";

export const IntroEstadisticas = () => {
  const { results } = useClientesContext();

  const resultadoTotal = results.reduce((sum, b) => {
    return sum + Number(b?.total_facturado);
  }, 0);

  console.log(results);
  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex gap-2 w-full text-center">
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="uppercase font-semibold text-lg text-secondary">
          Total clientes vendidos
        </p>
        <p className="font-bold text-lg">{results?.length}</p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="uppercase font-semibold text-lg text-secondary">
          Total facturado
        </p>
        <p className="font-bold text-lg">
          {resultadoTotal.toLocaleString("es-ar", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  );
};
