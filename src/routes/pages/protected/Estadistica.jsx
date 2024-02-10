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
    <section className="h-full w-full py-14 px-14">
      <div className="max-md:w-full mx-auto py-[20px] px-[20px] h-full border-[1px] border-gray-300 rounded shadow-black/20 shadow-md flex flex-col gap-10">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 uppercase">
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
