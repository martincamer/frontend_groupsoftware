import { PDFViewer } from "@react-pdf/renderer";
import { FacturaViewPresupuesto } from "../../../components/ui/FacturaViewPresupuesto";
import { useFacturarDatosContext } from "../../../context/FacturaDatosProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../../../api/axios";

export const FacturaView = () => {
  const { datosFacturar } = useFacturarDatosContext();

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const [datos, setDatos] = useState([]);

  const params = useParams();
  const unico = params.numero;

  useEffect(() => {
    async function loadData() {
      const res = await client.get(`/facturacion/${unico}`);

      setDatos(res.data);
    }
    loadData();
  }, [unico]);

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <FacturaViewPresupuesto
        datosFacturar={datosFacturar}
        getRandomInt={getRandomInt}
        unicoPresupuesto={datos}
      />
    </PDFViewer>
  );
};
