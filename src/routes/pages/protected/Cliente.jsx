import { useEffect, useState } from "react";
import { FaList, FaSearch, FaWindowClose } from "react-icons/fa";
import { useClientesContext } from "../../../context/ClientesProvider";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import {
  showSuccessToast,
  showSuccessToastError,
} from "../../../helpers/toast";
import { useObtenerId } from "../../../helpers/obtenerId";
import { formatearDinero } from "../../../helpers/formatearDinero";
import client from "../../../api/axios";
import { formatearFecha } from "../../../helpers/formatearFecha";

export const Cliente = () => {
  const { cliente, setCliente, setClientes } = useClientesContext();

  const params = useParams();

  useEffect(() => {
    const obtenerDatos = async () => {
      const res = await client.get(`/clientes/${params.id}`);

      setCliente(res.data);
    };

    obtenerDatos();
  }, [params.id]);

  // Obtener el primer día del mes actual
  const today = new Date();

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Convertir las fechas en formato YYYY-MM-DD para los inputs tipo date
  const fechaInicioPorDefecto = firstDayOfMonth.toISOString().split("T")[0];
  const fechaFinPorDefecto = lastDayOfMonth.toISOString().split("T")[0];

  // Estado inicial de las fechas con el rango del mes actual
  const [fechaInicio, setFechaInicio] = useState(fechaInicioPorDefecto);
  const [fechaFin, setFechaFin] = useState(fechaFinPorDefecto);

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);
  };

  let comprobantes = cliente.pagos ? JSON.parse(cliente.pagos) : [];

  // Filtrar por rango de fechas
  if (fechaInicio && fechaFin) {
    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);
    comprobantes = comprobantes.filter((item) => {
      const fechaOrden = new Date(item.fecha);
      return fechaOrden >= fechaInicioObj && fechaOrden <= fechaFinObj;
    });
  }

  // Ordenar por fecha de mayor a menor
  const filtrarData = comprobantes.sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return fechaB - fechaA; // Ordena de mayor a menor (fecha más reciente primero)
  });

  const totalSumado = comprobantes.reduce((accumulator, current) => {
    // Convertir el total de string a número y sumarlo al acumulador
    return accumulator + parseFloat(current.total);
  }, 0); // El segundo argumento de reduce es el valor inicial del acumulador, en este caso 0

  return (
    <main className="h-full w-full min-h-screen max-h-full">
      <section className="max-md:w-full mx-auto h-full flex flex-col gap-10">
        <div className="bg-gray-100 py-10 px-10 flex justify-between">
          <p className="text-gray-900 font-bold text-xl capitalize">
            Cliente{" "}
            <p className="text-[#FD454D]">
              {cliente.nombre} {cliente.apellido}
            </p>
          </p>
          <div className="">
            <button
              onClick={() =>
                document.getElementById("my_modal_nuevo_pago").showModal()
              }
              type="button"
              className="font-semibold text-sm bg-[#FD454D] text-white py-1.5 px-5 rounded-md"
            >
              Crear nuevo pago del cliente
            </button>
          </div>
        </div>

        <div className="bg-white py-5 px-10 grid grid-cols-6 gap-3">
          <div className="border border-gray-300 py-5 px-5 rounded-md flex flex-col gap-1">
            <p className="font-medium text-gray-700">Deuda del cliente.</p>
            <p
              className={` ${
                Number(cliente.deuda_restante) > 0
                  ? "text-red-600"
                  : "text-green-600"
              } font-extrabold `}
            >
              {formatearDinero(Number(cliente.deuda_restante))}
            </p>
          </div>
          <div className="border border-gray-300 py-5 px-5 rounded-md flex flex-col gap-1">
            <p className="font-medium text-gray-700">Pagado por el cliente.</p>
            <p className={` text-blue-600 font-extrabold `}>
              {formatearDinero(Number(totalSumado))}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center mx-10">
          <div className="">
            <input
              value={fechaInicio}
              onChange={handleFechaInicioChange}
              type="date"
              className="bg-white text-sm font-semibold border border-gray-300 rounded-md py-2 px-3 outline-none"
              placeholder="Fecha de inicio"
            />
          </div>
          <div>
            <input
              value={fechaFin}
              onChange={handleFechaFinChange}
              type="date"
              className="bg-white text-sm font-semibold border border-gray-300 rounded-md py-2 px-3 outline-none"
              placeholder="Fecha fin"
            />
          </div>
        </div>

        <div className="mx-10 pb-10">
          <table className="table">
            <thead>
              <tr>
                <th className="font-bold text-gray-900 text-xs">
                  Referencia del pago
                </th>
                <th className="font-bold text-gray-900 text-xs">
                  Tipo de pago
                </th>{" "}
                <th className="font-bold text-gray-900 text-xs">
                  Total del pago
                </th>
                <th className="font-bold text-gray-900 text-xs">
                  Fecha del pago
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="uppercase text-xs font-medium">
              {filtrarData.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-3 font-medium text-gray-900 uppercase">
                    {s.id}
                  </td>{" "}
                  <td className="px-4 py-3 font-medium text-gray-900 uppercase">
                    {s.tipo_pago}
                  </td>
                  <td className="px-4 py-3 text-blue-600 font-bold uppercase">
                    {formatearDinero(Number(s.total))}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 uppercase">
                    {formatearFecha(s.fecha)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ModalCrearPago id={params.id} />
    </main>
  );
};

// VENTANAS MODAL.
const ModalCrearPago = ({ id }) => {
  const { setClientes, setCliente } = useClientesContext();

  const { register, handleSubmit, reset, watch } = useForm();

  const tiposDePagos = [
    { id: 1, nombre: "efectivo" },
    { id: 2, nombre: "tarjeta de Crédito" },
    { id: 3, nombre: "tarjeta de Débito" },
    { id: 4, nombre: "transferencia Bancaria" },
    { id: 5, nombre: "payPal" },
    { id: 6, nombre: "cheque" },
    { id: 7, nombre: "criptomonedas" },
  ];

  const total = watch("total");
  const tipo_pago = watch("tipo_pago");

  const onSubmit = async (formData) => {
    try {
      // Creamos el objeto del producto con todos los datos y la URL de la imagen
      const clienteData = {
        comprobante: {
          tipo_pago: tipo_pago,
          total: total,
        },
        ...formData,
      };

      const res = await client.post(
        `/clientes/${id}/comprobantes`,
        clienteData
      );

      setClientes(res.data.todosLosClientes);
      setCliente(res.data.clienteActualizado);

      document.getElementById("my_modal_nuevo_pago").close();

      showSuccessToast("Pago cargado correctamente");

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
    <dialog id="my_modal_nuevo_pago" className="modal">
      <div className="modal-box rounded-md max-w-xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Crear nuevo pago del cliente</h3>
        <p className="py-1 text-sm font-medium">
          En esta sesión podras crear un nuevo pago del cliente para descontar
          la deuda.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-3"
        >
          <div onClick={handleInputClick}>
            {isEditable ? (
              <div className="flex flex-col gap-1">
                {" "}
                <label className="text-sm font-bold">Total del pago</label>
                <input
                  className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
                  labelText={"Total del pago"}
                  placeholder={"Escribe el total del pago ej: $130.0000"}
                  {...register("total", { required: true })}
                  onBlur={() => setIsEditable(false)}
                  type={"text"}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">Total del pago</label>
                <p className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold">
                  {formatearDinero(Number(total) || 0)}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            {" "}
            <label className="text-sm font-bold">
              Seleccionar el tipo de pago
            </label>
            <select
              className="border border-gray-300 rounded-md px-2 py-2 text-sm uppercase outline-none font-semibold"
              {...register("tipo_pago", { required: true })}
            >
              <option className="font-bold text-blue-500">
                Seleccionar tipo de pago
              </option>
              {tiposDePagos.map((t) => (
                <option className="font-semibold" key={t.id} value={t.nombre}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex pt-3">
            <input
              className="bg-red-500 text-white px-5 rounded-md py-1 text-sm font-bold cursor-pointer"
              type="submit"
              value={"Guardar el pago"}
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
