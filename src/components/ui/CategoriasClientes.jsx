export const CategoriasClientes = ({ openModal }) => {
  return (
    <div>
      <div>
        <button
          onClick={openModal}
          className="bg-green-500 text-white uppercase text-sm font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out"
        >
          Crear nuevo cliente
        </button>
      </div>
    </div>
  );
};
