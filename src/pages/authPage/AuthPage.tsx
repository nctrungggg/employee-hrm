import { Outlet } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import { Footer } from "../../layouts/footer/Footer";

export function AuthPage() {
  return (
    <div className="mt-[50px] h-[100vh] w-[500px] m-auto items-center">
      <div className="mb-[35px]">
        <div className="m-auto mb-[10px] w-[100px] h-[100px] ">
          <img className="w-full h-full object-cover" src={logo} alt="logo" />
        </div>
        <h1 className="text-36 text-center text-textPrimary font-medium">
          HR Management System
        </h1>
      </div>

      <Outlet />
      <Footer />
    </div>
  );
}
