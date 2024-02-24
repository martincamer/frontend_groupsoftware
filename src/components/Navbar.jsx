import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const rutasPublicas = [
  // {
  //   name: "Inicio",
  //   path: "/",
  // },
  // {
  //   name: "Planes",
  //   path: "/planes",
  // },
  // {
  //   name: "Contacto",
  //   path: "/contacto",
  // },
];

const rutasPrivadas = [
  {
    name: "Inicio",
    path: "/home",
  },
  {
    name: "Perfiles",
    path: "/productos",
  },
  {
    name: "Clientes",
    path: "/clientes",
  },
  {
    name: "Presupuestos",
    path: "/presupuestos",
  },
  {
    name: "Realizar Venta",
    path: "/ventas-clientes",
  },
];

const rutasuno = [
  {
    name: "Logout",
    path: "/logout",
  },
];

const rutasdos = [
  // {
  //   name: "Login",
  //   path: "/",
  // },
  // {
  //   name: "Registrarse",
  //   path: "/register",
  // },
];

export const Navbar = () => {
  const { isAuth, signout, user } = useAuth();

  return (
    <header className="shadow-md shadow-black/20 py-4 px-6">
      <div
        className={`flex justify-between items-center gap-4 ${
          !isAuth ? "w-[1220px]" : "w-full px-6"
        } mx-auto`}
      >
        <div className="flex gap-2 items-center">
          <Link
            to={"/"}
            className={`${
              isAuth ? "uppercase" : "capitalize"
            } text-2xl font-extrabold text-sky-500`}
          >
            ALUMINIOS DEL SUR <span className="text-black">DISTRIBUIDORA.</span>{" "}
          </Link>
          <img src="./LOGO.jpeg" className="w-[50px] cursor-pointer" />
        </div>
        <div className="flex flex-row gap-4">
          {!isAuth &&
            rutasPublicas.map(({ path, name }) => (
              <Link
                className="text-[17px] font-semibold hover:text-sky-500 transition-all ease-in-out duration-300"
                to={path}
                key={path}
              >
                {name}
              </Link>
            ))}
        </div>
        <div className="flex flex-row gap-6">
          {isAuth
            ? rutasuno.map(({ path, name }) => (
                <div className="flex items-center gap-4">
                  <div className="font-semibold text-xs text-sky-500 bg-white shadow border-[1px] uppercase border-gray-500 py-[5px] rounded-full px-2">
                    <span className="text-black text-sm">usuario:</span>{" "}
                    {user?.username}
                  </div>

                  <Link
                    onClick={() => signout()}
                    className="text-[17px] font-semibold transition-all ease-in-out duration-300 bg-sky-500 px-4 rounded-xl py-2 text-white hover:shadow-md hover:shadow-black/20 hover:scale-[1.02] uppercase text-sm"
                    key={path}
                  >
                    {name}
                  </Link>
                </div>
              ))
            : rutasdos.map(({ path, name }) => (
                <Link
                  className="text-[17px] font-semibold transition-all ease-in-out duration-300 bg-sky-500 px-4 rounded-full py-2 text-white hover:shadow-md hover:shadow-black/20 hover:scale-[1.02]"
                  to={path}
                  key={path}
                >
                  {name}
                </Link>
              ))}
        </div>
      </div>
    </header>
  );
};
