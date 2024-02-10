import { Search } from "../../../components/ui/Search";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../../context/AuthProvider";
import { Spinner } from "../../../components/Spinner";
import { IntroTitleFactura } from "../../../components/generar-factura/IntroTitleFactura";
import { IntroFacturacion } from "../../../components/generar-factura/IntroFacturacion";
import { CategoriaFacturacion } from "../../../components/generar-factura/CategoriaFacturacion";
import { TableFacturacion } from "../../../components/generar-factura/TableFacturacion";
import { ModalCrearFacturacionNueva } from "../../../components/generar-factura/ModalCrearFacturacionNueva";
import { useFacturaContext } from "../../../context/FacturaProvider";
import { SearchSelect } from "../../../components/gastos/SearchSelect";
import { SearchSelectAnio } from "../../../components/gastos/SearchSelectAnio";

export const VentasRealizadas = () => {
  const { spinner } = useAuth();
  const {
    search,
    searcher,
    categoriaSeleccionada,
    handleCategoriaChange,
    anioSeleccionado,
    handleAnioChange,
  } = useFacturaContext();
  return spinner ? (
    <Spinner />
  ) : (
    <main className="h-full w-full py-14 px-14 ">
      <section className="max-md:w-full mx-auto py-[20px] px-[20px] h-full border-[1px] border-gray-300 rounded shadow-black/20 shadow-md flex flex-col gap-10">
        <IntroTitleFactura />

        <IntroFacturacion />

        <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-5 flex gap-12 items-center">
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
        <CategoriaFacturacion />

        <TableFacturacion />

        <ModalCrearFacturacionNueva />

        <ToastContainer />
      </section>
    </main>
  );
};
