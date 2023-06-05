import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../configs/routes";
import { AuthPage } from "../pages/authPage/AuthPage";
import { ForgotPasswordPage } from "../pages/authPage/components/forgotPasswordPage/ForgotPasswordPage";
import { SignInPage } from "../pages/authPage/components/signInPage/SignInPage";
import { EmployeePage } from "../pages/employeePage/EmployeePage";
import { PrivateRoutes } from "./PrivateRoutes";
import { CreateEmployeePage } from "../pages/employeePage/createEmployeePage/CreateEmployeePage";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const Router = () => {
  const authToken = useSelector((state: RootState) => state.auth.authToken);

  function requireNoToken() {
    if (authToken) {
      return <Navigate to={ROUTES.employee} replace />;
    }

    return null;
  }

  return (
    <Routes>
      <Route path={ROUTES.auth} element={<AuthPage />}>
        <Route
          path={ROUTES.signIn}
          element={requireNoToken() || <SignInPage />}
        ></Route>
        <Route
          path={ROUTES.fortgotPassword}
          element={<ForgotPasswordPage />}
        ></Route>
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path={ROUTES.employee} element={<EmployeePage />}></Route>
        <Route
          path={`${ROUTES.employee}/${ROUTES.createOrUpdate}`}
          element={<CreateEmployeePage />}
        ></Route>
        <Route
          path={`${ROUTES.employee}/${ROUTES.createOrUpdate}/:id`}
          element={<CreateEmployeePage />}
        ></Route>
      </Route>
    </Routes>
  );
};
