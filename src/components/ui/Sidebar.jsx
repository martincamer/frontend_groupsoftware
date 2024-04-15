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
import { IoMdClose } from "react-icons/io";
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
  const [hoveredName, setHoveredName] = useState(null);

  return location.pathname !== `/view-factura-venta/${params.numero}` &&
    location.pathname !== `/view-factura/${params.numero}` ? (
    <div
      className={`${
        click
          ? "w-[70px] transition-all ease-in-out duration-300"
          : "w-1/5 transition-all ease-in-out duration-300"
      } w-1/5 bg-white min-h-screen max-h-full border-r-[1px]`}
    >
      <div
        className={`${
          click
            ? "justify-center transition-all ease-in-out duration-300"
            : "justify-end transition-all ease-in-out duration-300"
        } w-full px-4 py-2 cursor-pointer hidden`}
      >
        {click ? (
          <BiMenu
            onClick={handleClick}
            className="text-sky-500 text-[40px] hover:text-white hover:bg-sky-500 rounded-xl py-[5px] transition-all ease-in-out duration-300"
          />
        ) : (
          <IoMdClose
            onClick={handleClick}
            className="text-sky-500 text-[40px] hover:text-white hover:bg-sky-500 rounded-xl py-[5px] transition-all ease-in-out duration-300"
          />
        )}
      </div>
      <div className={`w-full flex flex-col gap-12`}>
        <div className="">
          {navegacion.map(({ name, path, icon }) => (
            <div
              key={path}
              className={`${
                location.pathname === path && "bg-slate-100"
              } w-full py-3 px-5`}
              onMouseEnter={() => setHoveredName(name)}
              onMouseLeave={() => setHoveredName(null)}
              style={{ position: "relative" }}
            >
              <div className="flex items-center gap-2 relative">
                <Link to={path} className="text-3xl text-slate-800">
                  {icon}
                </Link>
                <div
                  className={`${
                    hoveredName === name
                      ? "block transition-all ease-in-out duration-300"
                      : "hidden transition-all ease-in-out duration-300"
                  } text-md uppercase font-semibold text-sky-600 bg-white z-[100] border-slate-300 shadow-md transition-all ease-linear border-[1px] rounded-2xl absolute left-full ml-2 py-2 px-3 text-center w-[200px]`}
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  {name}
                </div>
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
