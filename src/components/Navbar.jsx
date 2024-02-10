import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const rutasPublicas = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Planes",
    path: "/planes",
  },
  {
    name: "Contacto",
    path: "/contacto",
  },
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
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Registrarse",
    path: "/register",
  },
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
        <div>
          <Link
            to={"/"}
            className={`${
              isAuth ? "uppercase" : "capitalize"
            } text-2xl font-extrabold text-secondary`}
          >
            Software Group Aluminio
          </Link>
        </div>
        <div className="flex flex-row gap-4">
          {!isAuth &&
            rutasPublicas.map(({ path, name }) => (
              <Link
                className="text-[17px] font-semibold hover:text-secondary transition-all ease-in-out duration-300"
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
                  <div className="font-semibold text-sm text-secondary bg-primary shadow shadow-md text-white p-1 rounded-full px-2">
                    {user?.username}
                  </div>
                  {/* <Link to={"profile"}>
                    <img
                      className="rounded-full w-[40px] shadow shadow-md shadow-black/10"
                      src={user?.gravatar}
                    />
                  </Link> */}
                  <Link
                    onClick={() => signout()}
                    className="text-[17px] font-semibold transition-all ease-in-out duration-300 bg-secondary px-4 rounded-full py-2 text-white hover:shadow-md hover:shadow-black/20 hover:scale-[1.02]"
                    key={path}
                  >
                    {name}
                  </Link>
                </div>
              ))
            : rutasdos.map(({ path, name }) => (
                <Link
                  className="text-[17px] font-semibold transition-all ease-in-out duration-300 bg-secondary px-4 rounded-full py-2 text-white hover:shadow-md hover:shadow-black/20 hover:scale-[1.02]"
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
