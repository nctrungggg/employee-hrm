import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../configs/routes";
import { ACCESS_TOKEN_KEY } from "../constants/constants";

export function PrivateRoutes() {
  const authToken = Cookies.get(ACCESS_TOKEN_KEY);

  return authToken ? (
    <Outlet />
  ) : (
    <Navigate to={`${ROUTES.auth}/${ROUTES.signIn}`} />
  );
}
