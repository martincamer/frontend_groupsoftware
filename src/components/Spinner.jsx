import React from "react";
import "../styles/spinner.css";

export const Spinner = () => {
  return (
    <div className="h-full w-full">
      <button className="absolute top-[50%] left-[50%] flex gap-4 items-center bg-white border-[1px] border-black/20 rounded py-2 px-8 shadow shadow-black/20 font-bold text-lg">
        Cargando...
        <div id="circle1"></div>
      </button>
    </div>
  );
};
