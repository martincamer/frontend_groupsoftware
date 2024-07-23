import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const Navbar = () => {
  const { isAuth, signout, user } = useAuth();

  return (
    <header className="bg-gray-700 py-3 px-8 flex justify-between items-center">
      <nav className="flex gap-12 items-center">
        <Link to={"/home"}>
          <img src="./LOGO.jpeg" className="w-12 rounded-md" />
        </Link>
        <div className="flex gap-4">
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="text-white text-sm font-semibold hover:bg-gray-600 py-1 px-4 rounded-md"
            >
              Productos
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-md z-[1] w-52 p-2 shadow-xl"
            >
              <li className="hover:bg-gray-600 rounded-md text-gray-800 hover:text-white">
                <Link to={"/productos"} className=" font-semibold">
                  Perfiles
                </Link>
              </li>
              <li className="hover:bg-gray-600 rounded-md text-gray-800 hover:text-white">
                <Link to={"/accesorios"} className=" font-semibold">
                  Accesorios
                </Link>
              </li>
              <li className="hover:bg-gray-600 rounded-md text-gray-800 hover:text-white">
                <Link to={"/cortinas-rollers"} className=" font-semibold">
                  Cortinas rollers
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="text-white text-sm font-semibold hover:bg-gray-600 py-1 px-4 rounded-md"
            >
              Clientes
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-md z-[1] w-52 p-2 shadow-xl"
            >
              <li className="hover:bg-gray-600 rounded-md text-gray-800 hover:text-white">
                <Link to={"/clientes"} className=" font-semibold">
                  Clientes aluminio
                </Link>
              </li>
              <li className="hover:bg-gray-600 rounded-md text-gray-800 hover:text-white">
                <Link to={"/clientes"} className=" font-semibold">
                  Clientes cortinas rollers
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="text-white text-sm font-semibold hover:bg-gray-600 py-1 px-4 rounded-md"
            >
              Acciones aluminio
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-md z-[1] w-52 p-2 shadow-xl"
            >
              {/* <li className="hover:bg-gray-600 rounded-md text-gray-800 hover:text-white">
                <Link to={"/presupuestos"} className=" font-semibold">
                  Generar presupuestos aluminios
                </Link>
              </li> */}
              <li className="hover:bg-gray-600 rounded-md text-gray-800 hover:text-white">
                <Link to={"/ventas-clientes"} className=" font-semibold">
                  Generar ventas/presupuestos
                </Link>
              </li>
              <li className="hover:bg-gray-600 rounded-md text-gray-800 hover:text-white">
                <Link to={"/ventas-accesorios"} className=" font-semibold">
                  Generar ventas accesorios
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="text-white text-sm font-semibold hover:bg-gray-600 py-1 px-4 rounded-md"
            >
              Acciones cortinas rollers
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-md z-[1] w-52 p-2 shadow-xl"
            >
              <li className="hover:bg-gray-600 rounded-md text-gray-800 hover:text-white">
                <Link to={"/presupuestos"} className=" font-semibold">
                  Generar presupuesto cortinas
                </Link>
              </li>
              <li className="hover:bg-gray-600 rounded-md text-gray-800 hover:text-white">
                <Link to={"/ventas-clientes"} className=" font-semibold">
                  Generar ventas cortinas
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="text-white text-sm font-semibold hover:bg-gray-600 py-1 px-4 rounded-md"
            >
              Datos de la facturación
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-md z-[1] w-52 p-2 shadow-xl"
            >
              <li className="hover:bg-gray-600 rounded-md text-gray-800 hover:text-white">
                <Link to={"/datos-facturacion"} className=" font-semibold">
                  Datos de facturación aluminio
                </Link>
              </li>
              <li className="hover:bg-gray-600 rounded-md text-gray-800 hover:text-white">
                <Link to={"/ventas-clientes"} className=" font-semibold">
                  Datos de facturación cortinas
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <button
          type="submit"
          onClick={() => signout()}
          className="bg-[#FD454D] text-white font-bold text-sm px-5 py-1 rounded-md"
        >
          Salir de cuenta
        </button>
      </div>
    </header>
  );
};
