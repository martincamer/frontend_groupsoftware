import { useAuth } from "../../../context/AuthProvider";

export const ProfilePage = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <main className="h-full w-full py-14 px-14 ">
      <section className="max-md:w-full mx-auto py-[20px] px-[20px] h-full border-[1px] border-gray-300 rounded shadow-black/20 shadow-md flex flex-col gap-10 overflow-y-scroll">
        <div>
          <p className="text-2xl font-extrabold text-secondary">
            Perfil Usuario
          </p>
        </div>
        <div className="border-gray-200 border-[1px] py-[30px] px-[30px] rounded shadow-black/20 shadow grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="">Nombre de la empresa</label>
            <input
              value={user?.username}
              className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
              type="text"
              placeholder="Nombre de la compania"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Nombre</label>
            <input
              className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
              type="text"
              placeholder="Nombre"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Apellido</label>
            <input
              className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
              type="text"
              placeholder="Apellido"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <input
              className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Telefono</label>
            <input
              className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
              type="tel"
              placeholder="Telefono"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Contraseña</label>
            <input
              className="border-[1px] border-gray-200 rounded shadow shadow-black/20 py-2 px-2 outline-none placeholder:text-black/50"
              type="password"
              placeholder="Contraseña"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Guardar cambios</label>
            <input
              className="shadow shadow-black/20 py-2 px-2 rounded-full text-center w-[200px] bg-secondary text-white cursor-pointer"
              value={"Guardar cambios"}
            />
          </div>
        </div>
      </section>
    </main>
  );
};
