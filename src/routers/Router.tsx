import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../configs/routes";
import { AuthPage } from "../pages/authPage/AuthPage";
import { ForgotPasswordPage } from "../pages/authPage/components/forgotPasswordPage/ForgotPasswordPage";
import { SignInPage } from "../pages/authPage/components/signInPage/SignInPage";
import { EmployeePage } from "../pages/employeePage/EmployeePage";
import { PrivateRoutes } from "../utils/PrivateRoutes";
import { CreateEmployeePage } from "../pages/employeePage/createEmployeePage/CreateEmployeePage";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.auth} element={<AuthPage />}>
        <Route path={ROUTES.signIn} element={<SignInPage />}></Route>
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
