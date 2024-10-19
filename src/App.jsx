import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Login } from "./routes/pages/Login";
import { HomeApp } from "./routes/pages/protected/HomeApp";
import { Productos } from "./routes/pages/protected/Productos";
import { Clientes } from "./routes/pages/protected/Clientes";
import { ProfilePage } from "./routes/pages/protected/ProfilePage";
import { NotFound } from "./routes/pages/protected/NotFound";
import { useAuth } from "./context/AuthProvider";
import { Navbar } from "./components/Navbar";
import { AluminioProvider } from "./context/AluminioProvider";
import { Sidebar } from "./components/ui/Sidebar";
import { Presupuestos } from "./routes/pages/protected/Presupuestos";
import { VentasRealizadas } from "./routes/pages/protected/VentasRealizadas";
import { ClientesProvider } from "./context/ClientesProvider";
import { PresupuestoProvider } from "./context/PresupuestoProvider";
import { FacturaView } from "./routes/pages/protected/FacturaView";
import { DatosFacturacion } from "./routes/pages/protected/DatosFacturacion";
import { FacturarDatosProvider } from "./context/FacturaDatosProvider";
import { Estadistica } from "./routes/pages/protected/Estadistica";
import { FacturaProvider } from "./context/FacturaProvider";
import { FacturaViewVenta } from "./routes/pages/protected/FacturaViewVenta";
import { FacturaVentaDocumentHTML } from "./routes/pages/protected/FacturaVentaDocumentHTML";
import { FacturaPresupuestoDocumentHTML } from "./routes/pages/protected/FacturaPresupuestoDocumentHTML";
import { PasswordChange } from "./routes/pages/PasswordChange";
import { VentasRegistradas } from "./routes/pages/protected/VentasRegistradas";
//IMPORTS
import RutaProtegida from "./layouts/RutaProtejida";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { Register } from "./routes/pages/Register";
import { Cliente } from "./routes/pages/protected/Cliente";
import { Accesorios } from "./routes/pages/protected/Accesorios";
import { AccesoriosProvider } from "./context/AccesoriosProvider";
import { VentasAccesorios } from "./routes/pages/protected/VentasAccesorios";

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={<RutaProtegida isAllowed={!isAuth} redirectTo={"/home"} />}
          >
            <Route path="/" element={<Login />} />
            <Route path="/registrar-usuario-app" element={<Register />} />
            <Route path="/password-change" element={<PasswordChange />} />
          </Route>
          <Route
            element={<RutaProtegida isAllowed={isAuth} redirectTo={"/"} />}
          >
            <Route
              element={
                <AluminioProvider>
                  <ClientesProvider>
                    <PresupuestoProvider>
                      <FacturarDatosProvider>
                        <FacturaProvider>
                          <AccesoriosProvider>
                            <main className="w-full h-full">
                              <Navbar />
                              {/* <Sidebar /> */}
                              <Outlet />
                            </main>
                          </AccesoriosProvider>
                        </FacturaProvider>
                      </FacturarDatosProvider>
                    </PresupuestoProvider>
                  </ClientesProvider>
                </AluminioProvider>
              }
            >
              <Route path="/home" element={<HomeApp />} />
              <Route path="productos" element={<Productos />} />
              <Route path="accesorios" element={<Accesorios />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="cliente/:id" element={<Cliente />} />
              <Route path="presupuestos" element={<Presupuestos />} />
              <Route path="ventas-clientes" element={<VentasRealizadas />} />
              <Route
                path="ventas-clientes-accesorios"
                element={<VentasAccesorios />}
              />
              <Route path="datos-facturacion" element={<DatosFacturacion />} />
              <Route path="view-factura/:numero" element={<FacturaView />} />
              <Route
                path="view-factura-venta/:numero"
                element={<FacturaViewVenta />}
              />
              <Route
                path="factura-venta/:numero"
                element={<FacturaVentaDocumentHTML />}
              />
              <Route
                path="filtrar-ventas-mes"
                element={<VentasRegistradas />}
              />
              <Route
                path="factura-presupuesto/:numero"
                element={<FacturaPresupuestoDocumentHTML />}
              />
              <Route path="estadistica-clientes" element={<Estadistica />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
