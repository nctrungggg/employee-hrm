import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../app/store";
import { ROUTES } from "../../../../configs/routes";
import { ForgotPasswordForm } from "../../../../modules/auth/components/forgotPasswordForm/ForgotPasswordForm";
import { forgotPassword } from "../../../../modules/auth/redux/authSlice";

export function ForgotPasswordPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleForgotPassword = async (email: string) => {
    const resultAction = await dispatch(forgotPassword(email));
    unwrapResult(resultAction);

    navigate(`${ROUTES.auth}/${ROUTES.signIn}`);
  };

  return <ForgotPasswordForm onForgotPassword={handleForgotPassword} />;
}
