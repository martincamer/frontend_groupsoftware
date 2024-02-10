import React from "react";

export const IntroVentas = () => {
  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex gap-2 w-full text-center">
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p>Ventas totales</p>
        <p>27</p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 border-r-[1px] w-full">
        <p>Ventas canceladas</p>
        <p>27</p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 w-full border-r-[1px]">
        <p>Ventas pendientes</p>
        <p>27</p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 w-full border-r-[1px]">
        <p>Total cobrado</p>
        <p>$320.000</p>
      </div>
      <div className="py-[10px] px-[10px] border-gray-200 flex flex-col gap-2 w-full border-r-[1px]">
        <p>Total que deben</p>
        <p>$120.000</p>
      </div>
    </div>
  );
};
