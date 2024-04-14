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
import { useState } from "react";
import { ModalEliminarVentas } from "../../../components/eliminar/ModalEliminarVentas";
// import { SearchSelect } from "../../../components/gastos/SearchSelect";
// import { SearchSelectAnio } from "../../../components/gastos/SearchSelectAnio";

export const VentasRealizadas = () => {
  const { spinner } = useAuth();
  const { search, searcher } = useFacturaContext();

  let [isOpenModal, setIsOpen] = useState(false);
  const [obtenerIdEliminar, setObtenerIdEliminar] = useState("");

  const openEliminarProducto = () => {
    setIsOpen(true);
  };

  const closeEliminarProducto = () => {
    setIsOpen(false);
  };

  const handleIdEliminar = (id) => {
    setObtenerIdEliminar(id);
  };

  return spinner ? (
    <Spinner />
  ) : (
    <main className="h-full w-full py-10 px-5 ">
      <ToastContainer />
      <section className="flex flex-col gap-10">
        <IntroTitleFactura />

        <IntroFacturacion />

        <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-5 flex gap-12 items-center">
          <Search
            variable={"Buscar por el cliente..."}
            search={search}
            searcher={searcher}
          />
        </div>
        <CategoriaFacturacion />

        <TableFacturacion
          openEliminarProducto={openEliminarProducto}
          handleIdEliminar={handleIdEliminar}
        />

        <ModalCrearFacturacionNueva />

        <ModalEliminarVentas
          obtenerIdEliminar={obtenerIdEliminar}
          closeEliminarProducto={closeEliminarProducto}
          isOpenModal={isOpenModal}
        />
      </section>
    </main>
  );
};
