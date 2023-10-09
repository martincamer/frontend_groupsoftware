import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <main className="w-full h-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
