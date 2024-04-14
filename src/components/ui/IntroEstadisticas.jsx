import { useClientesContext } from "../../context/ClientesProvider";
import { FaMoneyBill } from "react-icons/fa";
export const IntroEstadisticas = () => {
  const { results } = useClientesContext();

  const resultadoTotal = results.reduce((sum, b) => {
    return sum + Number(b?.total_facturado);
  }, 0);

  const resultadoTotalDeudas = results.reduce((sum, b) => {
    return sum + Number(b?.deuda_restante);
  }, 0);
  const clientesConDeudaPendiente = results.filter(
    (cliente) => Number(cliente.deuda_restante) > "0"
  );

  // Calcular la longitud de la lista de clientes con deuda pendiente
  const longitudDeudaPendiente = clientesConDeudaPendiente.length;

  return (
    <div className="border-[1px] cursor-pointer border-gray-300 rounded-xl hover:shadow-md transition-all ease-linear  flex gap-2 w-full text-center">
      <div className="py-[28px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full justify-center">
        <p className="uppercase font-semibold text-lg text-sky-500">
          Total clientes facturados/deudores
        </p>
        <p className="font-bold text-xl text-slate-700">
          {longitudDeudaPendiente}
        </p>
      </div>
      <div className="py-[28px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="uppercase font-semibold text-lg text-sky-500">
          Total facturado a los clientes
        </p>
        <div className="flex justify-center">
          <p className="font-normal text-lg text-green-700 bg-green-100 py-3 px-4 rounded-2xl flex gap-2 items-center">
            {resultadoTotal.toLocaleString("es-ar", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}
            <FaMoneyBill className="text-3xl" />
          </p>
        </div>
      </div>
      <div className="py-[28px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="uppercase font-semibold text-lg text-sky-500">
          Total en deuda restante de los clientes
        </p>
        <div className="flex justify-center">
          <p className="font-bold text-xl text-red-700 bg-red-100 py-3 px-4 rounded-2xl flex gap-2 items-center">
            {resultadoTotalDeudas.toLocaleString("es-ar", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}
            <FaMoneyBill className="text-3xl" />
          </p>
        </div>
      </div>
    </div>
  );
};
