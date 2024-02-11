import { IntroProductosStock } from "../../../components/ui/IntroProductosStock";
import { IntroTitleProductos } from "../../../components/ui/IntroTitleProductos";
import { TableProducts } from "../../../components/ui/TableProducts";
import { CategoriasProductos } from "../../../components/ui/CategoriasProductos";
import { Search } from "../../../components/ui/Search";
import { ModalCrearPerfil } from "../../../components/ui/ModalCrearPerfil";
import { ModalCrearEditar } from "../../../components/ui/ModalCrearEditar";
import { useAluminioContext } from "../../../context/AluminioProvider";
import { ToastContainer } from "react-toastify";
import { ModalCrearNuevaCategoria } from "../../../components/ui/ModalCrearNuevaCategoria";
import { ModalVerCategorias } from "../../../components/ui/ModalVerCategorias";
import { ModalCrearNuevoColor } from "../../../components/ui/ModalCrearNuevoColor";
import { ModalVerColores } from "../../../components/ui/ModalVerColores";
import { useAuth } from "../../../context/AuthProvider";
import { Spinner } from "../../../components/Spinner";
import { SelectProductCategory } from "../../../components/ui/SelectProductCategory";
import { ModalEliminarProductoOriginal } from "../../../components/eliminar/ModalEliminarProductoOriginal";
import { useState } from "react";

export const Productos = () => {
  const {
    handlePerfilSeleccionado,
    closeModal,
    openModal,
    closeModalEditar,
    openModalEditar,
    isOpen,
    isOpenEditar,
    search,
    searcher,
    results,
    isOpenCrearCategoria,
    closeModalCrearCategoria,
    openModalCrearCategoria,
    isOpenVerCategorias,
    closeModalVerCategoria,
    openModalVerCategoria,
  } = useAluminioContext();

  const { spinner } = useAuth();

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
    <main className="h-full w-full py-14 px-14">
      <section className="max-md:w-full mx-auto py-[20px] px-[20px] h-full border-[1px] border-gray-300 rounded shadow-black/20 shadow-md flex flex-col gap-10">
        <IntroTitleProductos />

        <IntroProductosStock results={results} />

        <div className="flex gap-2 items-center">
          <Search
            variable={"Buscar por el codigo o el detalle.."}
            search={search}
            searcher={searcher}
          />
          <SelectProductCategory />
        </div>

        <CategoriasProductos
          openModalVerCategoria={openModalVerCategoria}
          openModalCrearCategoria={openModalCrearCategoria}
          openModal={openModal}
        />

        <TableProducts
          handleIdEliminar={handleIdEliminar}
          openEliminarProducto={openEliminarProducto}
          handlePerfilSeleccionado={handlePerfilSeleccionado}
          openModalEditar={openModalEditar}
          results={results}
        />

        <ModalCrearPerfil
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
        />

        <ModalCrearNuevaCategoria
          isOpenCrearCategoria={isOpenCrearCategoria}
          closeModalCrearCategoria={closeModalCrearCategoria}
        />

        <ModalCrearNuevoColor />

        <ModalVerCategorias
          isOpenVerCategorias={isOpenVerCategorias}
          closeModalVerCategoria={closeModalVerCategoria}
        />

        <ModalVerColores />

        <ModalCrearEditar
          openModalEditar={openModalEditar}
          closeModalEditar={closeModalEditar}
          isOpenEditar={isOpenEditar}
        />

        <ModalEliminarProductoOriginal
          obtenerIdEliminar={obtenerIdEliminar}
          closeEliminarProducto={closeEliminarProducto}
          isOpenModal={isOpenModal}
        />

        <ToastContainer />
      </section>
    </main>
  );
};
