import React from "react";

export const IntroProductosStock = ({ results }) => {
  //sumar totales
  const calcularStockTotal = () => {
    const stockTotal = results.reduce((acumulador, elemento) => {
      // Sumar el stock de cada elemento
      return acumulador + (elemento.stock ? parseInt(elemento.stock) : 0);
    }, 0);

    return stockTotal;
  };

  console.log(results);
  // console.log(unidadesEnStock());

  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex gap-2 w-full text-center uppercase">
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="text-lg font-semibold text-secondary">
          Unidades en Stock
        </p>
        <p className="font-bold text-lg">{calcularStockTotal()} - unidades</p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p className="text-lg font-semibold text-secondary">
          Unidades vendidas
        </p>
        <p className="font-bold text-lg">-</p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 w-full">
        <p className="text-lg font-semibold text-secondary">Inactivos</p>
        <p className="font-bold text-lg">-</p>
      </div>
    </div>
  );
};
