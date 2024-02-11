import { SearchClientes } from "../../../components/ui/SearchClientes";
import { IntroTitleClientes } from "../../../components/ui/IntroTitleClientes";
import { IntroClientesStock } from "../../../components/ui/IntroClienteStock";
import { TableClients } from "../../../components/ui/TableClients";
import { useClientesContext } from "../../../context/ClientesProvider";
import { ModalCrearCliente } from "../../../components/ui/ModalCrearCliente";
import { ModalEditarCliente } from "../../../components/ui/ModalEditarCliente";
import { CategoriasClientes } from "../../../components/ui/CategoriasClientes";
import { ToastContainer } from "react-toastify";
import { ModalEliminarClienteOriginal } from "../../../components/eliminar/ModalEliminarClienteOriginal";
import { useState } from "react";

export const Clientes = () => {
  const {
    search,
    searcher,
    results,
    isOpen,
    isOpenEditar,
    closeModal,
    openModal,
    closeModalEditar,
    openModalEditar,
    handleEliminar,
    handleClienteSeleccionado,
  } = useClientesContext();

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

  return (
    <main className="h-full w-full py-14 px-14 ">
      <section className="max-md:w-full mx-auto py-[20px] px-[20px] h-full border-[1px] border-gray-300 rounded shadow-black/20 shadow-md flex flex-col gap-10 ">
        <IntroTitleClientes />

        <IntroClientesStock />

        <SearchClientes search={search} searcher={searcher} />

        <CategoriasClientes openModal={openModal} />

        <TableClients
          openEliminarProducto={openEliminarProducto}
          handleIdEliminar={handleIdEliminar}
          handleClienteSeleccionado={handleClienteSeleccionado}
          openModalEditar={openModalEditar}
          results={results}
          handleEliminar={handleEliminar}
        />

        <ModalCrearCliente
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
        />

        <ModalEditarCliente
          openModalEditar={openModalEditar}
          closeModalEditar={closeModalEditar}
          isOpenEditar={isOpenEditar}
        />

        <ModalEliminarClienteOriginal
          obtenerIdEliminar={obtenerIdEliminar}
          closeEliminarProducto={closeEliminarProducto}
          isOpenModal={isOpenModal}
        />

        <ToastContainer />
      </section>
    </main>
  );
};
