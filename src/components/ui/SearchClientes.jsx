export const SearchClientes = ({ search, searcher }) => {
  return (
    <div>
      <input
        value={search}
        onChange={searcher}
        className="bg-white border-[1px] border-gray-300 rounded-md shadow-black/20 shadow-md py-2 px-3 w-1/3 placeholder:text-gray-500/90 outline-none"
        placeholder="Buscar cliente por el nombre o apellido..."
      />
    </div>
  );
};
