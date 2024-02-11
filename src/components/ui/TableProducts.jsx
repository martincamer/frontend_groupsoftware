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
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full">
      <table className="border-[1px]  p-[5px] table-auto w-full rounded uppercase">
        <thead>
          <tr>
            {/* <th className="p-3 text-sm">ID</th> */}
            <th className="p-3 text-sm">Codigo</th>
            <th className="p-3 text-sm">Stock</th>
            <th className="p-3 text-sm">KG Barra estimado/a</th>
            <th className="p-3 text-sm">Categoria</th>
            <th className="p-3 text-sm">Color</th>
            <th className="p-3 text-sm">Detalle</th>
            <th className="p-3 text-sm">Eliminar</th>
            <th className="p-3 text-sm">Editar</th>
          </tr>
        </thead>
        <tbody>
          {currentResults?.map((p) => (
            <tr key={p.id}>
              {/* <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {p.id}
              </th> */}
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {p.nombre}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {p.stock}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {p.peso_neto_barra_6mts} kg
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {p.categoria}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {p.color}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {p.descripcion}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-bold ">
                <button
                  className="bg-red-500 py-1 px-2 text-white rounded text-xs cursor-pointer uppercase"
                  // onClick={() => handleEliminar(p.id)}
                  onClick={() => {
                    handleIdEliminar(p.id), openEliminarProducto();
                  }}
                >
                  eliminar
                </button>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-bold ">
                <button
                  onClick={() => {
                    openModalEditar(), handlePerfilSeleccionado(p.id);
                  }}
                  className="bg-blue-500 py-1 px-2 text-white rounded text-xs uppercase cursor-pointer"
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
                  ? "bg-secondary hover:bg-primary transition-all ease-in-out text-white shadow shadow-black/20 text-sm"
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
