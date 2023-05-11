import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../configs/routes";
import { AuthPage } from "../pages/authPage/AuthPage";
import { ForgotPasswordPage } from "../pages/authPage/components/forgotPasswordPage/ForgotPasswordPage";
import { SignInPage } from "../pages/authPage/components/signInPage/SignInPage";
import { EmployeePage } from "../pages/employeePage/EmployeePage";

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
      <Route path={ROUTES.employee} element={<EmployeePage />}></Route>
    </Routes>
  );
};
