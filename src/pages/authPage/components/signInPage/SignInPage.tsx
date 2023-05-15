/* eslint-disable @typescript-eslint/no-explicit-any */
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authApi from "../../../../api/authApi";
import { AppDispatch } from "../../../../app/store";
import { ROUTES } from "../../../../configs/routes";
import { SignInForm } from "../../../../modules/auth/components/signInForm/SignInForm";
import { signIn } from "../../../../modules/auth/redux/authSlice";
import { ILoginParams } from "../../../../types/auth";

// export interface ISignInPageProps {}

export function SignInPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [companyList, setCompanyList] = useState([]);

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
      // location.href = "/employee";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const {
        data: { data: company },
      } = await authApi.getCompany();
      setCompanyList(company);
      console.log(company);
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
