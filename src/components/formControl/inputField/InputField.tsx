import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment-timezone";
import { ChangeEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";
import * as Yup from "yup";
import datePickerSvg from "../../../assets/datePicker.svg";
import { Box } from "@mui/material";

export interface IInputFieldProps {
  label: string;
  isRequired?: boolean;
  name: string | any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  type: string;
  isRp?: boolean;
  upload?: boolean;
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
}: IInputFieldProps) {
  const schema = Yup.object().shape({
    name: Yup.string().required("Please input Name"),
    gender: Yup.string().required("Please input Gender"),
    ktp_no: Yup.string().required("Please input KTP No"),
    nc_id: Yup.string().required("Please input National CardID"),

    basic_salary: Yup.number()
      .typeError("Please input Salary")
      .required("Please input Salary")
      .min(1, "Please input Salary"),

    audit_salary: Yup.number()
      .typeError("Please input Salary")
      .required()
      .min(1, "Please input Salary (Audit)"),

    safety_insurance: Yup.number()
      .typeError("Please input Salary")
      .required()
      .min(1, "Please input Safety Insurance Amount"),

    meal_allowance: Yup.number()
      .typeError("Please input Salary")
      .required()
      .min(1, "Please input Meal Allowance"),
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isValueCheck, setIsValueCheck] = useState([name]);
  const {
    control,
    register,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });


  const handleDateChange = (date: Date | null) => {
    // const dateString = moment(date).format("YYYY/MM/DD");
    // const formattedDate = dateString.replace(/\//g, "-");

    setSelectedDate(date);
  };

  useEffect(() => {
    // Kiểm tra lỗi khi ô input blur
    trigger(name);
  }, [name, trigger]);

  const handleCheckValidateValue = () => {
    setIsValueCheck((prevValues) => ({ ...prevValues, [name]: value }));
    trigger(name);
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
            <span className={`isRequired text-required font-normal `}>*</span>
          ) : (
            ""
          )}
        </label>

        {type === "date" ? (
          <div className="relative">
            <DatePicker
              // showYearDropdown
              name={name}
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy/MM/dd"
              isClearable
              className="input-type-date h-12 min-w-290 "
            ></DatePicker>
            <span className="absolute top-[1.35rem] left-5">
              <img src={datePickerSvg} className="w-7" alt="" />
            </span>
            <span className="absolute top-6 right-3">
              <MdKeyboardArrowDown size={16} />
            </span>
          </div>
        ) : isRp ? (
          <div className=" flex items-center">
            <div>
              <div className="relative">
                <span
                  style={{ zIndex: 20 }}
                  className="absolute text-16 text-[#006ADC] font-normal top-2/4 -translate-y-2/4 left-3"
                >
                  Rp
                </span>
                <Controller
                  control={control}
                  name={name}
                  render={({ field }) => (
                    <input
                      {...field}
                      {...register(name, { required: true })}
                      className={` input-type !text-16 !pl-14 h-12 min-w-290 max-w-300 
                  ${
                    isRequired &&
                    (isValueCheck[name] === "" ||
                      Number(isValueCheck[name]) < 0) &&
                    errors[name]?.message &&
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
              {isRequired && errors[name]?.message && (
                <p className="pt-[5px] px-[14px] text-red3 text-xs">
                  {isValueCheck[name] === ""
                    ? errors[name]?.message?.toString()
                    : Number(isValueCheck[name]) < 0
                    ? "Please input value min is 0"
                    : null}
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
                      isValueCheck[name] === "" &&
                      errors[name]?.message &&
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
            {isRequired &&
              isValueCheck[name] === "" &&
              errors[name]?.message &&
              !value && (
                <p className="pt-[5px] px-[14px] text-red3 text-xs">
                  {errors[name]?.message?.toString()}
                </p>
              )}
          </div>
        ) : (
          <div className="flex flex-col">
            <input
              type={type}
              onChange={onChange}
              value={value}
              name={name}
              className={`input-type h-12 min-w-290 max-w-300  ${
                upload && "max-w-[230px]"
              }`}
            />
          </div>
        )}
      </div>
    </Box>
  );
}
