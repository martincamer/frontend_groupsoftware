import { useAluminioContext } from "../../context/AluminioProvider";
import { useState } from "react";

export const TableProducts = ({
  results,
  openModalEditar,
  handlePerfilSeleccionado,
  openEliminarProducto,
  handleIdEliminar,
}) => {
  const itemsPerPage = 12; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = results.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="border-[1px] border-gray-20  shadow-black/10 shadow-xs rounded-lg flex flex-col gap-3 w-full">
      <table className="border-[1px]  p-[5px] table-auto w-full  uppercase">
        <thead>
          <tr>
            {/* <th className="p-3 text-sm">ID</th> */}
            <th className="p-3 border-b-[2px] text-sm">Codigo</th>
            <th className="p-3 border-b-[2px] text-sm">Stock</th>
            <th className="p-3 border-b-[2px] text-sm">KG Barra estimado/a</th>
            <th className="p-3 border-b-[2px] text-sm">Categoria</th>
            <th className="p-3 border-b-[2px] text-sm">Color</th>
            <th className="p-3 border-b-[2px] text-sm">Detalle</th>
            <th className="p-3 border-b-[2px] text-sm">Eliminar</th>
            <th className="p-3 border-b-[2px] text-sm">Editar</th>
          </tr>
        </thead>
        <tbody>
          {currentResults?.map((p) => (
            <tr
              className="hover:bg-gray-100/50 transition-all ease-in-out duration-300 cursor-pointer"
              key={p.id}
            >
              {/* <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {p.id}
              </th> */}
              <th className="border-b-[1px] border-gray-300 px-3 py-4 font-normal text-sm">
                {p.nombre}
              </th>
              <th className="border-b-[1px] border-gray-300 px-3 py-4 font-normal text-sm">
                {p.stock}
              </th>
              <th className="border-b-[1px] border-gray-300 px-3 py-4 font-normal text-sm">
                {p.peso_neto_barra_6mts} kg
              </th>
              <th className="border-b-[1px] border-gray-300 px-3 py-4 font-normal text-sm">
                {p.categoria}
              </th>
              <th className="border-b-[1px] border-gray-300 px-3 py-4 font-normal text-sm">
                {p.color}
              </th>
              <th className="border-b-[1px] border-gray-300 px-3 py-4 font-normal text-sm">
                {p.descripcion}
              </th>
              <th className="border-b-[1px] border-gray-300 px-3 py-4 font-normal ">
                <button
                  className="bg-red-100/20 text-red-800 border-[1px] border-red-800 py-1 px-2 rounded text-xs cursor-pointer uppercase"
                  // onClick={() => handleEliminar(p.id)}
                  onClick={() => {
                    handleIdEliminar(p.id), openEliminarProducto();
                  }}
                >
                  eliminar
                </button>
              </th>
              <th className="border-b-[1px] border-gray-300 p-3 font-bold ">
                <button
                  onClick={() => {
                    openModalEditar(), handlePerfilSeleccionado(p.id);
                  }}
                  className="bg-sky-100/20 border-sky-500 border-[1px] py-1 px-2 text-sky-500 rounded text-xs uppercase cursor-pointer"
                >
                  editar
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-4 mb-4 gap-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-sky-500 hover:bg-primary transition-all ease-in-out text-white shadow shadow-black/20 text-sm"
                  : "bg-gray-100 shadow shadow-black/20 text-sm"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
