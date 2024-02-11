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
    <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full h-full">
      <table className="border-[1px]  p-[5px] table-auto w-full rounded uppercase text-sm">
        <thead>
          <tr>
            {/* <th className="p-3 text-sm">ID</th> */}
            <th className="p-3 text-sm">Nombre</th>
            <th className="p-3 text-sm">Apellido</th>
            <th className="p-3 text-sm">Email</th>
            <th className="p-3 text-sm">Telefono</th>
            <th className="p-3 text-sm">Domicilio</th>
            <th className="p-3 text-sm">Localidad</th>
            <th className="p-3 text-sm">Provincia</th>
            <th className="p-3 text-sm">Dni</th>
            <th className="p-3 text-sm">Eliminar</th>
            <th className="p-3 text-sm">Editar</th>
          </tr>
        </thead>
        <tbody>
          {currentResults?.map((p) => (
            <tr key={p.id}>
              {/* <th className="border-[1px] border-gray-300 p-3 font-medium uppercase text-sm">
                {p.id}
              </th> */}
              <th className="border-[1px] border-gray-300 p-3 font-medium uppercase text-sm">
                {p.nombre}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium uppercase text-sm">
                {p.apellido}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium uppercase text-sm">
                {p.email}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium uppercase text-sm">
                {p.telefono}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium uppercase text-sm">
                {p.domicilio}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium uppercase text-sm">
                {p.localidad}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium uppercase text-sm">
                {p.provincia}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium uppercase text-sm">
                {p.dni}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-bold uppercase text-sm">
                <button
                  className="bg-red-500 py-1 px-2 text-white rounded cursor-pointer uppercase text-xs"
                  // onClick={() => handleEliminar(p.id)}
                  onClick={() => {
                    handleIdEliminar(p?.id), openEliminarProducto();
                  }}
                >
                  eliminar
                </button>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-bold ">
                <button
                  onClick={() => {
                    openModalEditar(), handleClienteSeleccionado(p.id);
                  }}
                  className="bg-blue-500 py-1 px-2 text-white rounded cursor-pointer uppercase text-xs"
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
