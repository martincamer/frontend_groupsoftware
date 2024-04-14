import { Link } from "react-router-dom";
import { useFacturaContext } from "../../context/FacturaProvider";

export const CategoriaFacturacion = () => {
  const { openModal } = useFacturaContext();
  return (
    <div className="flex gap-4">
      <div>
        <button
          onClick={openModal}
          className="bg-sky-100 text-sky-700 uppercase text-sm font-bold py-3 px-5 rounded-xl cursor-pointer hover:shadow-md transition-all ease-in-out"
        >
          Generar venta nueva
        </button>
      </div>
      <div>
        <Link
          to={"/filtrar-ventas-mes"}
          className="flex gap-2 items-center bg-white text-slate-700 uppercase border-[1px] border-slate-300 text-sm font-bold py-3 px-5 rounded-xl cursor-pointer hover:shadow-md transition-all ease-in-out"
        >
          Filtrar por ventas de otros meses/descagar/etc
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
