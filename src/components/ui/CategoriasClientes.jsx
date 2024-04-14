export const CategoriasClientes = ({ openModal }) => {
  return (
    <div>
      <div>
        <button
          onClick={openModal}
          className="bg-sky-100 text-sky-700 uppercase text-sm font-bold py-3 px-3 rounded-2xl cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out"
        >
          Crear nuevo cliente
        </button>
      </div>
    </div>
  );
};
