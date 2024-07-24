import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export const Login = () => {
  const { signin, error } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);

    if (user) {
      navigate("/home");
    }
  });

  return (
    <section className="flex items-center h-screen bg-white">
      <div className="bg-gradient-to-br from-gray-700 to-gray-900 h-screen w-1/2 flex items-center max-md:hidden">
        <div className="px-10 py-10 flex flex-col gap-2">
          <p className="font-semibold text-3xl text-white">
            Bienvenido/a al sistema de gestión aluminio.
          </p>{" "}
          <p className="font-medium text-sm text-white">
            Empieza a gestiónar tus perfiles, ventas, facturas, presupuestos,
            accesorios, etc.
          </p>
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className="bg-white border-[1px] border-gray-300 py-14 px-10 w-1/3 rounded-md mx-auto shadow-black/30 relative max-md:w-full max-md:mx-5"
      >
        <div className="space-y-2 mb-3">
          {error &&
            error.map((err) => (
              <p className="text-sm bg-red-100/20 text-red-600 py-2 px-2 rounded w-2/3 mx-auto text-center border-[1px] border-red-200">
                {err}
              </p>
            ))}

          <img
            src="https://app.holded.com/assets/img/brand/holded-logo.svg"
            className="w-14 mx-auto cursor-pointer"
          />

          <p className="text-lg text-center font-bold">
            Ingreso al sistema de gestión de aluminio.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold">Email</label>
            <input
              {...register("email", { required: true })}
              type="text"
              placeholder="Email de usuario"
              className="rounded-md border-[1px] border-gray-300 py-2 px-2 outline-none text-sm font-medium"
            />
            {errors.email && (
              <span className="text-sm text-red-600 font-medium">
                El email es requerido
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold">Contraseña</label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Contraseña de usuario"
              className="rounded-md border-[1px] border-gray-300 py-2 px-2 outline-none text-sm font-medium"
            />
            {errors.password && (
              <span className="text-sm text-red-600 font-medium">
                El password es requerido
              </span>
            )}
          </div>
          <div>
            <input
              type="submit"
              value="Ingresar al sistema"
              className="bg-[#FD454D] py-1.5 px-6 text-sm font-bold text-white rounded-md hover:shadow-md transition-all cursor-pointer"
            />
          </div>
        </div>
      </form>
    </section>
  );
};
