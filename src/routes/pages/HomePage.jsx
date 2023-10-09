import { Button } from "../../components/ui/Button";
import { CardFeatures } from "../../components/ui/CardFeatures";
import { CARDATOS, CARDATOSTREE, CARDATOSTWO } from "../../contents/data";
import image from "../../../public/01.webp";

export const HomePage = () => {
  return (
    <>
      <section className="mx-md:px-6 bg-secondary py-[150px] max-md:py-[80px]">
        <div className="flex flex-col justify-center items-center space-y-9">
          <h4 className="text-white font-extrabold text-4xl w-1/3 max-md:w-full">
            ¿Queres tener tu stock de aluminio en linea, generar presupuestos,
            etc?
          </h4>
          <p className="text-white font-semibold text-2xl w-1/3 text-center max-md:w-full">
            ¡Solo tenes que registrarte para comenzar!
          </p>
          <div className="flex flex-row gap-5 max-md:w-full">
            <Button
              cssPersonalizado={
                "py-2 px-6 bg-five text-secondary font-semibold rounded-full text-lg shadow-md shadow-black/10 hover:scale-[1.02] transition-all ease-in-out"
              }
              texto={"Ver los planes"}
              href={"#"}
            />
            <Button
              cssPersonalizado={
                "py-2 px-6 bg-five text-secondary font-semibold rounded-full text-lg shadow-md shadow-black/10 hover:scale-[1.02] transition-all ease-in-out"
              }
              texto={"¡Quiero saber mas!"}
              href={"#"}
            />
          </div>
        </div>
      </section>
      <section className="mx-md:px-6 bg-five py-[150px] max-md:py-[80px] relative">
        <div>
          <div className="">
            <p className="text-center text-2xl font-bold w-1/3 max-md:w-full mx-auto">
              La solución más fácil para control de stock y facturación en
              segundos.
            </p>
            <img
              className="w-[300px] h-[300px] absolute top-[-150px] left-[65%]"
              src={image}
              alt="imagen programa"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 items-center justify-center w-[1220px] mx-auto max-md:w-full">
          {CARDATOS.map((i) => (
            <CardFeatures i={i} key={i.id} />
          ))}
        </div>
      </section>
      <section className="mx-md:px-6 bg-gray-100 py-[150px] max-md:py-[80px] max-md:px-6">
        <div className="mx-auto w-[1220px] max-md:w-full grid grid-cols-2 gap-16 max-md:grid-cols-1">
          <div className="flex flex-col gap-8">
            <h3 className="text-3xl font-extrabold text-secondary max-md:text-2xl">
              ¿Qué nos hace mejores?
            </h3>
            {CARDATOSTWO.map((datos) => (
              <article key={datos.id} className="flex gap-6 items-center">
                <div>{datos.icono}</div>
                <div>
                  <p className="text-lg">
                    <span className="font-extrabold text-primary">
                      {datos.title}
                    </span>{" "}
                    <br /> {datos.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div>
            <img
              src="public/02.png"
              alt="imagen-empresa"
              className="shadow-lg shadow-black/30 rounded-3xl"
            />
          </div>
        </div>
      </section>
      <section className="mx-md:px-6 bg-secondary py-[150px] max-md:py-[80px] max-md:px-6">
        <div className="mx-auto w-[1220px] max-md:w-full flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className="text-white font-extrabold text-2xl text-center">
              SOBRE
            </p>
            <h4 className="text-green-300 font-extrabold text-4xl text-center">
              Funcionalidades
            </h4>
            <p className="text-center text-white text-lg">
              Programa para control de stock y gestión comercial, rápido y
              sencillo
            </p>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {CARDATOSTREE.map((datos) => (
              <article
                key={datos.id}
                className="flex flex-col gap-4 bg-white py-5 px-6 rounded-xl hover:shadow-lg hover:shadow-black/20 hover:translate-x-1 transition-all ease-in-out cursor-pointer"
              >
                <div>{datos.icono}</div>
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-bold text-center">
                    {datos.title}
                  </div>
                  <div className="text-sm font-semibold text-justify">
                    {datos.desc}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-md:px-6 bg-gray-100 py-[150px] max-md:py-[80px] max-md:px-6">
        <div className="mx-auto w-[1220px] max-md:w-full grid grid-cols-2 justify-center items-center gap-2">
          <div className="flex flex-col gap-10">
            <h4 className="font-extrabold text-4xl">
              Gestioná y controlá tu comercio desde cualquier lugar
            </h4>
            <p className="text-lg">
              Probá nuestra app durante 14 días y descubrí como podemos ayudarte
              a gestionar tu local de manera sencilla y rápida desde tu celular.
            </p>
            <div className="flex flex-row gap-4">
              <img
                className="w-[140px] cursor-pointer hover:shadow-md hover:shadow-black/30 transition-all ease-in-out"
                src="public/04.png"
              />
              <img
                className="w-[140px] cursor-pointer hover:shadow-md hover:shadow-black/30 transition-all ease-in-out"
                src="public/05.png"
              />
            </div>
          </div>
          <div>
            <img src="public/03.png" />
          </div>
        </div>
      </section>
    </>
  );
};
