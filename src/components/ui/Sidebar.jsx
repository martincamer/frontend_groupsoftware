import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import {
  BiDollarCircle,
  BiHome,
  BiLogoProductHunt,
  BiSolidBox,
  BiArea,
  BiUser,
  BiMenu,
  BiCart,
} from "react-icons/bi";
import { useState } from "react";

export const Sidebar = () => {
  const { user } = useAuth();
  const [click, setClick] = useState(true);

  const handleClick = () => {
    setClick(!click);
  };

  const location = useLocation();

  const navegacion = [
    {
      name: "Inicio",
      path: "/home",
      icon: <BiHome />,
    },

    {
      name: "Productos",
      path: "/productos",
      icon: <BiLogoProductHunt />,
    },
    {
      name: "Clientes",
      path: "/clientes",
      icon: <BiUser />,
    },
    {
      name: "Estado de los Clientes",
      path: "/estadistica-clientes",
      icon: <BiCart />,
    },
    {
      name: "Generar Presupuesto",
      path: "/presupuestos",
      icon: <BiSolidBox />,
    },
    {
      name: "Generar Venta",
      path: "/ventas-clientes",
      icon: <BiDollarCircle />,
    },
    {
      name: "Datos facturación",
      path: "/datos-facturacion",
      icon: <BiArea />,
    },
    // {
    //   name: "Perfil Usuario",
    //   path: "/profile",
    //   icon: <BiSolidUserAccount />,
    // },
  ];

  const params = useParams();

  return location.pathname !== `/view-factura-venta/${params.numero}` &&
    location.pathname !== `/view-factura/${params.numero}` ? (
    <div
      className={`${
        click
          ? "w-[100px] transition-all ease-in-out duration-300"
          : "w-1/5 transition-all ease-in-out duration-300"
      } w-1/5 bg-gray-100 min-h-screen max-h-full border-r-[1px]`}
    >
      <div
        className={`${
          click
            ? "justify-center transition-all ease-in-out duration-300"
            : "justify-end transition-all ease-in-out duration-300"
        } w-full flex px-4 py-2 cursor-pointer`}
      >
        <BiMenu
          onClick={handleClick}
          className="text-sky-500 text-[45px] hover:text-white hover:bg-sky-500 rounded-full py-[5px] transition-all ease-in-out duration-300"
        />
      </div>
      <div className={`w-full flex flex-col gap-12`}>
        <div>
          {navegacion.map(({ name, path, icon }) => (
            <div
              key={path}
              className={`${
                location.pathname === path && "bg-slate-300"
              } w-full py-3 px-8`}
            >
              <div className="flex items-center gap-2 hover:translate-x-2 transition-all ease duration-300">
                <Link to={path} className="text-3xl text-slate-800">
                  {icon}
                </Link>
                <Link
                  to={path}
                  className={`${
                    click
                      ? "hidden transition-all ease-in-out duration-300"
                      : "block transition-all ease-in-out duration-300"
                  } text-md uppercase font-semibold text-sky-600`}
                >
                  {name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
