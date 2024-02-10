import React from "react";

export const TableVentas = () => {
  return (
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full">
      <table className="border-[1px]  p-[5px] table-auto w-full rounded">
        <thead>
          <tr>
            <th className="p-2 text-sm font-extrabold">ID</th>
            <th className="p-2 text-sm font-extrabold">Emision</th>
            <th className="p-2 text-sm font-extrabold">Vencimiento</th>
            <th className="p-2 text-sm font-extrabold">Cliente</th>
            <th className="p-2 text-sm font-extrabold">Total a pagar</th>
            <th className="p-2 text-sm font-extrabold">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="border-[1px] border-gray-300 p-2 text-sm">
              Header 1
            </th>
            <th className="border-[1px] border-gray-300 p-2 text-sm">
              Header 1
            </th>
            <th className="border-[1px] border-gray-300 p-2 text-sm">
              Header 1
            </th>
            <th className="border-[1px] border-gray-300 p-2 text-sm">
              Header 1
            </th>
            <th className="border-[1px] border-gray-300 p-2 text-sm">
              Header 1
            </th>
            <th className="border-[1px] border-gray-300 p-2 text-sm">
              Header 1
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
