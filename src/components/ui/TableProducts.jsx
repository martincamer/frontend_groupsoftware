import { useState } from "react";

export const TableProducts = ({
  results,
  openModalEditar,
  handlePerfilSeleccionado,
  openEliminarProducto,
  handleIdEliminar,
  openEditarStock,
}) => {
  const itemsPerPage = 15; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  // Ordenar los resultados antes de paginar
  const sortedResults = [...results].sort((a, b) => {
    // Si ambos tienen stock o ambos no tienen stock, mantén el orden actual
    if ((a.stock > 0 && b.stock > 0) || (a.stock <= 0 && b.stock <= 0)) {
      return 0;
    }
    // Si a tiene stock y b no, pon a antes que b
    if (a.stock > 0 && b.stock <= 0) {
      return -1;
    }
    // Si b tiene stock y a no, pon b antes que a
    if (b.stock > 0 && a.stock <= 0) {
      return 1;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = sortedResults.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="border-[1px] border-slate-300 hover:shadow-md transition-all ease-linear uppercase cursor-pointer rounded-2xl flex flex-col gap-3 w-full">
        <table className="table-auto min-w-full">
          <thead className="border-b-[2px] border-slate-300">
            <tr>
              {/* <th className="p-3 text-sm">ID</th> */}
              <th className="py-5 px-3 text-sm">Codigo</th>
              <th className="py-5 px-3 text-sm">Stock</th>
              <th className="py-5 px-3 text-sm">KG Barra estimado/a</th>
              <th className="py-5 px-3 text-sm">Categoria</th>
              <th className="py-5 px-3 text-sm">Color</th>
              <th className="py-5 px-3 text-sm">Detalle</th>
              <th className="py-5 px-3 text-sm">Estado</th>
              <th className="py-5 px-3 text-sm">Editar stock</th>
              <th className="py-5 px-3 text-sm">Eliminar</th>
              <th className="py-5 px-3 text-sm">Editar</th>
            </tr>
          </thead>
          <tbody className="divide-y-[1px] divide-slate-300">
            {currentResults?.map((p) => (
              <tr
                className="hover:bg-gray-100/50 transition-all ease-in-out duration-300 cursor-pointer"
                key={p.id}
              >
                {/* <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
                {p.id}
              </th> */}
                <th className="px-3 py-4 font-normal text-sm">{p.nombre}</th>
                <th className="px-3 py-4 text-sm font-bold flex justify-center">
                  <p
                    className={`py-2 px-5 rounded-xl text-sm cursor-pointer uppercase ${
                      p.stock > 20
                        ? "bg-green-100 text-green-700"
                        : p.stock <= 0
                        ? "text-red-700 bg-red-100"
                        : p.stock <= 20
                        ? "text-sky-700 bg-sky-100"
                        : ""
                    }`}
                  >
                    {p.stock}
                  </p>
                </th>
                <th className="px-3 py-4 font-normal text-sm">
                  {p.peso_neto_barra_6mts} kg
                </th>
                <th className="px-3 py-4 font-normal text-sm">{p.categoria}</th>
                <th className="px-3 py-4 font-normal text-sm">{p.color}</th>
                <th className="px-3 py-4 font-normal text-sm">
                  {p.descripcion}
                </th>
                <th className="px-3 py-4 font-normal ">
                  <button
                    type="button"
                    className={`py-2 px-5 rounded-xl text-xs cursor-pointer uppercase ${
                      p.stock > 20
                        ? "bg-green-100 text-green-700"
                        : p.stock <= 0
                        ? "text-red-700 bg-red-100"
                        : p.stock <= 20
                        ? "text-sky-700 bg-sky-100"
                        : ""
                    }`}
                  >
                    {p.stock > 40
                      ? "MUCHO STOCK"
                      : p.stock <= 0
                      ? "SE ACABÓ EL STOCK"
                      : p.stock <= 30
                      ? "QUEDA POCO STOCK"
                      : ""}
                  </button>
                </th>
                <th className="p-3 font-normal ">
                  <button
                    onClick={() => {
                      openEditarStock(), handlePerfilSeleccionado(p.id);
                    }}
                    className="py-2 px-5 rounded-xl text-xs cursor-pointer uppercase text-green-700 bg-green-100 text-ksy-700 font-normal hover:bg-green-300"
                  >
                    editar stock
                  </button>
                </th>
                <th className="px-3 py-4 font-normal ">
                  <button
                    className="py-2 px-5 rounded-xl text-xs cursor-pointer uppercase bg-red-100 text-red-800 hover:bg-red-300"
                    // onClick={() => handleEliminar(p.id)}
                    onClick={() => {
                      handleIdEliminar(p.id), openEliminarProducto();
                    }}
                  >
                    eliminar
                  </button>
                </th>
                <th className="p-3 font-normal ">
                  <button
                    onClick={() => {
                      openModalEditar(), handlePerfilSeleccionado(p.id);
                    }}
                    className="py-2 px-5 rounded-xl text-xs cursor-pointer uppercase bg-sky-100 text-sky-700 text-ksy-700 font-normal hover:bg-sky-300"
                  >
                    editar
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-4 mb-4 gap-1">
          {currentPage > 1 && (
            <button
              className="mx-1 px-3 py-1 rounded-xl bg-gray-100 shadow shadow-black/20 text-sm"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              {"<"}
            </button>
          )}
          {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
            const pageNumber = index + 1;
            const displayPageNumber =
              currentPage > 5 ? currentPage - 1 + index : pageNumber;
            return (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded-xl ${
                  currentPage === displayPageNumber
                    ? "bg-sky-500 hover:bg-primary transition-all ease-in-out text-white shadow shadow-black/20 text-sm"
                    : "bg-gray-100 shadow shadow-black/20 text-sm"
                }`}
                onClick={() => handlePageChange(displayPageNumber)}
              >
                {displayPageNumber}
              </button>
            );
          })}
          {currentPage < totalPages && (
            <button
              className="mx-1 px-3 py-1 rounded-xl bg-gray-100 shadow shadow-black/20 text-sm"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {">"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
