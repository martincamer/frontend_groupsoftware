import { useFacturaContext } from "../../context/FacturaProvider";

export const CategoriaFacturacion = () => {
  const { openModal } = useFacturaContext();
  return (
    <div>
      <div>
        <button
          onClick={openModal}
          className="bg-sky-100 text-sky-700 uppercase text-sm font-bold py-3 px-5 rounded-xl cursor-pointer hover:shadow-md transition-all ease-in-out"
        >
          Generar venta nueva
        </button>
      </div>
    </div>
  );
};
