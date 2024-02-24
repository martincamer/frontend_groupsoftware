import { useAluminioContext } from "../../context/AluminioProvider";

export const CategoriasProductos = ({
  openModal,
  openModalCrearCategoria,
  openModalVerCategoria,
}) => {
  const { openModalEditarColores, openModalVerColores } = useAluminioContext();

  return (
    <div>
      <div className="space-x-3">
        <button
          onClick={openModal}
          className="bg-sky-500 text-white font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out uppercase text-sm"
        >
          Crear nuevo producto
        </button>
        <button
          onClick={openModalCrearCategoria}
          className="bg-sky-500 text-white font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out uppercase text-sm"
        >
          Crear nuevo categorias
        </button>
        <button
          onClick={openModalVerColores}
          className="bg-sky-500 text-white font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out uppercase text-sm"
        >
          Crear nuevo color
        </button>
        <button
          onClick={openModalVerCategoria}
          className="bg-slate-500 text-white font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out uppercase text-sm"
        >
          Ver categorias creadas
        </button>
        <button
          onClick={openModalEditarColores}
          className="bg-slate-500 text-white font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out uppercase text-sm"
        >
          Ver colores creados
        </button>
      </div>
    </div>
  );
};
