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
          className="bg-sky-100 text-sky-700 shadow-md font-bold py-3 text-sm px-3 rounded-2xl cursor-pointer   transition-all ease-in-out uppercase "
        >
          Crear nuevo producto
        </button>
        <button
          onClick={openModalCrearCategoria}
          className="bg-sky-100 text-sky-700 shadow-md font-bold py-3 text-sm px-3 rounded-2xl cursor-pointer   transition-all ease-in-out uppercase "
        >
          Crear nuevo categorias
        </button>
        <button
          onClick={openModalVerColores}
          className="bg-sky-100 text-sky-700 shadow-md font-bold py-3 text-sm px-3 rounded-2xl cursor-pointer   transition-all ease-in-out uppercase "
        >
          Crear nuevo color
        </button>
        <button
          onClick={openModalVerCategoria}
          className="bg-slate-100 text-slate-700 shadow-md font-bold py-3 text-sm px-3 rounded-2xl cursor-pointer   transition-all ease-in-out uppercase "
        >
          Ver categorias creadas
        </button>
        <button
          onClick={openModalEditarColores}
          className="bg-slate-100 text-slate-700 shadow-md font-bold py-3 text-sm px-3 rounded-2xl cursor-pointe  transition-all ease-in-out uppercase "
        >
          Ver colores creados
        </button>
      </div>
    </div>
  );
};
