export const Planes = () => {
  return (
    <section className="mx-md:px-6 bg-gray-200 py-[150px] max-md:py-[80px] flex flex-col gap-20">
      <div className="w-[1220px] max-w-full mx-auto">
        <div className="space-y-3">
          <h2 className="text-[46px] font-extrabold text-primary text-center">
            Planes de Group Software Distribuidoras Aluminio
          </h2>
          <p className="font-semibold text-center text-2xl text-secondary">
            Elegí uno de nuestros planes y empezá a crecer con Alegra
          </p>
        </div>
      </div>
      <div className="w-[1220px] max-w-full mx-auto grid grid-cols-3 gap-6">
        <div className="bg-white py-10 px-12 rounded border-[1px] shadow shadow-black/20 space-y-4 flex flex-col items-center">
          <h3 className="font-bold text-secondary text-center text-xl">
            PLAN MENSUAL
          </h3>
          <p className="text-4xl font-extrabold text-center">
            $6.000 <span className="text-secondary">ARS</span>
          </p>
          <button
            type="button"
            className="bg-green-500 py-1 px-5 rounded text-lg font-bold shadow text-white text-center"
          >
            ELEGIR PLAN
          </button>

          <div className="pt-8">
            <ul className="flex flex-col gap-3 list-disc font-semibold text-base">
              <li>Compras y ventas ilimitadas Incluye facturación.</li>
              <li>Envios de facturas por whatshap y email.</li>
              <li>Stock de productos ilimitado.</li>
              <li>Clientes ilimitados.</li>
            </ul>
          </div>
        </div>
        <div className="bg-white py-10 px-12 rounded border-[1px] shadow shadow-black/20 space-y-4 flex flex-col items-center">
          <h3 className="font-bold text-secondary text-center text-xl">
            PLAN ANUAL
          </h3>
          <p className="text-4xl font-extrabold text-center">
            $100.000 <span className="text-secondary">ARS</span>
          </p>
          <button
            type="button"
            className="bg-green-500 py-1 px-5 rounded text-lg font-bold shadow text-white text-center"
          >
            ELEGIR PLAN
          </button>

          <div className="pt-8">
            <ul className="flex flex-col gap-3 list-disc font-semibold text-base">
              <li>Compras y ventas ilimitadas Incluye facturación.</li>
              <li>Envios de facturas por whatshap y email.</li>
              <li>Stock de productos ilimitado.</li>
              <li>Clientes ilimitados.</li>
            </ul>
          </div>
        </div>
        <div className="bg-white py-10 px-12 rounded border-[1px] shadow shadow-black/20 space-y-4 flex flex-col items-center">
          <h3 className="font-bold text-secondary text-center text-xl">
            PLAN DEFINITIVO
          </h3>
          <p className="text-4xl font-extrabold text-center">
            $250.000 <span className="text-secondary">ARS</span>
          </p>
          <button
            type="button"
            className="bg-green-500 py-1 px-5 rounded text-lg font-bold shadow text-white text-center"
          >
            ELEGIR PLAN
          </button>

          <div className="pt-8">
            <ul className="flex flex-col gap-3 list-disc font-semibold text-base">
              <li>Compras y ventas ilimitadas Incluye facturación.</li>
              <li>Envios de facturas por whatshap y email.</li>
              <li>Stock de productos ilimitado.</li>
              <li>Clientes ilimitados.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white w-[1220px] border-[1px] border-black/20 rounded py-10 shadow shadow-black/10 mx-auto flex flex-row justify-around">
        <div className="space-y-5 border-r-[1px] border-black/10 w-full px-12">
          <p className="text-xl font-bold text-black">
            ¿Necesitás una solución sin límites? Este plan es para vos.
          </p>
          <ul className="flex flex-col gap-3 list-disc font-semibold text-base pl-4 text-secondary">
            <li>Compras y ventas ilimitadas Incluye facturación.</li>
            <li>Envios de facturas por whatshap y email.</li>
            <li>Stock de productos ilimitado.</li>
            <li>Clientes ilimitados.</li>
          </ul>
        </div>
        <div className="flex justify-center items-center w-full">
          <button
            type="button"
            className="text-secondary bg-white border-[1px] border-secondary/50 py-2 px-5 rounded text-xl font-bold shadow  text-center"
          >
            ¡Quiero saber mas!
          </button>
        </div>
      </div>
    </section>
  );
};
