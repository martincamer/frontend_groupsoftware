import { ModalCrearDatosFacturar } from "../../../components/ui/ModalCrearDatosFacturar";
import { useFacturarDatosContext } from "../../../context/FacturaDatosProvider";
import { showSuccessToast } from "../../../helpers/toast";

export const DatosFacturacion = () => {
  const { register, onSubmit, openModal, datosFacturar } =
    useFacturarDatosContext();

  const notify = () => showSuccessToast("Datos actualizados correctamente");

  return (
    <section className="w-full my-[50px] px-[30px]">
      <div className="py-[50px] flex flex-col items-center gap-12">
        <div className="bg-gray-700 py-5 px-10 rounded-md text-white">
          <h3 className="text-xl font-bold">
            Datos de la facturación/presupuestos
          </h3>
        </div>
        <form
          onSubmit={onSubmit}
          className="py-12 border rounded-md border-gray-300 px-12 flex flex-col gap-5 w-6/12"
        >
          <div className="flex flex-col gap-2 w-[70px] ">
            <label className="uppercase font-semibold" htmlFor="">
              Numero
            </label>
            <input
              {...register("id", { required: true })}
              className="border border-gray-300 rounded-md outline-none py-2 px-2 text-sm font-medium"
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
              className="border border-gray-300 rounded-md outline-none py-2 px-2 text-sm font-medium uppercase"
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
              className="border border-gray-300 rounded-md outline-none py-2 px-2 text-sm font-medium uppercase"
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
              className="border border-gray-300 rounded-md outline-none py-2 px-2 text-sm font-medium uppercase"
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
              className="border border-gray-300 rounded-md outline-none py-2 px-2 text-sm font-medium uppercase"
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
              className="border border-gray-300 rounded-md outline-none py-2 px-2 text-sm font-medium uppercase"
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
              className="border border-gray-300 rounded-md outline-none py-2 px-2 text-sm font-medium uppercase"
              type="text"
              placeholder="Localidad de la compania"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="uppercase font-semibold" htmlFor="">
              Editar datos facturación
            </label>
            <button
              type="submit"
              onClick={() => notify()}
              className="bg-blue-500 text-sm font-bold flex gap-2 items-center py-2 px-4 rounded-md text-white"
            >
              Guardar cambios
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            </button>
          </div>
        </form>
        <div className="mt-3">
          {datosFacturar.length < 1 ? (
            <button
              onClick={() => openModal()}
              className="cursor-pointer py-3 px-5 bg-green-100 rounded-xl hover:shadow shadow-black/20 text-green-700 font-bold uppercase text-sm"
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
