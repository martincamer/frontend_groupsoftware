export const SearchSelect = ({
  categoriaSeleccionada,
  handleCategoriaChange,
}) => {
  return (
    <div>
      <select
        value={categoriaSeleccionada}
        onChange={handleCategoriaChange}
        className="bg-white max-md:text-sm border-[1px] text-sm border-gray-300 text-gray-700 font-bold rounded-xl shadow-black/20 shadow-md py-3 px-3 w-[190px] placeholder:text-gray-500/90 outline-none"
        placeholder="BUSCAR TIPO DE GASTO..."
      >
        <option>SELECCIONAR MES</option>
        <option value="1">ENERO</option>
        <option value="2">FEBRERO</option>
        <option value="3">MARZO</option>
        <option value="4">ABRIL</option>
        <option value="5">MAYO</option>
        <option value="6">JUNIO</option>
        <option value="7">JULIO</option>
        <option value="8">AGOSTO</option>
        <option value="9">SEPTIEMBRE</option>
        <option value="10">OCTUBRE</option>
        <option value="11">NOVIEMBRE</option>
        <option value="12">DICIEMBRE</option>
      </select>
    </div>
  );
};
