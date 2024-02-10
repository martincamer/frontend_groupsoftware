import { FiPhoneCall } from "react-icons/fi";

export const Contacto = () => {
  return (
    <section className="mx-md:px-6 bg-secondary py-[150px] max-md:py-[80px] flex flex-col gap-20">
      <div className="w-[1220px] max-w-full mx-auto grid grid-cols-2 gap-12">
        <div className="space-y-4">
          <h3 className="font-extrabold text-4xl text-white">
            Comunícate <span className="text-green-300">24/7</span> con nuestro
            equipo
          </h3>
          <p className="text-lg font-light w-full text-white">
            Con Nosotros cuentas con soporte gratis e ilimitado y con el más
            completo Centro de ayuda para avanzar a tu ritmo.
          </p>
        </div>
        <form className="bg-white shadow shadow-black/30 rounded-xl py-6 px-6 space-y-4">
          <div>
            <input
              className="border-[1px] border-gray-300 py-2 px-2  w-full rounded shadow shadow-black/20 placeholder:text-gray-500 outline-none"
              type="text"
              placeholder="Nombre"
            />
          </div>
          <div>
            <input
              className="border-[1px] border-gray-300 py-2 px-2  w-full rounded shadow shadow-black/20 placeholder:text-gray-500 outline-none"
              type="text"
              placeholder="Correo"
            />
          </div>
          <div>
            <textarea
              className="border-[1px] border-gray-300 py-2 px-2  w-full rounded shadow shadow-black/20 placeholder:text-gray-500 outline-none"
              placeholder="Mensage"
            />
          </div>
          <div>
            <button
              className="font-bold bg-secondary px-6 py-2 rounded-md shadow shadow-black/10 text-white"
              type="button"
            >
              Enviar Mensaje
            </button>
          </div>
        </form>
      </div>
      <div className="w-[1220px] mx-auto max-w-full">
        <div className="bg-white py-10 px-6 w-1/2 mx-auto rounded-xl shadow space-y-2">
          <div className="flex gap-6 items-center text-center justify-center">
            <FiPhoneCall className="text-5xl text-secondary" />
            <p className="text-3xl font-semibold">Llamanos al 54-3462-693961</p>
          </div>
          <div className="text-center font-bold text-xl text-secondary">
            De lunes a viernes de 9:00 a 15:30 hrs.
          </div>
        </div>
      </div>
    </section>
  );
};
