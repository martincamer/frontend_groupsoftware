import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider";
import img from "../../../public/06.jpg";

export const Register = () => {
  const { signup, error } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);

    if (user) {
      navigate("/home");
    }
  });

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
        onSubmit={onSubmit}
        className="bg-white py-20 px-10 w-1/3 rounded-xl shadow-lg shadow-black/30 relative"
      >
        <div className="text-2xl font-extrabold text-white bg-secondary rounded-lg absolute top-[-16px] left-[35%] p-2">
          Software Group
        </div>

        <div className="space-y-2 mb-3">
          {error &&
            error.map((err) => (
              <p className="text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-2/3 mx-auto text-center border-[1px] border-red-200">
                {err}
              </p>
            ))}
          <p className="text-lg text-center font-semibold">
            ¡Registrate para empezar tu comienzo en la App!
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Nombre De Usuario</label>
            <input
              {...register("username", { required: true })}
              type="text"
              placeholder="Escribe tu username"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
            />
            {errors.username && (
              <span className="text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/3 text-center shadow border-[1px] border-red-200">
                El username es requerido
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Email</label>
            <input
              {...register("email", { required: true })}
              type="text"
              placeholder="Escribe tu @Email"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
            />
            {errors.email && (
              <span className="text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/3 text-center shadow border-[1px] border-red-200">
                El email es requerido
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Escribe una contraseña segura"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
            />
            {errors.password && (
              <span className="text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/3 text-center shadow border-[1px] border-red-200">
                El password es requerido
              </span>
            )}
          </div>
          <div className="">
            <input
              value="Registrarse"
              type="submit"
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
