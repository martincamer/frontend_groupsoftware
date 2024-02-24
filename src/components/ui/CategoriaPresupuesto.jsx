import { usePresupuestoContext } from "../../context/PresupuestoProvider";

export const CategoriaPresupuesto = () => {
  const { openModal } = usePresupuestoContext();
  return (
    <div>
      <div>
        <button
          onClick={openModal}
          className="uppercase text-sm text-white bg-sky-500 font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out"
        >
          Generar presupuesto
        </button>
      </div>
    </div>
  );
};
