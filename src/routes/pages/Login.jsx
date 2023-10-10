import { Link } from "react-router-dom";
import img from "../../../public/06.jpg";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
export const Login = () => {
  const {
    handleSubmitLogin,
    username,
    password,
    setUsername,
    setPassword,
    error,
  } = useContext(AuthContext);

  return (
    <section
      style={{
        backgroundImage: `url(${img})`,
        height: "100vh",
        backgroundSize: "cover",
      }}
      className="flex justify-center items-center"
    >
      <form
        onSubmit={handleSubmitLogin}
        className="bg-white py-20 px-10 w-1/3 rounded-xl shadow-lg shadow-black/30 relative"
      >
        {error && <span>Error</span>}
        <div className="text-2xl font-extrabold text-white bg-secondary rounded-lg absolute top-[-16px] left-[35%] p-2">
          Software Group
        </div>
        <div>
          <p className="text-lg text-center font-semibold">
            Ingreso al sistema
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Usuario</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Nombre de usuario"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Contraseña de usuario"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
            />
          </div>
          <div className="">
            <input
              type="submit"
              value="Ingresar"
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
              to={"/register"}
            >
              ¿No te registraste? Registrase
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
