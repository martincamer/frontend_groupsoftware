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
import { ModalEliminarPresupuesto } from "../../../components/eliminar/ModalEliminarPresupuesto";
import { useState } from "react";

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
    <main className="h-screen w-full py-8 px-5">
      <section className="flex flex-col gap-10 overflow-y-scroll">
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

        <TablePresupuestos
          openEliminarProducto={openEliminarProducto}
          handleIdEliminar={handleIdEliminar}
        />

        <ModalCrearPresupuestoNuevo />

        <ModalEliminarPresupuesto
          obtenerIdEliminar={obtenerIdEliminar}
          closeEliminarProducto={closeEliminarProducto}
          isOpenModal={isOpenModal}
        />

        <ToastContainer />
      </section>
    </main>
  );
};
