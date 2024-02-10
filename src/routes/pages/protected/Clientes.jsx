import { SearchClientes } from "../../../components/ui/SearchClientes";
import { IntroTitleClientes } from "../../../components/ui/IntroTitleClientes";
import { IntroClientesStock } from "../../../components/ui/IntroClienteStock";
import { TableClients } from "../../../components/ui/TableClients";
import { useClientesContext } from "../../../context/ClientesProvider";
import { ModalCrearCliente } from "../../../components/ui/ModalCrearCliente";
import { ModalEditarCliente } from "../../../components/ui/ModalEditarCliente";
import { CategoriasClientes } from "../../../components/ui/CategoriasClientes";
import { ToastContainer } from "react-toastify";

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

  return (
    <main className="h-full w-full py-14 px-14 ">
      <section className="max-md:w-full mx-auto py-[20px] px-[20px] h-full border-[1px] border-gray-300 rounded shadow-black/20 shadow-md flex flex-col gap-10 ">
        <IntroTitleClientes />

        <IntroClientesStock />

        <SearchClientes search={search} searcher={searcher} />

        <CategoriasClientes openModal={openModal} />

        <TableClients
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
        <ToastContainer />
      </section>
    </main>
  );
};
