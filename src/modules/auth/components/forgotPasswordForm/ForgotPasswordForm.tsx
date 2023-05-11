import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Input from "../../../../components/input/Input";
import Label from "../../../../components/label/Label";
import { ROUTES } from "../../../../configs/routes";

export interface IForgotPasswordFormProps {
  onForgotPassword: (email: string) => void;
}

export function ForgotPasswordForm({
  onForgotPassword,
}: IForgotPasswordFormProps) {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Email format is invalid")
      .required("Please enter your email"),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      email: "",
    },

    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleForgotPassword = (email: string): void => {
    if (!isValid) return;
    onForgotPassword(email);
  };

  return (
    <div>
      <h1 className=" text-center mb-[85px] text-36  text-textPrimary font-medium">
        Forgot password
      </h1>
      <div className="w-[348px] m-auto shadow-md rounded-xl bg-bgrGray2 p-8">
        <form
          onSubmit={handleSubmit(handleForgotPassword as never)}
          autoComplete="off"
        >
          <div className="mb-[10px]">
            <Label htmlFor="username">Your work email :</Label>
            <Input
              className={
                errors.email && "!border-red1 !bg-red2 !border !border-solid"
              }
              type="email"
              name="email"
              control={control}
            />
            <p className="pt-[5px] px-[14px] text-red3 text-xs">
              {errors.email && errors.email.message}
            </p>
          </div>

          <button
            type="submit"
            className="cursor-pointer mt-[26px]  px-6 py-3 bg-bgrBlue rounded-md w-full h-12 block m-auto text-textGray"
          >
            Confirm & Send OTP
          </button>
        </form>
        <p className=" text-center mt-4 mb-2 text-sm text-bgrBlue">
          <Link className="font-normal" to={`${ROUTES.auth}/${ROUTES.signIn}`}>
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
