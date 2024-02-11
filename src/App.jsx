import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HomePage } from "./routes/pages/HomePage";
import { Login } from "./routes/pages/Login";
import { Register } from "./routes/pages/Register";
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
import { Planes } from "./routes/pages/Planes";
import { Contacto } from "./routes/pages/Contacto";
import { Footer } from "./components/Footer";
import { FacturaProvider } from "./context/FacturaProvider";
import { FacturaViewVenta } from "./routes/pages/protected/FacturaViewVenta";
import { FacturaVentaDocumentHTML } from "./routes/pages/protected/FacturaVentaDocumentHTML";
//IMPORTS
import RutaProtegida from "./layouts/RutaProtejida";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { FacturaPresupuestoDocumentHTML } from "./routes/pages/protected/FacturaPresupuestoDocumentHTML";
import { PasswordChange } from "./routes/pages/PasswordChange";

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            element={<RutaProtegida isAllowed={!isAuth} redirectTo={"/home"} />}
          >
            {/* <Route path="/" index element={<HomePage />} /> */}
            <Route path="/" element={<Login />} />
            {/* <Route path="/register" element={<Register />} />
            <Route path="/planes" element={<Planes />} />
            <Route path="/contacto" element={<Contacto />} /> */}
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
                          <main className="flex gap-2 h-full">
                            <Sidebar />
                            <Outlet />
                          </main>
                        </FacturaProvider>
                      </FacturarDatosProvider>
                    </PresupuestoProvider>
                  </ClientesProvider>
                </AluminioProvider>
              }
            >
              <Route path="/home" element={<HomeApp />} />
              <Route path="productos" element={<Productos />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="presupuestos" element={<Presupuestos />} />
              <Route path="ventas-clientes" element={<VentasRealizadas />} />
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
