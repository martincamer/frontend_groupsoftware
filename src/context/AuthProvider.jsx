import { createContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const respusta = await axios.get(`http://localhost:1337/api/users`);
      setAuth(respusta.data);
    }
    loadData();
  }, []);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if ([username, password].includes("")) {
      setError(true);
    } else {
      try {
        await axios.post(`http://localhost:1337/api/users`, {
          data: {
            username: username,
            password: password,
          },
        });

        navigate("/app/home");
        //localStorage.getItem("email", email);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(auth);
  //   const [auth, setAuth] = useState({});
  //   const [cargando, setCargando] = useState(true);

  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const autenticarUsuario = async () => {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         setCargando(false);
  //         return;
  //       }

  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };

  //       try {
  //         const { data } = await clienteAxios("/usuarios/perfil", config);
  //         setAuth(data);
  //         // navigate('/proyectos')
  //       } catch (error) {
  //         setAuth({});
  //       }

  //       setCargando(false);
  //     };
  //     autenticarUsuario();
  //   }, []);

  //   const cerrarSesionAuth = () => {
  //     setAuth({});
  //   };

  return (
    <AuthContext.Provider
      value={{
        // auth,
        // setAuth,
        // cargando,
        // cerrarSesionAuth,
        handleSubmitLogin,
        username,
        password,
        setUsername,
        setPassword,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
