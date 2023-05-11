import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
// import { NavLink } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { InputLabel, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomInputSelect, {
  customPaperProps,
} from "../../../../components/customSelect/StyleSelect";
import Input from "../../../../components/input/Input";
import Label from "../../../../components/label/Label";
import { ROUTES } from "../../../../configs/routes";
import { ILoginParams } from "../../../../types/auth";
import { ICompanyParams } from "../../../../types/company";

export interface ISignInFormProps {
  onSubmitForm(values: ILoginParams): void;
  loading: boolean;
  companyList: ICompanyParams[];
}

export function SignInForm({
  companyList,
  onSubmitForm,
  loading,
}: ISignInFormProps) {
  const schema = Yup.object().shape({
    username: Yup.string().required("Please enter username"),
    password: Yup.string().required("Please enter password"),
    // .min(6, "Must input password between 8-16 characters"),
    factory: Yup.string().required("Please choose factory"),
  });

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      factory: null,
    },

    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSubmitSignIn = (values: ILoginParams): void => {
    if (!isValid) return;

    onSubmitForm(values);
  };

  const watchPassword = watch("password", "text");
  const watchFactory = watch("factory");

  return (
    <div>
      <h1 className=" text-center mb-[20px] text-36  text-textPrimary font-medium">
        Sign In
      </h1>

      <div className="w-[348px] m-auto shadow-md rounded-xl bg-bgrGray2 p-8">
        <form
          onSubmit={handleSubmit(handleSubmitSignIn as never)}
          autoComplete="off"
        >
          <div className="mb-[10px]">
            <Label htmlFor="username">Username :</Label>
            <Input
              className={
                errors.username && "!border-red1 !bg-red2 !border !border-solid"
              }
              type="text"
              name="username"
              control={control}
            />
            <p className="pt-[5px] px-[14px] text-red3 text-xs">
              {errors.username && errors.username.message}
            </p>
          </div>

          <div className="mb-[10px] ">
            <Label htmlFor="password">Password :</Label>
            <div className="relative">
              <Input
                className={
                  errors.password &&
                  "!border-red1 !bg-red2 !border !border-solid"
                }
                type={showPassword ? "text" : "password"}
                name="password"
                control={control}
              />

              {watchPassword == "" ? (
                <></>
              ) : (
                <button
                  type="button"
                  className="absolute right-3 top-[50%] translate-y-[-50%]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <RemoveRedEyeOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOffOutlinedIcon fontSize="small" />
                  )}
                </button>
              )}
            </div>
            <p className="pt-[5px] px-[14px] text-red3 text-xs">
              {errors.password && errors.password.message}
            </p>
          </div>

          <div>
            <Label htmlFor="factory">Factory :</Label>
            <>
              <Select
                displayEmpty
                className={` bg-bgrGray w-full h-[46px] border-none rounded-lg focus:outline-none appearance-none ${
                  errors.factory && watchFactory == null
                    ? "!border-red1 !bg-red2 !border !border-solid"
                    : ""
                }`}
                {...register("factory", {
                  required: "Please enter factory",
                })}
                input={<CustomInputSelect />}
                MenuProps={{
                  PaperProps: customPaperProps,
                }}
                IconComponent={ExpandLessIcon}
              >
                <InputLabel shrink={false} className="!hidden">
                  Select Factory
                </InputLabel>

                {companyList.map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.name}
                  </MenuItem>
                ))}
              </Select>

              {errors.factory && watchFactory == null && (
                <div className="text-red3 text-xs pt-[5px] px-[14px]">
                  {errors.factory.message}
                </div>
              )}
            </>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="cursor-pointer mt-[26px]  px-6 py-3 bg-bgrBlue rounded-md w-full h-12 block m-auto text-textGray"
          >
            {loading ? (
              <div>
                <svg
                  aria-hidden="true"
                  className="inline-block w-6 h-6 text-center text-white animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    className="text-slate-300"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p className=" text-center mt-4 mb-2 text-sm text-bgrBlue">
          <Link
            className="font-normal"
            to={`${ROUTES.auth}/${ROUTES.fortgotPassword}`}
          >
            Forgot Your Password?
          </Link>
        </p>
      </div>
    </div>
  );
}
