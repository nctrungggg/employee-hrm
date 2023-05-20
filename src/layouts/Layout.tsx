/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Sidebar from "../components/sidebar/Sidebar";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const authToken = useSelector((state: RootState) => state.auth.authToken);

  return (
    <>
      {authToken ? (
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
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Layout;
