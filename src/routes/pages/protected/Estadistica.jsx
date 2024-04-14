import { ToastContainer } from "react-toastify";
import { Spinner } from "../../../components/Spinner";
import { IntroEstadisticas } from "../../../components/ui/IntroEstadisticas";
import { Search } from "../../../components/ui/Search";
import { TableEstadistica } from "../../../components/ui/TableEstadistica";
import { useAuth } from "../../../context/AuthProvider";
import { useClientesContext } from "../../../context/ClientesProvider";

export const Estadistica = () => {
  const { spinner } = useAuth();
  const { search, searcher } = useClientesContext();
  return spinner ? (
    <Spinner />
  ) : (
    <section className="h-full w-full py-10 px-5">
      <ToastContainer />
      <div className="max-md:w-full mx-auto flex flex-col gap-10">
        <div>
          <h3 className="text-xl font-semibold text-sky-500 uppercase">
            Estado de pago clientes
          </h3>
        </div>
        <IntroEstadisticas />
        <Search
          variable={"Buscar por el cliente..."}
          search={search}
          searcher={searcher}
        />
        <TableEstadistica />
      </div>
    </section>
  );
};
