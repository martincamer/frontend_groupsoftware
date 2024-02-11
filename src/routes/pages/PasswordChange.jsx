import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../../../public/06.jpg";
import axios from "axios";
import { changePassword } from "../../api/datosFacturacion.api";

export const PasswordChange = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Llama a tu API para cambiar la contraseña
      const response = await changePassword({
        email,
        oldPassword,
        newPassword,
      });

      // Maneja la respuesta según tus necesidades
      console.log(response.data);
      setMessage("Se ha cambiado la contraseña exitosamente.");
    } catch (error) {
      // Maneja los errores según tus necesidades
      console.error(
        "Error al cambiar la contraseña",
        error.response.data.message
      );
      setMessage(
        "Error al cambiar la contraseña. Verifica la información ingresada."
      );
    }
  };

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
        className="bg-white py-20 px-10 w-1/3 rounded-xl shadow-lg shadow-black/30 relative"
        onSubmit={handleSubmit}
      >
        <div className="text-2xl font-extrabold text-white bg-secondary rounded-lg absolute top-[-16px] left-[35%] p-2">
          Software Group
        </div>
        <div>
          <p className="text-lg text-center font-semibold">
            Cambiar tu contraseña
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Email</label>
            <input
              type="email"
              placeholder="Escribe tu @Email con el que te registraste"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Antigua Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu antigua contraseña"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
              value={oldPassword}
              onChange={handleChangeOldPassword}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Nueva Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu nueva contraseña"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
              value={newPassword}
              onChange={handleChangeNewPassword}
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-secondary text-white rounded-lg hover:shadow-md hover:shadow-black/30 hover:translate-x-1 transition-all ease-in-out py-3 px-4 text-center outline-none cursor-pointer"
            >
              Cambiar Contraseña
            </button>
          </div>
          <div className="text-sm font-semibold">
            {message && <p className="text-center">{message}</p>}
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <Link
              className="hover:underline transition-all ease-in-out"
              to={"/register"}
            >
              ¿Todavía no te registraste? Regístrate.
            </Link>
            <Link
              className="hover:underline transition-all ease-in-out"
              to={"/login"}
            >
              ¿Ya tienes una cuenta? Inicia sesión ahora.
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
