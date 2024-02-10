export const SearchSelectAnio = ({ anioSeleccionado, handleAnioChange }) => {
  return (
    <div>
      <select
        value={anioSeleccionado}
        onChange={handleAnioChange}
        className="bg-white max-md:text-sm border-[1px] border-gray-300 text-gray-700 font-bold rounded-md shadow-black/20 shadow-md py-3 px-3 w-[190px] placeholder:text-gray-500/90 outline-none"
        placeholder="BUSCAR TIPO DE GASTO..."
      >
        <option>SELECCIONAR AÑO</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </div>
  );
};
