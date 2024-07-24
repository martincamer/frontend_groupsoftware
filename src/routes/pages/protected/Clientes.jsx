import { useEffect, useState } from "react";
import { FaList, FaSearch, FaWindowClose } from "react-icons/fa";
import { useClientesContext } from "../../../context/ClientesProvider";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  showSuccessToast,
  showSuccessToastError,
} from "../../../helpers/toast";
import { useObtenerId } from "../../../helpers/obtenerId";
import { formatearDinero } from "../../../helpers/formatearDinero";
import client from "../../../api/axios";

export const Clientes = () => {
  const { clientes } = useClientesContext();

  const [searchTermCliente, setSearchTermCliente] = useState("");

  const handleSearchClienteChange = (e) => {
    setSearchTermCliente(e.target.value);
  };

  let filteredData = clientes.filter((cliente) => {
    const matchesSearchTermNombre =
      cliente.nombre.toLowerCase().includes(searchTermCliente.toLowerCase()) ||
      cliente.apellido.toLowerCase().includes(searchTermCliente.toLowerCase());

    return matchesSearchTermNombre;
  });

  const { handleObtenerId, idObtenida } = useObtenerId();

  filteredData.sort((a, b) => b.deuda_restante - a.deuda_restante);

  return (
    <main className="h-full w-full min-h-screen max-h-full">
      <section className="max-md:w-full mx-auto h-full flex flex-col gap-10">
        <div className="bg-gray-100 py-10 px-10 flex justify-between">
          <p className="text-gray-900 font-bold text-xl">
            Crear nuevos clientes para poder facturar.
          </p>
          <div className="">
            <button
              onClick={() =>
                document.getElementById("my_modal_crear_cliente").showModal()
              }
              type="button"
              className="font-semibold text-sm bg-[#FD454D] text-white py-1.5 px-5 rounded-md"
            >
              Crear nuevo cliente
            </button>
          </div>
        </div>
        <div className="mx-10 w-1/5">
          <div className="border flex gap-2 items-center border-gray-300 py-1 px-3 text-sm rounded-md">
            <FaSearch className="text-gray-400" />
            <input
              value={searchTermCliente}
              onChange={handleSearchClienteChange}
              placeholder="Buscar el cliente por el nombre o apellido.."
              className="outline-none font-medium w-full"
            />{" "}
          </div>
        </div>
        <div className="mx-10 pb-10">
          <table className="table">
            <thead>
              <tr>
                <th className="font-bold text-gray-900 text-xs">
                  Nombre completo
                </th>
                <th className="font-bold text-gray-900 text-xs">
                  Localidad/Provincia
                </th>
                <th className="font-bold text-gray-900 text-xs">
                  Deuda del cliente
                </th>{" "}
                <th className="font-bold text-gray-900 text-xs">Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="uppercase text-xs font-medium">
              {filteredData.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.nombre} {p.apellido}
                  </td>
                  <td>
                    {p.localidad}, {p.provincia}
                  </td>{" "}
                  <td>
                    <div className="flex">
                      <p
                        className={`py-1 px-3 rounded-md ${
                          Number(p.deuda_restante) <= 0
                            ? "bg-green-500 text-white"
                            : "bg-orange-500 text-white"
                        } font-semibold`}
                      >
                        {formatearDinero(Number(p.deuda_restante))}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="flex">
                      <p
                        className={`py-1 px-3 rounded-md ${
                          Number(p.deuda_restante) <= 0
                            ? "bg-green-500 text-white"
                            : "bg-orange-500 text-white"
                        } font-semibold`}
                      >
                        {Number(p.deuda_restante) <= 0
                          ? "Sin deudas"
                          : "Tiene deuda"}
                      </p>
                    </div>
                  </td>
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
                          <Link className="capitalize" to={`/cliente/${p.id}`}>
                            Cargar pagos
                          </Link>
                        </li>
                        <li className="hover:bg-gray-700 hover:text-white text-xs rounded-md font-semibold">
                          <button
                            onClick={() => {
                              {
                                handleObtenerId(p.id),
                                  document
                                    .getElementById(
                                      "my_modal_actualizar_cliente"
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

      <ModalCrearCliente />
      <ModalActualizarCliente idObtenida={idObtenida} />
      <ModalEliminar idObtenida={idObtenida} />
    </main>
  );
};

// VENTANAS MODAL.
const ModalCrearCliente = () => {
  const { setClientes } = useClientesContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const deuda = watch("deuda_restante");

  const onSubmit = async (formData) => {
    try {
      const clienteData = {
        ...formData,
      };

      const res = await client.post("/clientes", clienteData);

      setClientes(res.data);

      document.getElementById("my_modal_crear_cliente").close();

      showSuccessToast("Perfil creador correctamente");

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const [isEditable, setIsEditable] = useState(false);

  const handleInputClick = () => {
    setIsEditable(true);
  };

  return (
    <dialog id="my_modal_crear_cliente" className="modal">
      <div className="modal-box rounded-md max-w-xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Crear nuevo cliente</h3>
        <p className="py-1 text-sm font-medium">
          En esta sesión podras crear un nuevo cliente para facturar.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 border-t pt-4 pb-4 space-y-2"
        >
          <article className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              {" "}
              {errors.nombre && (
                <p className="text-red-700 font-semibold text-sm">
                  El nombre es requerido
                </p>
              )}
              <label className="text-sm font-bold">Nombre</label>
              <input
                {...register("nombre", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="nombre..."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.apellido && (
                <p className="text-red-700 font-semibold text-sm">
                  El apellido es requerido
                </p>
              )}
              <label className="text-sm font-bold">Apellido</label>
              <input
                {...register("apellido", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Apellido.."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.email && (
                <p className="text-red-700 font-semibold text-sm">
                  El email es requerido
                </p>
              )}
              <label className="text-sm font-bold">Email</label>
              <input
                {...register("email", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Email.."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.telefono && (
                <p className="text-red-700 font-semibold text-sm">
                  El telefono es requerido
                </p>
              )}
              <label className="text-sm font-bold">Telefono</label>
              <input
                {...register("telefono", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Telefono.."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.domicilio && (
                <p className="text-red-700 font-semibold text-sm">
                  El domicilio es requerido
                </p>
              )}
              <label className="text-sm font-bold">Domicilio</label>
              <input
                {...register("domicilio", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Domicilio.."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.localidad && (
                <p className="text-red-700 font-semibold text-sm">
                  El localidad es requerido
                </p>
              )}
              <label className="text-sm font-bold">Localidad</label>
              <input
                {...register("localidad", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Localidad.."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.provincia && (
                <p className="text-red-700 font-semibold text-sm">
                  El provincia es requerido
                </p>
              )}
              <label className="text-sm font-bold">Provincia</label>
              <input
                {...register("provincia", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Provincia.."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.dni && (
                <p className="text-red-700 font-semibold text-sm">
                  El dni es requerido
                </p>
              )}
              <label className="text-sm font-bold">Dni</label>
              <input
                {...register("dni", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Dni.."
              />
            </div>

            <div onClick={handleInputClick}>
              {isEditable ? (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">
                    Deuda del cliente actual
                  </label>
                  <input
                    {...register("deuda_restante", { required: true })}
                    onBlur={() => setIsEditable(false)}
                    className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                    type="text"
                    placeholder="ej: $ 12555.55"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm font-bold">
                    Deuda del cliente actual
                  </label>
                  <p
                    className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                    type="text"
                  >
                    {formatearDinero(Number(deuda || 0))}
                  </p>
                </div>
              )}
            </div>
          </article>

          <div className="flex pt-3">
            <input
              className="bg-red-500 text-white px-5 rounded-md py-1 text-sm font-bold cursor-pointer"
              type="submit"
              value={"Guardar el cliente"}
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

const ModalActualizarCliente = ({ idObtenida }) => {
  const { setClientes, clientes } = useClientesContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const deuda = watch("deuda_restante");

  useEffect(() => {
    const obtenerDatos = async () => {
      const res = await client.get(`/clientes/${idObtenida}`);

      setValue("nombre", res.data.nombre);
      setValue("apellido", res.data.apellido);
      setValue("email", res.data.email);
      setValue("telefono", res.data.telefono);
      setValue("domicilio", res.data.domicilio);
      setValue("localidad", res.data.localidad);
      setValue("provincia", res.data.provincia);
      setValue("dni", res.data.dni);
      setValue("deuda_restante", res.data.deuda_restante);
    };

    obtenerDatos();
  }, [idObtenida]);

  console.log(idObtenida);

  const onSubmit = async (formData) => {
    try {
      const clienteData = {
        ...formData,
      };

      const res = await client.put(`/clientes/${idObtenida}`, clienteData);

      setClientes(res.data);

      document.getElementById("my_modal_actualizar_cliente").close();

      showSuccessToast("Cliente actualizado correctamente");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const [isEditable, setIsEditable] = useState(false);

  const handleInputClick = () => {
    setIsEditable(true);
  };

  return (
    <dialog id="my_modal_actualizar_cliente" className="modal">
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
          <article className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              {" "}
              {errors.nombre && (
                <p className="text-red-700 font-semibold text-sm">
                  El nombre es requerido
                </p>
              )}
              <label className="text-sm font-bold">Nombre</label>
              <input
                {...register("nombre", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="nombre..."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.apellido && (
                <p className="text-red-700 font-semibold text-sm">
                  El apellido es requerido
                </p>
              )}
              <label className="text-sm font-bold">Apellido</label>
              <input
                {...register("apellido", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Apellido.."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.email && (
                <p className="text-red-700 font-semibold text-sm">
                  El email es requerido
                </p>
              )}
              <label className="text-sm font-bold">Email</label>
              <input
                {...register("email", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Email.."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.telefono && (
                <p className="text-red-700 font-semibold text-sm">
                  El telefono es requerido
                </p>
              )}
              <label className="text-sm font-bold">Telefono</label>
              <input
                {...register("telefono", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Telefono.."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.domicilio && (
                <p className="text-red-700 font-semibold text-sm">
                  El domicilio es requerido
                </p>
              )}
              <label className="text-sm font-bold">Domicilio</label>
              <input
                {...register("domicilio", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Domicilio.."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.localidad && (
                <p className="text-red-700 font-semibold text-sm">
                  El localidad es requerido
                </p>
              )}
              <label className="text-sm font-bold">Localidad</label>
              <input
                {...register("localidad", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Localidad.."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.provincia && (
                <p className="text-red-700 font-semibold text-sm">
                  El provincia es requerido
                </p>
              )}
              <label className="text-sm font-bold">Provincia</label>
              <input
                {...register("provincia", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Provincia.."
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              {errors.dni && (
                <p className="text-red-700 font-semibold text-sm">
                  El dni es requerido
                </p>
              )}
              <label className="text-sm font-bold">Dni</label>
              <input
                {...register("dni", { required: true })}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                type="text"
                placeholder="Dni.."
              />
            </div>

            <div onClick={handleInputClick}>
              {isEditable ? (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">
                    Deuda del cliente actual
                  </label>
                  <input
                    {...register("deuda_restante", { required: true })}
                    onBlur={() => setIsEditable(false)}
                    className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                    type="text"
                    placeholder="ej: $ 12555.55"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm font-bold">
                    Deuda del cliente actual
                  </label>
                  <p
                    className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                    type="text"
                  >
                    {formatearDinero(Number(deuda || 0))}
                  </p>
                </div>
              )}
            </div>
          </article>

          <div className="flex pt-3">
            <input
              className="bg-red-500 text-white px-5 rounded-md py-1 text-sm font-bold cursor-pointer"
              type="submit"
              value={"Actualizar el cliente"}
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

const ModalEliminar = ({ idObtenida }) => {
  const { handleSubmit } = useForm();

  const { setClientes } = useClientesContext();

  const onSubmit = async () => {
    try {
      const res = await client.delete(`/clientes/${idObtenida}`);

      setClientes(res.data);

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
            Eliminar el cliente cargado..
          </div>
          <div className="text-sm text-gray-400 text-center mt-1">
            El cliente no podra ser recuperado nunca mas y perderas todos los
            comprobantes cargados....
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
