import { useEffect, useState } from "react";
import { useAluminioContext } from "../../context/AluminioProvider";
import { obtenerCategorias } from "../../api/categorias.api";

export const SelectProductCategory = () => {
  const { handleCategoryChange, selectedCategory } = useAluminioContext();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function loadData() {
      const resultado = await obtenerCategorias();

      setCategorias(resultado.data);
    }

    loadData();
  }, []);

  return (
    <select
      className="bg-white border-[1px] border-gray-300 rounded-xl text-sm py-3.5 font-bold px-3 w-[480px] placeholder:text-gray-500/90 outline-none uppercase"
      value={selectedCategory}
      onChange={(e) => handleCategoryChange(e.target.value)}
    >
      <option>TODAS LAS CATEGORIAS</option>
      {[...new Set(categorias?.map((dato) => dato.categoria))].map(
        (category) => (
          <option className="uppercase" key={category} value={category}>
            {category}
          </option>
        )
      )}
    </select>
  );
};
