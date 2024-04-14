import { useState } from "react";

export const TableClients = ({
  results,
  handleClienteSeleccionado,
  openModalEditar,
  openEliminarProducto,
  handleIdEliminar,
}) => {
  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = results.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="border-[1px] border-gray-200 rounded-2xl hover:shadow-md flex flex-col gap-3 w-full h-full">
        <table className="divide-y-[2px] divide-slate-300 uppercase min-w-full">
          <thead>
            <tr>
              {/* <th className="p-3 text-sm">ID</th> */}
              <th className="py-4 px-3 text-sm">Nombre</th>
              <th className="py-4 px-3 text-sm">Apellido</th>
              <th className="py-4 px-3 text-sm">Email</th>
              <th className="py-4 px-3 text-sm">Telefono</th>
              <th className="py-4 px-3 text-sm">Domicilio</th>
              <th className="py-4 px-3 text-sm">Localidad</th>
              <th className="py-4 px-3 text-sm">Provincia</th>
              <th className="py-4 px-3 text-sm">Dni</th>
              <th className="py-4 px-3 text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y-[1px] divide-slate-300">
            {currentResults?.map((p) => (
              <tr
                className="hover:bg-gray-100/50 cursor-pointer transition-all ease-in-out duration-300"
                key={p.id}
              >
                {/* <th className="border-[1px] border-gray-300 p-3 font-normal uppercase text-sm">
                {p.id}
              </th> */}
                <th className="px-3 font-normal py-5 uppercase text-sm">
                  {p.nombre}
                </th>
                <th className="px-3 font-normal py-5 uppercase text-sm">
                  {p.apellido}
                </th>
                <th className="px-3 font-normal py-5 uppercase text-sm">
                  {p.email}
                </th>
                <th className="px-3 font-normal py-5 uppercase text-sm">
                  {p.telefono}
                </th>
                <th className="px-3 font-normal py-5 uppercase text-sm">
                  {p.domicilio}
                </th>
                <th className="px-3 font-normal py-5 uppercase text-sm">
                  {p.localidad}
                </th>
                <th className="px-3 font-normal py-5 uppercase text-sm">
                  {p.provincia}
                </th>
                <th className="px-3 font-normal py-5 uppercase text-sm">
                  {p.dni}
                </th>
                <th className="space-x-3 p-3 font-bold uppercase text-sm">
                  <button
                    className="bg-red-100 text-red-800  py-2 px-4 rounded-xl text-xs cursor-pointer uppercase"
                    // onClick={() => handleEliminar(p.id)}
                    onClick={() => {
                      handleIdEliminar(p?.id), openEliminarProducto();
                    }}
                  >
                    eliminar
                  </button>
                  <button
                    onClick={() => {
                      openModalEditar(), handleClienteSeleccionado(p.id);
                    }}
                    className="bg-sky-100 text-sky-800  py-2 px-6 rounded-xl text-xs cursor-pointer uppercase"
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
