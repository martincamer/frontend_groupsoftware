import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import poppinsBold from "../fonts/Montserrat-Bold.ttf";
import poppinsSemiBold from "../fonts/Montserrat-SemiBold.ttf";
import poppinsRegular from "../fonts/Montserrat-Regular.ttf";

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: poppinsRegular,
    },
    {
      src: poppinsSemiBold,
      fontWeight: "semibold",
    },
    {
      src: poppinsBold,
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  table: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "95%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    // borderTop: "0.5px solid #9f99a3",
    borderBottom: "0.5px solid #9f99a3",
    width: "100%",
  },
  rowTwo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderBottom: "0.5px solid #9f99a3",
    width: "100%",
  },
  content_row: {
    // borderTop: "0.7px solid #000",
    // borderBottom: "0.7px solid #000",
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingHorizontal: "10px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "10px",
    // borderRadius: 3,
  },
  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  // So Declarative and unDRY 👌
  row1: {
    width: "100%",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    fontSize: "7px",
    fontFamily: "Montserrat",
    fontWeight: "semibold",
    color: "#725AC1",
    textTransform: "uppercase",
  },
  row4: {
    width: "100%",
    fontSize: "6px",
    fontFamily: "Montserrat",
    fontWeight: "normal",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    textTransform: "uppercase",
  },
  contentFactura: {
    width: "90%",
    margin: "0 auto",
    paddingTop: "50px",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  content_uno: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    border: "0.5px solid #9f99a3",
    padding: "10px",
    // borderRadius: "3px",
  },
  contentFinal: {
    width: "80%",
    margin: "0 auto",
    paddingTop: "50px",
    paddingBottom: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "5px",
  },
  content: {
    display: "flex",
    gap: "20px",
    height: "100%",
    width: "100%",
  },
  content_page: {
    height: "100%",
    width: "100%",
    border: "1px solid black",
    borderRadius: "4px",
  },
  content_footer: {
    width: "98%",
    margin: "0 auto",
    padding: "10px",
    width: "95%",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    borderRadius: 2,
  },
});

export const DescargarPresupuesto = ({ datosFacturar, unicoPresupuesto }) => {
  // console.log(unicoPresupuesto?.clientes);
  return (
    <Document style={styles.content}>
      <Page style={styles.content}>
        <View style={styles.contentFactura}>
          <View style={styles.content_uno}>
            <Text
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                fontFamily: "Montserrat",
                textTransform: "capitalize",
                color: "#725AC1",
              }}
            >
              {datosFacturar[0]?.nombre}
            </Text>
            <View
              style={{
                fontSize: "7px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: "3px",
                fontFamily: "Montserrat",
                fontWeight: "semibold",
              }}
            >
              <Text>+{datosFacturar[0]?.telefono}</Text>
            </View>
            <View
              style={{
                fontSize: "7px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: "3px",
                fontFamily: "Montserrat",
                fontWeight: "semibold",
                textTransform: "capitalize",
              }}
            >
              <Text>{datosFacturar[0]?.email}</Text>
            </View>
            <View
              style={{
                fontSize: "8px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                gap: "20px",
              }}
            >
              <View
                style={{
                  fontSize: "8px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "3px",
                }}
              >
                <Text
                  style={{
                    fontSize: "7px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: "3px",
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    textTransform: "capitalize",
                  }}
                >
                  {datosFacturar[0]?.direccion}
                </Text>
              </View>
              <View
                style={{
                  fontSize: "8px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "3px",
                }}
              >
                <Text
                  style={{
                    fontSize: "7px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: "3px",
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    textTransform: "capitalize",
                  }}
                >
                  {datosFacturar[0]?.localidad}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.content_uno}>
            <Text
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                fontFamily: "Montserrat",
                color: "#725AC1",
              }}
            >
              Presupuesto
            </Text>
            <View
              style={{
                marginBottom: "6px",
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "7px",
                }}
              >
                Número:{" "}
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "7px",
                    fontWeight: "bold",
                  }}
                >
                  {unicoPresupuesto?.id}
                </Text>
              </Text>
            </View>
            <View
              style={{
                fontSize: "10px",
                textAlign: "center",
                borderBottom: "0.6px solid #000",
                // borderRadius: "3px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    width: "80px",
                    // padding: "10px",
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    fontSize: "8px",
                  }}
                >
                  {new Date()?.toLocaleDateString("arg")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.content_row}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              <Text
                style={{
                  fontSize: "7px",
                  fontFamily: "Montserrat",
                  fontWeight: "semibold",
                  textTransform: "uppercase",
                }}
              >
                Señor/es:
              </Text>{" "}
              <Text
                style={{
                  fontSize: "7px",
                  fontFamily: "Montserrat",
                  textTransform: "uppercase",
                }}
              >
                {unicoPresupuesto?.clientes?.nombre}{" "}
                {unicoPresupuesto?.clientes?.apellido}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              <Text
                style={{
                  fontSize: "7px",
                  fontFamily: "Montserrat",
                  fontWeight: "semibold",
                  textTransform: "uppercase",
                }}
              >
                Localidad
              </Text>{" "}
              <Text
                style={{
                  fontSize: "7px",
                  textTransform: "uppercase",
                  fontFamily: "Montserrat",
                }}
              >
                {unicoPresupuesto?.clientes?.localidad}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.row1}>Cantidad</Text>
            <Text style={styles.row1}>Codigo</Text>
            <Text style={styles.row1}>Kilos</Text>
            <Text style={styles.row1}>Categoria</Text>
            <Text style={styles.row1}>Color</Text>
            <Text style={styles.row1}>Detalle</Text>
          </View>

          {unicoPresupuesto?.productos?.respuesta.map((p) => (
            <View key={p.nobmre} style={styles.rowTwo}>
              <Text style={styles.row4}>{p.barras}</Text>
              <Text style={styles.row4}>{p.nombre}</Text>
              <Text style={styles.row4}>
                {p.totalKG.toLocaleString("arg", {
                  minimumFractionDigits: 2,
                })}
              </Text>
              <Text style={styles.row4}>{p.categoria}</Text>
              <Text style={styles.row4}>{p.color}</Text>
              <Text style={styles.row4}>{p.detalle}</Text>
            </View>
          ))}
        </View>

        <View style={styles.content_footer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
            }}
          >
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Montserrat",
                fontWeight: "semibold",
                textTransform: "uppercase",
              }}
            >
              Total de kg:
            </Text>
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Montserrat",
                textTransform: "uppercase",
                fontWeight: "bold",
                color: "#725AC1",
              }}
            >
              {unicoPresupuesto?.estadistica?.total_kg?.toLocaleString("arg", {
                minimumFractionDigits: 2,
              })}{" "}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
            }}
          >
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Montserrat",
                fontWeight: "semibold",
                textTransform: "uppercase",
                // color: "#725AC1",
              }}
            >
              Total de barras:
            </Text>
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Montserrat",
                textTransform: "uppercase",
                fontWeight: "bold",
                color: "#725AC1",
              }}
            >
              {unicoPresupuesto?.estadistica?.total_barras}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
            }}
          >
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Montserrat",
                fontWeight: "semibold",
                textTransform: "uppercase",
                // fontWeight: "bold",
                // color: "#725AC1",
              }}
            >
              Total a pagar:
            </Text>
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Montserrat",
                textTransform: "uppercase",
                fontWeight: "bold",
                color: "#725AC1",
              }}
            >
              {unicoPresupuesto?.estadistica?.total_pagar?.toLocaleString(
                "es-ar",
                {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                }
              )}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
