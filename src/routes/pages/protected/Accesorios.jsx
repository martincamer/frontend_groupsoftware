import { useEffect, useState } from "react";
import { FaList, FaSearch, FaWindowClose } from "react-icons/fa";
import { useForm } from "react-hook-form";
import client from "../../../api/axios";
import {
  showSuccessToast,
  showSuccessToastError,
} from "../../../helpers/toast";
import { useObtenerId } from "../../../helpers/obtenerId";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { formatearDinero } from "../../../helpers/formatearDinero";

export const Accesorios = () => {
  const { accesorios } = useAccesoriosContext();

  const [searchTermCliente, setSearchTermCliente] = useState("");

  const handleSearchClienteChange = (e) => {
    setSearchTermCliente(e.target.value);
  };

  let filteredData = accesorios.filter((perfil) => {
    const matchesSearchTermDescripcion =
      perfil.descripcion
        .toLowerCase()
        .includes(searchTermCliente.toLowerCase()) ||
      perfil.codigo.toLowerCase().includes(searchTermCliente.toLowerCase());

    // Retornar solo aquellos accesorios cuyo detalle (descripcion) coincida con el término de búsqueda
    return matchesSearchTermDescripcion;
  });

  filteredData.sort((a, b) => b.stock - a.stock);

  const { handleObtenerId, idObtenida } = useObtenerId();
  return (
    <main className="h-full w-full min-h-screen max-h-full">
      <section className="max-md:w-full mx-auto h-full flex flex-col gap-10">
        <div className="bg-gray-100 py-10 px-10 flex justify-between">
          <p className="text-gray-900 font-bold text-xl">
            Sector de accesorios.
          </p>
          <div className="">
            <button
              onClick={() =>
                document.getElementById("my_modal_crear_accesorio").showModal()
              }
              type="button"
              className="font-semibold text-sm bg-[#FD454D] text-white py-1.5 px-5 rounded-md"
            >
              Cargar nuevo accesorio al sistema
            </button>
          </div>
        </div>
        <div className="">
          <div className="flex mx-10 gap-2">
            <div className="border flex gap-2 items-center border-gray-300 py-2 px-3 text-sm rounded-md w-1/4">
              <FaSearch className="text-gray-400" />
              <input
                value={searchTermCliente}
                onChange={handleSearchClienteChange}
                placeholder="Buscar por el codigo o descripción del producto.."
                className="outline-none font-medium w-full"
              />{" "}
            </div>
            {/* <div className="border border-gray-300 py-1 px-3 text-sm rounded-md">
              <select
                value={selectedCategoria}
                onChange={handleCategoriaChange}
                className="outline-none cursor-pointer uppercase text-xs font-semibold"
              >
                <option value={""} className="uppercase font-bold text-xs">
                  Todas las categorias
                </option>{" "}
                {categorias.map((c) => (
                  <option
                    className="uppercase font-semibold text-xs"
                    value={c.categoria}
                  >
                    {c.categoria}
                  </option>
                ))}
              </select>{" "}
            </div>
            <div className="border border-gray-300 py-1 px-3 text-sm rounded-md">
              <select
                value={selectedColor}
                onChange={handleColorChange}
                className="outline-none cursor-pointer uppercase text-xs font-semibold"
              >
                <option value={""} className="uppercase font-bold text-xs">
                  Todos los colores
                </option>
                {colores.map((c) => (
                  <option
                    className="uppercase font-semibold text-xs"
                    value={c.color}
                  >
                    {c.color}
                  </option>
                ))}
              </select>{" "}
            </div> */}
          </div>
          {/* <div className="mx-10 gap-2 flex">
            <button
              onClick={() =>
                document.getElementById("my_modal_colores").showModal()
              }
              type="button"
              className="bg-blue-500 px-4 py-1 rounded-md text-white text-sm font-semibold"
            >
              Crear colores
            </button>
            <button
              onClick={() =>
                document.getElementById("my_modal_categorias").showModal()
              }
              type="button"
              className="bg-blue-500 px-4 py-1 rounded-md text-white text-sm font-semibold"
            >
              Crear categorias
            </button>
          </div> */}
        </div>
        <div className="mx-10 pb-10">
          <table className="table">
            <thead>
              <tr>
                <th className="font-bold text-gray-900 text-xs">Codigo</th>
                <th className="font-bold text-gray-900 text-xs">Detalle</th>
                <th className="font-bold text-gray-900 text-xs">Stock</th>
                <th className="font-bold text-gray-900 text-xs">Precio und</th>
                <th className="font-bold text-gray-900 text-xs">Estado</th>
                <th className="font-bold text-gray-900 text-xs"></th>
              </tr>
            </thead>
            <tbody className="uppercase text-xs font-medium">
              {filteredData.map((p) => (
                <tr key={p.id}>
                  <th>{p.codigo}</th>
                  <td>{p.descripcion}</td>
                  <td>
                    <div className="flex">
                      <p
                        className={`py-1 px-3 rounded-md ${
                          p.stock <= 0
                            ? "bg-orange-500 text-white"
                            : "bg-green-500 text-white"
                        } font-semibold`}
                      >
                        {p.stock}
                      </p>
                    </div>
                  </td>
                  <td className="font-bold text-blue-500">
                    {formatearDinero(Number(p.precio))}
                  </td>
                  <td>
                    <div className="flex">
                      <p
                        className={`py-1 px-3 rounded-md ${
                          p.stock <= 0
                            ? "bg-orange-500 text-white"
                            : "bg-green-500 text-white"
                        } font-semibold`}
                      >
                        {p.stock <= 0 ? "Sin stock" : "Mucho stock"}
                      </p>
                    </div>
                  </td>{" "}
                  <td>
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="hover:bg-[#FD454D] py-2 px-2 rounded-full hover:text-white text-lg"
                      >
                        <FaList />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-white rounded-md shadow-2xl z-[1] w-52 p-1"
                      >
                        <li className="hover:bg-gray-700 hover:text-white text-xs rounded-md font-semibold">
                          <button
                            onClick={() => {
                              {
                                handleObtenerId(p.id),
                                  document
                                    .getElementById(
                                      "my_modal_actualizar_accesorio"
                                    )
                                    .showModal();
                              }
                            }}
                            type="button"
                          >
                            Editar
                          </button>
                        </li>
                        <li className="hover:bg-gray-700 hover:text-white text-xs rounded-md font-semibold">
                          <button
                            onClick={() => {
                              {
                                handleObtenerId(p.id),
                                  document
                                    .getElementById("my_modal_eliminar")
                                    .showModal();
                              }
                            }}
                            type="button"
                          >
                            Eliminar
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ModalCrearAccesorio />

      <ModalActualizarPerfil idObtenida={idObtenida} />
      <ModalEliminar idObtenida={idObtenida} />
    </main>
  );
};

// VENTANAS MODAL.
const ModalCrearAccesorio = () => {
  const { setAccesorios } = useAccesoriosContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const perfilData = {
        ...formData,
      };

      const res = await client.post("/accesorios", perfilData);

      setAccesorios(res.data);

      document.getElementById("my_modal_crear_accesorio").close();

      showSuccessToast("Accesorio creado correctamente");

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const [isEditable, setIsEditable] = useState(false);

  const handleInputClick = () => {
    setIsEditable(true);
  };

  const precio = watch("precio");

  return (
    <dialog id="my_modal_crear_accesorio" className="modal">
      <div className="modal-box rounded-md max-w-xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">
          Crear nuevo accesorio para facturar
        </h3>
        <p className="py-1 text-sm font-medium">
          En esta sesión podras crear un nuevo accesorio.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 border-t pt-4 pb-4 space-y-2"
        >
          {errors.codigo && (
            <p className="text-red-700 font-semibold text-sm">
              El codigo es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Codigo</label>
            <input
              {...register("codigo", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="text"
              placeholder="codigo"
            />
          </div>
          {errors.descripcion && (
            <p className="text-red-700 font-semibold text-sm">
              La descripción es requerida
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Descripcion</label>
            <input
              {...register("descripcion", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="text"
              placeholder="detalle del accesorio"
            />
          </div>
          {errors.stock && (
            <p className="text-red-700 font-semibold text-sm">
              El stock es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Stock total</label>
            <input
              {...register("stock", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="number"
              placeholder="cantidad de productos"
            />
          </div>

          <div onClick={handleInputClick}>
            {isEditable ? (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Precio und</label>
                <input
                  {...register("precio", { required: true })}
                  onBlur={() => setIsEditable(false)}
                  className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                  placeholder="Precio kg"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">Precio und</p>
                <p className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold">
                  {formatearDinero(Number(precio || 0))}
                </p>
              </div>
            )}
          </div>

          <div className="flex pt-3">
            <input
              className="bg-red-500 text-white px-5 rounded-md py-1 text-sm font-bold cursor-pointer"
              type="submit"
              value={"Cargar el accesorio al sistema"}
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

const ModalActualizarPerfil = ({ idObtenida }) => {
  const { setAccesorios } = useAccesoriosContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    const obtenerDatos = async () => {
      const res = await client.get(`/accesorios/${idObtenida}`);

      setValue("codigo", res.data.codigo);
      setValue("descripcion", res.data.descripcion);
      setValue("stock", res.data.stock);
      setValue("precio", res.data.precio);
    };

    obtenerDatos();
  }, [idObtenida]);

  const onSubmit = async (formData) => {
    try {
      const perfilData = {
        ...formData,
      };

      const res = await client.put(`/accesorios/${idObtenida}`, perfilData);

      setAccesorios(res.data);

      document.getElementById("my_modal_actualizar_accesorio").close();

      showSuccessToast("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const [isEditable, setIsEditable] = useState(false);

  const handleInputClick = () => {
    setIsEditable(true);
  };

  const precio = watch("precio");

  return (
    <dialog id="my_modal_actualizar_accesorio" className="modal">
      <div className="modal-box rounded-md max-w-xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Actualizar el perfil de aluminio</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 border-t pt-4 pb-4 space-y-2"
        >
          {errors.codigo && (
            <p className="text-red-700 font-semibold text-sm">
              El codigo es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Codigo</label>
            <input
              {...register("codigo", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="text"
              placeholder="codigo"
            />
          </div>
          {errors.descripcion && (
            <p className="text-red-700 font-semibold text-sm">
              La descripción es requerida
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Descripcion</label>
            <input
              {...register("descripcion", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="text"
              placeholder="detalle del accesorio"
            />
          </div>
          {errors.stock && (
            <p className="text-red-700 font-semibold text-sm">
              El stock es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Stock total</label>
            <input
              {...register("stock", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="number"
              placeholder="cantidad de productos"
            />
          </div>
          <div onClick={handleInputClick}>
            {isEditable ? (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Precio und</label>
                <input
                  {...register("precio", { required: true })}
                  onBlur={() => setIsEditable(false)}
                  className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                  placeholder="Precio kg"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">Precio und</p>
                <p className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold">
                  {formatearDinero(Number(precio || 0))}
                </p>
              </div>
            )}
          </div>

          <div className="flex pt-3">
            <input
              className="bg-red-500 text-white px-5 rounded-md py-1 text-sm font-bold cursor-pointer"
              type="submit"
              value={"Actualizar el acceosorio"}
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

const ModalEliminar = ({ idObtenida }) => {
  const { handleSubmit } = useForm();

  const { setAccesorios } = useAccesoriosContext();

  const onSubmit = async () => {
    try {
      const res = await client.delete(`/accesorios/${idObtenida}`);

      setAccesorios(res.data);

      showSuccessToastError("Eliminado correctamente");

      document.getElementById("my_modal_eliminar").close();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <dialog id="my_modal_eliminar" className="modal">
      <div className="modal-box rounded-md max-w-md">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <img
              className="w-44 mx-auto"
              src="https://app.holded.com/assets/img/document/doc_delete.png"
            />
          </div>
          <div className="font-semibold text-sm text-gray-400 text-center">
            REFERENCIA {idObtenida}
          </div>
          <div className="font-semibold text-[#FD454D] text-lg text-center">
            Eliminar el accesorio cargado..
          </div>
          <div className="text-sm text-gray-400 text-center mt-1">
            El accesorio no podra ser recuperado nunca....
          </div>
          <div className="mt-4 text-center w-full px-16">
            <button
              type="submit"
              className="bg-red-500 py-1 px-4 text-center font-bold text-white text-sm rounded-md w-full"
            >
              Confirmar
            </button>{" "}
            <button
              type="button"
              onClick={() =>
                document.getElementById("my_modal_eliminar").close()
              }
              className="bg-orange-100 py-1 px-4 text-center font-bold text-orange-600 mt-2 text-sm rounded-md w-full"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
