import { Search } from "../../../components/ui/Search";
import { IntroTitlePresupuesto } from "../../../components/ui/IntroTitlePresupuesto";
import { IntroPresupuestos } from "../../../components/ui/IntroPresupuestos";
import { TablePresupuestos } from "../../../components/ui/TablePresupuestos";
import { CategoriaPresupuesto } from "../../../components/ui/CategoriaPresupuesto";
import { ModalCrearPresupuestoNuevo } from "../../../components/ui/ModalCrearPresupuestoNuevo";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../../context/AuthProvider";
import { Spinner } from "../../../components/Spinner";
import { SearchSelect } from "../../../components/gastos/SearchSelect";
import { SearchSelectAnio } from "../../../components/gastos/SearchSelectAnio";
import { usePresupuestoContext } from "../../../context/PresupuestoProvider";

export const Presupuestos = () => {
  const { spinner } = useAuth();
  const {
    search,
    searcher,
    categoriaSeleccionada,
    handleAnioChange,
    anioSeleccionado,
    handleCategoriaChange,
  } = usePresupuestoContext();

  return spinner ? (
    <Spinner />
  ) : (
    <main className="h-screen w-full py-14 px-14 ">
      <section className="max-md:w-full mx-auto py-[20px] px-[20px] h-full border-[1px] border-gray-300 rounded shadow-black/20 shadow-md flex flex-col gap-10 overflow-y-scroll">
        <IntroTitlePresupuesto />

        <IntroPresupuestos />

        <CategoriaPresupuesto />

        <div className="bord  er-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-12 items-center">
          <Search
            variable={"Buscar por el cliente..."}
            search={search}
            searcher={searcher}
          />
          <SearchSelect
            categoriaSeleccionada={categoriaSeleccionada}
            handleCategoriaChange={handleCategoriaChange}
          />
          <SearchSelectAnio
            anioSeleccionado={anioSeleccionado}
            handleAnioChange={handleAnioChange}
          />
        </div>

        <TablePresupuestos />

        <ModalCrearPresupuestoNuevo />

        <ToastContainer />
      </section>
    </main>
  );
};
