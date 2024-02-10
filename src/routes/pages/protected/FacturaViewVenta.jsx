import { PDFViewer } from "@react-pdf/renderer";
import { useFacturarDatosContext } from "../../../context/FacturaDatosProvider";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFacturaContext } from "../../../context/FacturaProvider";
import { FacturaViewFacturacion } from "../../../components/generar-factura/FacturaViewFacturacion";

export const FacturaViewVenta = ({}) => {
  const { datosFacturar } = useFacturarDatosContext();
  const { obtenerDatos, unicoPresupuesto } = useFacturaContext();

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const params = useParams();
  const unico = params.numero;

  useEffect(() => {
    obtenerDatos(unico);
  }, []);

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <FacturaViewFacturacion
        datosFacturar={datosFacturar}
        getRandomInt={getRandomInt}
        unicoPresupuesto={unicoPresupuesto}
      />
    </PDFViewer>
  );
};
