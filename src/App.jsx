import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtejida";
import { HomePage } from "./routes/pages/HomePage";
import { Login } from "./routes/pages/Login";
import { Register } from "./routes/pages/Register";
import { PasswordChange } from "./routes/pages/PasswordChange";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {/* <ProyectosProvider> */}
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="password-change" element={<PasswordChange />} />
            </Route>

            <Route path="/martin/home" element={<RutaProtegida />}>
              {/* <Route index element={<Proyectos />} />
              <Route path="crear-proyecto" element={<NuevoProyecto />} />
              <Route
                path="nuevo-colaborador/:id"
                element={<NuevoColaborador />}
              />
              <Route path=":id" element={<Proyecto />} />
              <Route path="editar/:id" element={<EditarProyecto />} /> */}
            </Route>
          </Routes>
          {/* </ProyectosProvider> */}
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
