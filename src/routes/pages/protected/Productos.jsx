import { useEffect, useState } from "react";
import { FaList, FaSearch, FaWindowClose } from "react-icons/fa";
import { useAluminioContext } from "../../../context/AluminioProvider";
import { useForm } from "react-hook-form";
import client from "../../../api/axios";
import {
  showSuccessToast,
  showSuccessToastError,
} from "../../../helpers/toast";
import { useObtenerId } from "../../../helpers/obtenerId";

export const Productos = () => {
  const { perfiles, colores, categorias } = useAluminioContext();

  const [searchTermCliente, setSearchTermCliente] = useState("");
  const [selectedColor, setSelectedColor] = useState(""); // Estado para el color seleccionado
  const [selectedCategoria, setSelectedCategoria] = useState(""); // Estado para la categoría seleccionada

  const handleSearchClienteChange = (e) => {
    setSearchTermCliente(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setSelectedCategoria(e.target.value);
  };

  let filteredData = perfiles.filter((perfil) => {
    const matchesSearchTermNombre = perfil.nombre
      .toLowerCase()
      .includes(searchTermCliente.toLowerCase());

    const matchesSearchTermDescripcion = perfil.descripcion
      .toLowerCase()
      .includes(searchTermCliente.toLowerCase());

    const matchesColor = selectedColor === "" || perfil.color === selectedColor; // Filtrar por color
    const matchesCategoria =
      selectedCategoria === "" || perfil.categoria === selectedCategoria; // Filtrar por categoría

    // Verificar si se seleccionó "Todos los colores" o "Todas las categorías"
    const showAllColors = selectedColor === "";
    const showAllCategories = selectedCategoria === "";

    // Mostrar todos los perfiles si se selecciona "Todos los colores" o "Todas las categorías"
    if (showAllColors && showAllCategories) {
      return matchesSearchTermNombre || matchesSearchTermDescripcion;
    }

    // Aplicar el filtro normalmente si se selecciona un color y/o categoría específicos
    return (
      (matchesSearchTermNombre || matchesSearchTermDescripcion) &&
      matchesColor &&
      matchesCategoria
    );
  });

  filteredData.sort((a, b) => b.stock - a.stock);

  const { handleObtenerId, idObtenida } = useObtenerId();
  return (
    <main className="h-full w-full min-h-screen max-h-full">
      <section className="max-md:w-full mx-auto h-full flex flex-col gap-10">
        <div className="bg-gray-100 py-10 px-10 flex justify-between">
          <p className="text-gray-900 font-bold text-xl">
            Crear nuevos perfiles de aluminio para facturar.
          </p>
          <div className="">
            <button
              onClick={() =>
                document.getElementById("my_modal_crear_perfil").showModal()
              }
              type="button"
              className="font-semibold text-sm bg-[#FD454D] text-white py-1.5 px-5 rounded-md"
            >
              Crear nuevo producto
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex mx-10 gap-2">
            <div className="border flex gap-2 items-center border-gray-300 py-1 px-3 text-sm rounded-md">
              <FaSearch className="text-gray-400" />
              <input
                value={searchTermCliente}
                onChange={handleSearchClienteChange}
                placeholder="Buscar.."
                className="outline-none font-medium"
              />{" "}
            </div>
            <div className="border border-gray-300 py-1 px-3 text-sm rounded-md">
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
            </div>
          </div>
          <div className="mx-10 gap-2 flex">
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
          </div>
        </div>
        <div className="mx-10 pb-10">
          <table className="table">
            <thead>
              <tr>
                <th className="font-bold text-gray-900 text-xs">Codigo</th>
                <th className="font-bold text-gray-900 text-xs">Detalle</th>
                <th className="font-bold text-gray-900 text-xs">Kg Barra</th>
                <th className="font-bold text-gray-900 text-xs">Categoria</th>
                <th className="font-bold text-gray-900 text-xs">Color</th>
                <th className="font-bold text-gray-900 text-xs">Stock</th>
                <th className="font-bold text-gray-900 text-xs">Estado</th>
                <th className="font-bold text-gray-900 text-xs"></th>
              </tr>
            </thead>
            <tbody className="uppercase text-xs font-medium">
              {filteredData.map((p) => (
                <tr key={p.id}>
                  <th>{p.nombre}</th>
                  <td>{p.descripcion}</td>
                  <td>{p.peso_neto_barra_6mts}</td>
                  <td>{p.categoria}</td>
                  <td>{p.color}</td>
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
                                      "my_modal_actualizar_perfil"
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

      <ModalCrearPerfil />
      <ModalCrearCategorias />
      <ModalCrearColores />
      <ModalActualizarPerfil idObtenida={idObtenida} />
      <ModalEliminar idObtenida={idObtenida} />
    </main>
  );
};

// VENTANAS MODAL.
const ModalCrearPerfil = () => {
  const { perfiles, setPerfiles, categorias, colores } = useAluminioContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const perfilData = {
        ...formData,
      };

      const res = await client.post("/perfiles", perfilData);

      setPerfiles(res.data);

      document.getElementById("my_modal_crear_perfil").close();

      showSuccessToast("Perfil creador correctamente");

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <dialog id="my_modal_crear_perfil" className="modal">
      <div className="modal-box rounded-md max-w-xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Crear nuevo perfil de aluminio</h3>
        <p className="py-1 text-sm font-medium">
          En esta sesión podras crear un nuevo perfil de alumino para facturar.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 border-t pt-4 pb-4 space-y-2"
        >
          {errors.nombre && (
            <p className="text-red-700 font-semibold text-sm">
              El codigo es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Codigo</label>
            <input
              {...register("nombre", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="text"
              placeholder="nombre del codigo"
            />
          </div>
          {errors.descripcion && (
            <p className="text-red-700 font-semibold text-sm">
              El detalle es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Detalle</label>
            <input
              {...register("descripcion", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="text"
              placeholder="detalle ej perfil pesado ventana"
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
          {errors.peso_neto_barra_6mts && (
            <p className="text-red-700 font-semibold text-sm">
              El peso es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Kg barra estimado</label>
            <input
              {...register("peso_neto_barra_6mts", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="text"
              placeholder="kg estimado de la barra"
            />
          </div>{" "}
          {errors.color && (
            <p className="text-red-700 font-semibold text-sm">
              El color es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Color</label>
            <select
              {...register("color", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
            >
              <option className="font-bold">Seleccionar color</option>
              {colores.map((c) => (
                <option key={c.id}>{c.color}</option>
              ))}
            </select>
          </div>
          {errors.categoria && (
            <p className="text-red-700 font-semibold text-sm">
              La categoria es requerida
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Categoria</label>
            <select
              {...register("categoria", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
            >
              <option className="font-bold">Seleccionar la categoria</option>
              {categorias.map((cat) => (
                <option className="text-black" key={cat.id}>
                  {cat.categoria}
                </option>
              ))}
            </select>
          </div>
          <div className="flex pt-3">
            <input
              className="bg-red-500 text-white px-5 rounded-md py-1 text-sm font-bold cursor-pointer"
              type="submit"
              value={"Guardar perfil nuevo"}
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

const ModalActualizarPerfil = ({ idObtenida }) => {
  const { setPerfiles, categorias, colores } = useAluminioContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    const obtenerDatos = async () => {
      const res = await client.get(`/perfiles/${idObtenida}`);

      setValue("nombre", res.data.nombre);
      setValue("descripcion", res.data.descripcion);
      setValue("stock", res.data.stock);
      setValue("peso_neto_barra_6mts", res.data.peso_neto_barra_6mts);
      setValue("color", res.data.color);
      setValue("categoria", res.data.categoria);
    };

    obtenerDatos();
  }, [idObtenida]);

  const onSubmit = async (formData) => {
    try {
      const perfilData = {
        ...formData,
      };

      const res = await client.put(`/perfiles/${idObtenida}`, perfilData);

      setPerfiles(res.data);

      document.getElementById("my_modal_actualizar_perfil").close();

      showSuccessToast("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <dialog id="my_modal_actualizar_perfil" className="modal">
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
          {errors.nombre && (
            <p className="text-red-700 font-semibold text-sm">
              El codigo es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Codigo</label>
            <input
              {...register("nombre", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="text"
              placeholder="nombre del codigo"
            />
          </div>
          {errors.descripcion && (
            <p className="text-red-700 font-semibold text-sm">
              El detalle es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Detalle</label>
            <input
              {...register("descripcion", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="text"
              placeholder="detalle ej perfil pesado ventana"
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
          {errors.peso_neto_barra_6mts && (
            <p className="text-red-700 font-semibold text-sm">
              El peso es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Kg barra estimado</label>
            <input
              {...register("peso_neto_barra_6mts", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="text"
              placeholder="kg estimado de la barra"
            />
          </div>{" "}
          {errors.color && (
            <p className="text-red-700 font-semibold text-sm">
              El color es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Color</label>
            <select
              {...register("color", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
            >
              <option className="font-bold">Seleccionar color</option>
              {colores.map((c) => (
                <option key={c.id}>{c.color}</option>
              ))}
            </select>
          </div>
          {errors.categoria && (
            <p className="text-red-700 font-semibold text-sm">
              La categoria es requerida
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Categoria</label>
            <select
              {...register("categoria", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
            >
              <option className="font-bold">Seleccionar la categoria</option>
              {categorias.map((cat) => (
                <option className="text-black" key={cat.id}>
                  {cat.categoria}
                </option>
              ))}
            </select>
          </div>
          <div className="flex pt-3">
            <input
              className="bg-red-500 text-white px-5 rounded-md py-1 text-sm font-bold cursor-pointer"
              type="submit"
              value={"Actualizar el perfil"}
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

const ModalCrearCategorias = () => {
  const { setCategorias, categorias } = useAluminioContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const categoriasData = {
        ...formData,
      };

      const res = await client.post("/categorias", categoriasData);

      setCategorias(res.data);

      // document.getElementById("my_modal_crear_categorias").close();

      showSuccessToast("Categoria creada correctamente");

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const deleteCategoria = async (id) => {
    try {
      const res = await client.delete(`/categorias/${id}`);

      setCategorias(res.data);

      showSuccessToastError("Categoria eliminada correctamente");

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <dialog id="my_modal_categorias" className="modal">
      <div className="modal-box rounded-md max-w-4xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Crear nuevas categorias</h3>
        <p className="py-1 text-sm font-medium">
          En esta sesión podras crear un nuevo categorias de aluminio
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 border-t pt-4 pb-4 space-y-2"
        >
          {errors.categoria && (
            <p className="text-red-700 font-semibold text-sm">
              El codigo es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Nombre de la categoria</label>
            <input
              {...register("categoria", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="text"
              placeholder="nombre de la categoria.."
            />
          </div>

          <div className="flex pt-3">
            <input
              className="bg-red-500 text-white px-5 rounded-md py-1 text-sm font-bold cursor-pointer"
              type="submit"
              value={"Guardar categoria"}
            />
          </div>
        </form>
        <div className="border-t pt-2 mt-2 w-full">
          <p className="font-bold text-lg">Categorias creadas.</p>

          <div className="grid grid-cols-4 gap-2 w-full mt-2">
            {categorias.map((c) => (
              <div className="text-sm font-bold uppercase border border-gray-300 py-1 px-2 rounded-md flex justify-between">
                <p>{c.categoria}</p>{" "}
                <p onClick={() => deleteCategoria(c.id)}>
                  <FaWindowClose className="text-xl text-red-500 cursor-pointer" />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
};

const ModalCrearColores = () => {
  const { setColores, colores } = useAluminioContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const categoriasData = {
        ...formData,
      };

      const res = await client.post("/colores", categoriasData);

      setColores(res.data);

      // document.getElementById("my_modal_crear_categorias").close();

      showSuccessToast("Color creado correctamente");

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const deleteCategoria = async (id) => {
    try {
      const res = await client.delete(`/colores/${id}`);

      setColores(res.data);

      showSuccessToastError("Color eliminado correctamente");

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <dialog id="my_modal_colores" className="modal">
      <div className="modal-box rounded-md max-w-4xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Crear nuevos colores</h3>
        <p className="py-1 text-sm font-medium">
          En esta sesión podras crear un nuevos colores de aluminio
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 border-t pt-4 pb-4 space-y-2"
        >
          {errors.color && (
            <p className="text-red-700 font-semibold text-sm">
              El color es requerido
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Nombre del color</label>
            <input
              {...register("color", { required: true })}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              type="text"
              placeholder="nombre del color.."
            />
          </div>

          <div className="flex pt-3">
            <input
              className="bg-red-500 text-white px-5 rounded-md py-1 text-sm font-bold cursor-pointer"
              type="submit"
              value={"Guardar color"}
            />
          </div>
        </form>
        <div className="border-t pt-2 mt-2 w-full">
          <p className="font-bold text-lg">Colores creadas.</p>

          <div className="grid grid-cols-4 gap-2 w-full mt-2">
            {colores.map((c) => (
              <div className="text-sm font-bold uppercase border border-gray-300 py-1 px-2 rounded-md flex justify-between">
                <p>{c.color}</p>{" "}
                <p onClick={() => deleteCategoria(c.id)}>
                  <FaWindowClose className="text-xl text-red-500 cursor-pointer" />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
};

const ModalEliminar = ({ idObtenida }) => {
  const { handleSubmit } = useForm();

  const { setPerfiles } = useAluminioContext();

  const onSubmit = async () => {
    try {
      const res = await client.delete(`/perfiles/${idObtenida}`);

      setPerfiles(res.data);

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
            Eliminar el perfil cargado..
          </div>
          <div className="text-sm text-gray-400 text-center mt-1">
            El perfil no podra ser recuperado nunca....
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
