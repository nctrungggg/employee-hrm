import { useDispatch } from "react-redux";
import { ForgotPasswordForm } from "../../../../modules/auth/components/forgotPasswordForm/ForgotPasswordForm";
import { forgotPassword } from "../../../../modules/auth/redux/authSlice";
import { AppDispatch } from "../../../../app/store";
import { unwrapResult } from "@reduxjs/toolkit";

export function ForgotPasswordPage() {
  const dispatch = useDispatch<AppDispatch>();

  const handleForgotPassword = async (email: string) => {
    const resultAction = await dispatch(forgotPassword(email));
    unwrapResult(resultAction);
  };

  return <ForgotPasswordForm onForgotPassword={handleForgotPassword} />;
}
