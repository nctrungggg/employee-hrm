import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { setErrorsInputEmployee } from "../../../modules/employee/redux/employeeSlice";

export interface IInputFieldProps {
  label: string;
  isRequired?: boolean;
  name: any;
  value: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  isRp?: boolean;
  upload?: boolean;
  className?: string;
  disabled?: boolean;
}

export function InputField({
  label,
  onChange,
  upload,
  value,
  name,
  isRp,
  isRequired,
  type,
  disabled,
  className,
}: IInputFieldProps) {
  const dispatch = useDispatch<AppDispatch>();
  const erorrsEmployee = useSelector(
    (state: RootState) => state.employee.errorsInputEmployee
  );

  const schema = yup.object().shape({
    name: yup.string().required("Please input Name"),
    // contract_name: yup.string().required("Please input Contract Name"),
    gender: yup.string().required("Please input Gender"),
    ktp_no: yup.string().required("Please input KTP No"),
    nc_id: yup.string().required("Please input National CardID"),

    basic_salary: yup
      .number()
      .typeError("Please input Salary")
      .required("Please input Salary")
      .min(1, "Please input Salary"),

    audit_salary: yup
      .number()
      .typeError("Please input Salary")
      .required()
      .min(1, "Please input Salary (Audit)"),

    safety_insurance: yup
      .number()
      .typeError("Please input Salary")
      .required()
      .min(1, "Please input Safety Insurance Amount"),

    meal_allowance: yup
      .number()
      .typeError("Please input Salary")
      .required()
      .min(1, "Please input Meal Allowance"),
  });

  const [isValueCheck, setIsValueCheck] = useState([name]);
  const {
    control,
    register,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  useEffect(() => {
    trigger(name);
  }, [name, trigger]);

  const handleCheckValidateValue = () => {
    setIsValueCheck((prevValues) => ({ ...prevValues, [name]: value }));
    trigger(name);

    dispatch(setErrorsInputEmployee(errors));
  };

  return (
    <Box component="div" className="form">
      <div className="flex items-center gap-2">
        <label
          htmlFor={label}
          className={`font-normal text-16 text-textPrimary ${
            type === "number" ? "min-w-[220px]" : "min-w-[160px]"
          }  ${upload && "min-w-[120px]"} flex`}
        >
          {label}
          {isRequired ? (
            <span
              className={`isRequired text-required font-light leading-none`}
            >
              *
            </span>
          ) : (
            ""
          )}
        </label>

        {isRp ? (
          <div className=" flex items-center">
            <div>
              <div className="relative">
                <span
                  style={{ zIndex: 20 }}
                  className={`absolute text-16  font-normal top-2/4 -translate-y-2/4 left-3  ${
                    isRequired &&
                    (!isValueCheck[name] || Number(isValueCheck[name]) < 0) &&
                    (value === "" || Number(value) < 0) &&
                    erorrsEmployee[name]
                      ? "text-bgrRed"
                      : "text-[#006ADC]"
                  } `}
                >
                  Rp
                </span>
                <Controller
                  control={control}
                  name={name}
                  render={({ field }) => (
                    <input
                      min="0"
                      {...field}
                      {...register(name, { required: true })}
                      className={` input-type !text-16 !pl-14 h-12 min-w-290 max-w-300 
                  ${
                    isRequired &&
                    (!isValueCheck[name] || Number(isValueCheck[name]) < 0) &&
                    (value === "" || Number(value) < 0) &&
                    erorrsEmployee[name] &&
                    "!border-red1 !bg-red2 !border !border-solid"
                  } input-type`}
                      style={{ zIndex: 10 }}
                      type={type}
                      value={value}
                      name={name}
                      onChange={onChange}
                      onBlur={handleCheckValidateValue}
                    />
                  )}
                />
              </div>
              {isRequired &&
                erorrsEmployee &&
                (value === "" || Number(value) < 0) && (
                  <p className="pt-[5px] px-[14px] text-red3 text-xs">
                    {!isValueCheck[name]
                      ? erorrsEmployee[name]
                      : "Please input value min is 0"}
                  </p>
                )}
            </div>
          </div>
        ) : isRequired ? (
          <div className="w-full ">
            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <input
                  {...field}
                  {...register(name, { required: true })}
                  className={`
                    ${
                      isRequired &&
                      !isValueCheck[name] &&
                      erorrsEmployee[name] &&
                      !value &&
                      "  !border-red1 !bg-red2 !border !border-solid"
                    } input-type`}
                  type={type}
                  value={value}
                  onChange={onChange}
                  onBlur={handleCheckValidateValue}
                />
              )}
            />
            {isRequired && erorrsEmployee && !value && (
              <p className="pt-[5px] px-[14px] text-red3 text-xs">
                {erorrsEmployee ? erorrsEmployee[name] : ""}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            <input
              disabled={disabled}
              type={type}
              onChange={onChange}
              value={value}
              name={name}
              className={`${className} ${
                disabled && "!text-[#687076] !bg-[#e1e1e1]"
              } input-type h-12 min-w-290 max-w-300"
              }`}
            />
          </div>
        )}
      </div>
    </Box>
  );
}
