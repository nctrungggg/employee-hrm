import { ReactNode } from "react";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import Sidebar from "../components/sidebar/Sidebar";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../constants/constants";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const authToken = Cookies.get(ACCESS_TOKEN_KEY);

  if (!authToken) return <>{children}</>;

  return (
    <>
      <Header />
      <div className="flex">
        <div className="w-[330px] fixed left-0 bg-white shadow-md">
          <Sidebar />
        </div>
        <div>{children}</div>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
