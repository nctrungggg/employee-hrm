/* eslint-disable @typescript-eslint/no-explicit-any */
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { SignInForm } from "../../../../modules/auth/components/signInForm/SignInForm";
import { getCompany, signIn } from "../../../../modules/auth/redux/authSlice";
import { ILoginParams } from "../../../../types/auth";
import { ROUTES } from "../../../../configs/routes";
import { useNavigate } from "react-router-dom";

// export interface ISignInPageProps {}

export function SignInPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const companyList = useSelector((state: any) => state.auth.companyList);

  const handleSubmitForm = async (values: ILoginParams) => {
    try {
      const newValue = {
        ...values,
        company_id: values.factory,
      };

      setLoading(true);

      const resultAction = await dispatch(signIn(newValue));
      unwrapResult(resultAction);

      setLoading(false);

      navigate(ROUTES.employee);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const resultAction = await dispatch(getCompany());
      unwrapResult(resultAction);
    })();
  }, [dispatch]);

  return (
    <SignInForm
      companyList={companyList}
      onSubmitForm={handleSubmitForm}
      loading={loading}
    />
  );
}
