import { useClientesContext } from "../../context/ClientesProvider";

export const IntroClientesStock = () => {
  const { results } = useClientesContext();

  // Filtrar los elementos donde total_facturado no sea igual a deuda_restante
  const resultados = results?.filter(
    (item) => item?.total_facturado !== item?.deuda_restante
  );

  // Mostrar la cantidad de elementos cuyos valores no son iguales
  const cantidadNoIguales = resultados.length;

  return (
    <div className="border-[1px] border-gray-300 rounded-2xl hover:shadow-md transition-all ease-linear cursor-pointer flex gap-2 w-full text-center uppercase">
      <div className="py-[26px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="font-bold text-lg text-sky-500">Clientes totales</p>
        <p className="font-bold text-xl text-gray-700">{results?.length}</p>
      </div>
      <div className="py-[26px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="font-bold text-lg text-sky-500">Deudores</p>
        <p className="font-bold text-xl text-gray-700">{cantidadNoIguales}</p>
      </div>
    </div>
  );
};
