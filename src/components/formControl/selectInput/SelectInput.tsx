/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import ExpandLessIcon from "@mui/icons-material/ExpandMore";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { IMarriageStatusParams } from "../../../types/employee";
import CustomInputSelect, {
  customPaperProps,
} from "../../customSelect/StyleSelect";

export interface ISelectInputProps {
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  value?: string | any;
  onChange?: (event: SelectChangeEvent) => void;
  name: string;
  className?: string;
  isNa?: boolean;
  dataList: object[];
  isType?: boolean;
  disabled?: boolean;
}

export function SelectInput({
  label,
  name,
  dataList,
  placeholder,
  isRequired,
  isNa,
  value,
  isType,
  className,
  disabled,
  onChange,
}: ISelectInputProps) {
  const schema = Yup.object().shape({
    gender: Yup.string().oneOf(
      ["male", "female"],
      "Please select a valid gender"
    ),
  });

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  
  const [isValue, setIsValue] = useState(false);

  const handleSelectBlur = () => {
    setIsValue(!String(value));
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 h-12">
        <label
          htmlFor={label}
          className="font-normal text-16 text-textPrimary min-w-[162px] flex"
        >
          {label}
          {isRequired && (
            <span className="text-required font-light leading-none isRequired text-lg">
              *{" "}
            </span>
          )}
        </label>
        <Select
          disabled={disabled}
          {...register(name, { required: true })}
          displayEmpty
          className={`${className} ${
            disabled && "!text-[#687076] !bg-[#e1e1e1]"
          } ${
            value && "custom-color-select"
          } bg-bgrGray w-full h-[46px] border-none rounded-lg focus:outline-none appearance-none ${
            isValue &&
            isRequired &&
            "!border-red1 !bg-red2 !border !border-solid select-err"
          } ${isType && "!w-[250px]"}`}
          id={name}
          input={<CustomInputSelect />}
          MenuProps={{
            PaperProps: customPaperProps,
          }}
          IconComponent={ExpandLessIcon}
          onChange={onChange}
          onBlur={handleSelectBlur}
          name={name}
          value={value}
          error={Boolean(errors[name])}
          defaultValue={isNa ? "" : undefined}
          renderValue={(selected: any) => {
            if (selected === "" || selected === undefined) {
              return placeholder;
            }
            const selectedItem = dataList.find(
              (item: any) => item?.id === selected
            ) as IMarriageStatusParams;

            return selectedItem?.name;
          }}
        >
          <InputLabel shrink={false} className="!hidden">
            {placeholder}
          </InputLabel>

          {isNa && <MenuItem value={"gender"}>N/A</MenuItem>}

          {dataList.map((item: any) => (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      {
        <div className="text-red3 text-xs pt-[5px] px-[14px]">
          {errors[name]?.message?.toString()}
        </div>
      }
    </div>
  );
}
