import { Link } from "react-router-dom";
import img from "../../../public/06.jpg";
export const Register = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${img})`,
        height: "100vh",
        backgroundSize: "cover",
      }}
      className="flex justify-center items-center"
    >
      <form className="bg-white py-20 px-10 w-1/3 rounded-xl shadow-lg shadow-black/30 relative">
        <div className="text-2xl font-extrabold text-white bg-secondary rounded-lg absolute top-[-16px] left-[35%] p-2">
          Software Group
        </div>
        <div>
          <p className="text-lg text-center font-semibold">
            ¡Registrate para empezar tu comienzo en la App!
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Nombre</label>
            <input
              type="text"
              placeholder="Escribe tu nombre"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Apellido</label>
            <input
              type="text"
              placeholder="Escribe tu apellido"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Email</label>
            <input
              type="text"
              placeholder="Escribe tu @Email"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Password</label>
            <input
              type="password"
              placeholder="Escribe una contraseña segura"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Repetir Password</label>
            <input
              type="password"
              placeholder="Repite el password correctamente"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
            />
          </div>
          <div className="">
            <input
              value="Registrarse"
              className="bg-secondary text-white rounded-lg hover:shadow-md hover:shadow-black/30 hover:translate-x-1 transition-all ease-in-out py-3 px-4 text-center outline-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <Link
              className="hover:underline transition-all ease-in-out"
              to={"/password-change"}
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <Link
              className="hover:underline transition-all ease-in-out"
              to={"/login"}
            >
              ¿Ya tienes una cuenta? Ingresar ahora.
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
