/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import Sidebar from "../components/sidebar/Sidebar";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import authApi from "../api/authApi";
import { logout } from "../modules/auth/redux/authSlice";
import { useNavigate } from "react-router";
import { ROUTES } from "../configs/routes";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const authToken = useSelector((state: RootState) => state.auth.authToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const tokenTimeout = setTimeout(() => {
  //     (async () => {
  //       if (authToken) {
  //         await authApi.logout();
  //         dispatch(logout());

  //         navigate(`${ROUTES.auth}/${ROUTES.signIn}`);
  //       }
  //     })();
  //   }, 100000);
  //   return () => {
  //     clearTimeout(tokenTimeout);
  //   };
  // }, [authToken, dispatch, navigate]);

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
