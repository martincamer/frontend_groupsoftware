import { useAuth } from "../context/AuthProvider";

export const Footer = () => {
  const { isAuth, signout, user } = useAuth();
  return !isAuth ? (
    <footer className="bg-white w-[1220px] mx-auto py-20 px-6 grid grid-cols-3">
      <div>
        <p className="font-bold text-2xl text-secondary">
          Group Software Aluminio
        </p>
      </div>
      <div>
        <div className="space-y-4">
          <p className="font-bold text-2xl text-secondary">Enlaces</p>
          <ul className="space-y-3 font-semibold text-lg">
            <li>Inicio</li>
            <li>Planes</li>
            <li>Contacto</li>
            <li>Login</li>{" "}
          </ul>
        </div>
      </div>
      <div className="space-y-2">
        <p className="font-bold text-lg">Dejanos tu mensaje</p>
        <div className="pb-3">
          <input
            className="py-2 px-2 bg-white border-[1px] border-black/20 shadow rounded w-full outline-none"
            placeholder="Correo ej: correo@correo.com"
          />
        </div>
        <button className="bg-secondary text-white py-2 px-5 rounded font-bold shadow">
          Enviar correo
        </button>
      </div>
    </footer>
  ) : (
    ""
  );
};
