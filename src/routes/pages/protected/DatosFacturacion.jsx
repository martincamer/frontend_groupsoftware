import { ToastContainer, toast } from "react-toastify";
import { ModalCrearDatosFacturar } from "../../../components/ui/ModalCrearDatosFacturar";
import { useFacturarDatosContext } from "../../../context/FacturaDatosProvider";
import { Spinner } from "../../../components/Spinner";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";

export const DatosFacturacion = () => {
  const { register, onSubmit, openModal, datosFacturar } =
    useFacturarDatosContext();
  const { spinner } = useAuth();

  const notify = () =>
    toast.success("Cambios guardados correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return spinner ? (
    <Spinner />
  ) : (
    <section className="w-full my-[50px] px-[30px]">
      <ToastContainer />
      <div className="py-[50px] flex flex-col items-center gap-5 border-[1px] border-gray-300">
        <div>
          <h3 className="text-2xl font-bold uppercase text-sky-500">
            Datos de la facturación
          </h3>
        </div>
        <form
          onSubmit={onSubmit}
          className="border-[1px] border-gray-300 shadow shadow-black/10 rounded py-[30px] px-[20px] flex flex-col gap-5 w-6/12"
        >
          <div className="flex flex-col gap-2 w-[70px] ">
            <label className="uppercase font-semibold" htmlFor="">
              Numero
            </label>
            <input
              {...register("id", { required: true })}
              className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50 text-center"
              type="text"
              placeholder="id"
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="uppercase font-semibold" htmlFor="">
              Nombre de la empresa
            </label>
            <input
              {...register("nombre", { required: true })}
              className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
              type="text"
              placeholder="Nombre de la compania"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="uppercase font-semibold" htmlFor="">
              Email de la empresa
            </label>
            <input
              {...register("email", { required: true })}
              className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
              type="text"
              placeholder="Email de la compania"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="uppercase font-semibold" htmlFor="">
              Detalle de distribución
            </label>
            <input
              {...register("detalle", { required: true })}
              className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
              type="text"
              placeholder="Detalle de la distribucion"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="uppercase font-semibold" htmlFor="">
              Numero de telefono
            </label>
            <input
              {...register("telefono", { required: true })}
              className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
              type="text"
              placeholder="Numero de telefono de la compania"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="uppercase font-semibold" htmlFor="">
              Dirección de la compania
            </label>
            <input
              {...register("direccion", { required: true })}
              className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
              type="text"
              placeholder="Dirección de la compania"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="uppercase font-semibold" htmlFor="">
              Localidad de la compania
            </label>
            <input
              {...register("localidad", { required: true })}
              className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
              type="text"
              placeholder="Localidad de la compania"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="uppercase font-semibold" htmlFor="">
              Editar datos facturación
            </label>
            <input
              type="submit"
              onClick={() => notify()}
              value={"Guardar cambios"}
              className="cursor-pointer uppercase py-2 px-2 bg-sky-500 rounded shadow shadow-black/20 text-white font-bold text-sm"
            />
          </div>
        </form>
        <div className="mt-3">
          {datosFacturar.length < 1 ? (
            <button
              onClick={() => openModal()}
              className="cursor-pointer py-2 px-2 bg-green-500 rounded shadow shadow-black/20 text-white font-bold"
            >
              Crear datos para facturar
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <ModalCrearDatosFacturar />
    </section>
  );
};
