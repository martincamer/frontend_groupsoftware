import { useEffect, useState } from "react";
import { BiDownload, BiEdit, BiFile, BiSend } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { obtenerFactura } from "../../../api/factura.api";
import { useFacturarDatosContext } from "../../../context/FacturaDatosProvider";
import { FacturaDocumentDonwload } from "../../../components/FacturaDocumentDonwload";

export const FacturaVentaDocumentHTML = () => {
  const [datos, setDatos] = useState([]);

  const { datosFacturar } = useFacturarDatosContext();

  const params = useParams();

  useEffect(() => {
    async function loadData() {
      const res = await obtenerFactura(params.numero);

      setDatos(res.data);
    }
    loadData();
  }, []);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function dateTime(data) {
    return new Date(data).toLocaleDateString("arg", options);
  }

  return (
    <section className="py-[50px] mx-auto w-full flex flex-col gap-10 h-full">
      <div className="w-[1220px] mx-auto space-y-3">
        <div>
          <p className="font-bold text-3xl text-secondary">
            Factura de venta{" "}
            <span className="text-black font-extrabold">0000-{datos?.id}</span>
          </p>
        </div>

        <div className="space-x-2 flex">
          <button className="bg-gray-50 px-4 py-1 rounded border-[1px] border-black/20 text-secondary font-medium text-sm flex items-center gap-1 hover:shadow hover:shadow-black/10 transition-all ease-in-out">
            <BiSend /> enviar factura
          </button>
          <button className="bg-gray-50 px-4 py-1 rounded border-[1px] border-black/20 text-secondary font-medium text-sm flex items-center gap-1 hover:shadow hover:shadow-black/10 transition-all ease-in-out">
            <BiDownload />{" "}
            <PDFDownloadLink
              fileName={`${datos?.clientes?.nombre}_${datos?.clientes?.apellido}_000111${datos?.id}`}
              document={
                <FacturaDocumentDonwload
                  datos={datos}
                  datosFacturar={datosFacturar}
                />
              }
            >
              descargar factura
            </PDFDownloadLink>
          </button>
          <button className="bg-gray-50 px-4 py-1 rounded border-[1px] border-black/20 text-secondary font-medium text-sm flex items-center gap-1 hover:shadow hover:shadow-black/10 transition-all ease-in-out">
            <BiFile />{" "}
            <Link to={`/view-factura-venta/${datos.id}`}>ver factura</Link>
          </button>
          <button className="bg-gray-50 px-4 py-1 rounded border-[1px] border-black/20 text-secondary font-medium text-sm flex items-center gap-1 hover:shadow hover:shadow-black/10 transition-all ease-in-out">
            <BiEdit /> editar
          </button>
        </div>

        <div className="bg-white border-[1px] border-black/20 shadow-md shadow-black/20 rounded px-6 py-6 flex justify-around items-center">
          <div className="flex flex-col gap-2">
            <p className="text-base uppercase font-semibold text-green-500 text-center">
              Total Facturado
            </p>
            <p className="text-md font-bold text-center">
              {Number(datos?.estadistica?.total_pagar).toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base uppercase font-semibold text-green-500 text-center">
              Cobrado
            </p>
            <p className="text-sm font-bold text-center">-</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base uppercase font-semibold text-green-500 text-center">
              Por cobrar
            </p>
            <p className="text-md font-bold text-center">
              {" "}
              {Number(datos?.estadistica?.total_pagar).toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="py-10 px-10 bg-white border-[1px] border-black/20 w-[1220px] mx-auto shadow-md shadow-black/20 rounded space-y-10">
        <div className="flex flex-col text-center space-y-1 w-full relative">
          <p className="font-extrabold text-xl text-secondary capitalize">
            {datosFacturar[0]?.nombre}
          </p>
          <p className="text-base text-gray-600">
            + {datosFacturar[0]?.telefono}
          </p>
          <p className="text-gray-600">{datosFacturar[0]?.email}</p>
          <div className="absolute right-0">
            <span className="text-secondary font-extrabold text-2xl">No.</span>{" "}
            0000-{datos?.id}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="border-b-[1px] border-black/20 flex justify-between px-6 pb-4">
            <div className="flex gap-3 items-center">
              <p className="font-bold">Cliente</p>
              <p className="font-light text-gray-700 text-sm capitalize">
                {datos?.clientes?.nombre}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="font-bold">Creacion</p>
              <p className="font-light text-gray-700 text-sm">
                {dateTime(datos?.created_at)}
              </p>
            </div>
          </div>
          <div className="border-b-[1px] border-black/20 flex justify-between px-6 py-4">
            <div className="flex gap-3 items-center">
              <p className="font-bold">Dni</p>
              <p className="font-light text-gray-700 text-sm">
                {" "}
                {datos?.clientes?.dni}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="font-bold">Vencimiento</p>
              <p className="font-light text-gray-700 text-sm">
                {dateTime(datos?.created_at)}
              </p>
            </div>
          </div>
          <div className="border-b-[1px] border-black/20 flex justify-between px-6 py-4">
            <div className="flex gap-3 items-center">
              <p className="font-bold">Telefono</p>
              <p className="font-light text-gray-700 text-sm">
                {" "}
                +{datos?.clientes?.telefono}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="font-bold">Plazo de pago</p>
              <p className="font-light text-gray-700 text-sm">-</p>
            </div>
          </div>
        </div>

        <table className="border-[1px] p-[5px] table-auto w-full rounded">
          <thead>
            <tr className="bg-gray-100 uppercase text-sm">
              <th className="p-3">Cant.</th>
              <th className="p-3">Cod.</th>
              <th className="p-3">Kg</th>
              <th className="p-3">Cat.</th>
              <th className="p-3">Color</th>
              <th className="p-3">Detalle</th>
              <th className="p-3">Precio total por barras</th>
            </tr>
          </thead>
          <tbody>
            {datos?.productos?.respuesta.map((p, index) => (
              <tr className="uppercase text-sm" key={index}>
                <th className="border-[1px] border-gray-300 p-3 text-gray-600  w-[20px] font-normal">
                  {p.barras}
                </th>
                <th className="border-[1px] border-gray-300 p-3 text-gray-600 font-normal">
                  {p.nombre}
                </th>
                <th className="border-[1px] border-gray-300 p-3 text-gray-600 font-normal">
                  {Number(p.totalKG).toLocaleString("es-ar", {
                    minimumFractionDigits: 2,
                  })}
                </th>
                <th className="border-[1px] border-gray-300 p-3 text-gray-600 font-normal">
                  {p.categoria}
                </th>
                <th className="border-[1px] border-gray-300 p-3 text-gray-600 font-normal">
                  {p.color}
                </th>
                <th className="border-[1px] border-gray-300 p-3 text-gray-600 font-normal">
                  {p.detalle}
                </th>
                <th className="border-[1px] border-gray-300 p-3 text-secondary font-semibold">
                  {Number(p.totalPrecioUnitario).toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col gap-2 items-end w-full px-12">
          <div className="flex gap-6 border-b-[1px] border-black/20">
            <div className="pb-2">
              <p className="font-bold">Subtotal</p>{" "}
              <p className="text-sm text-secondary font-semibold">
                {Number(datos?.estadistica?.total_pagar).toLocaleString(
                  "es-ar",
                  {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  }
                )}
              </p>
            </div>
            <div>
              <p className="font-bold">IVA (0%)</p>{" "}
              <p className="text-sm">$0</p>
            </div>
          </div>

          <div>
            <p className="font-medium  text-xl flex gap-2 items-center text-secondary">
              <span className="font-bold text-lg text-black">Total:</span>{" "}
              {Number(datos?.estadistica?.total_pagar).toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
