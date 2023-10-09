import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="shadow-md shadow-black/20 py-4 px-6 flex justify-between items-center gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-secondary">
          Software Group
        </h1>
      </div>
      <div className="flex flex-row gap-4">
        <Link
          className="text-[17px] font-semibold hover:text-secondary transition-all ease-in-out duration-300"
          to={""}
        >
          Inicio
        </Link>
        <Link
          className="text-[17px] font-semibold hover:text-secondary transition-all ease-in-out duration-300"
          to={""}
        >
          Nosotros
        </Link>
        <Link
          className="text-[17px] font-semibold hover:text-secondary transition-all ease-in-out duration-300"
          to={""}
        >
          ¿De que se trata?
        </Link>
        <Link
          className="text-[17px] font-semibold hover:text-secondary transition-all ease-in-out duration-300"
          to={""}
        >
          Planes
        </Link>
        <Link
          className="text-[17px] font-semibold hover:text-secondary transition-all ease-in-out duration-300"
          to={""}
        >
          Contacto
        </Link>
      </div>
      <div className="flex flex-row gap-6">
        <Link
          className="bg-secondary py-2 px-6 rounded-full text-white text-center font-semibold shadow-md shadow-black/10 cursor-pointer hover:bg-primary transition-all ease-in-out hover:text-five"
          to={"/login"}
        >
          Login
        </Link>
        <Link
          className="bg-secondary py-2 px-6 rounded-full text-white text-center font-semibold shadow-md shadow-black/10 cursor-pointer hover:bg-primary transition-all ease-in-out hover:text-five"
          to={"/register"}
        >
          Registrarse
        </Link>
      </div>
    </header>
  );
};
