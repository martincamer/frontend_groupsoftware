import { PDFViewer } from "@react-pdf/renderer";
import { FacturaViewPresupuesto } from "../../../components/ui/FacturaViewPresupuesto";
import { useFacturarDatosContext } from "../../../context/FacturaDatosProvider";
import { usePresupuestoContext } from "../../../context/PresupuestoProvider";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const FacturaView = ({}) => {
  const { datosFacturar } = useFacturarDatosContext();
  const { obtenerDatos, unicoPresupuesto } = usePresupuestoContext();

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
      <FacturaViewPresupuesto
        datosFacturar={datosFacturar}
        getRandomInt={getRandomInt}
        unicoPresupuesto={unicoPresupuesto}
      />
    </PDFViewer>
  );
};
