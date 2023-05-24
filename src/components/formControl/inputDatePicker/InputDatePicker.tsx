import Box from "@mui/material/Box";
import React, { ChangeEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment-timezone";
import datePicker from "../../../assets/datePicker.svg";
interface IInputDatePickerProps {
  label: string;
  isRequired?: boolean;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  type: string;
  isRp?: boolean;
  upload?: boolean;
  handleDateChangeProps: (date: string | null) => void;
}

const InputDatePicker = (props: IInputDatePickerProps) => {
  const {
    label,
    upload,
    onChange,
    handleDateChangeProps,
    value,
    name,
    isRp,
    isRequired,
    type,
  } = props;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isValue, setIsValue] = useState(true);

  const handleDateChange = (date: Date | null) => {
    const dateString = moment(date).format("YYYY/MM/DD");
    console.log(dateString);

    // const formattedDate = dateString.replace(/\//g, "-");

    setSelectedDate(date);

    if (name === "dob") {
      handleDateChangeProps(dateString !== "Invalid date" ? dateString : "");
    }
  };

  const handleDateBlur = () => {
    if (!selectedDate) {
      setIsValue(false);
    } else {
      setIsValue(true);
    }
  };

  return (
    <Box component="form" className="form" noValidate autoComplete="off">
      <div className="flex  items-center h-12 gap-2">
        <label
          htmlFor={label}
          className={`font-normal !text-16 text-textPrimary ${
            type === "number" ? "min-w-[220px]" : "min-w-[162px]"
          } 
                     ${upload && "min-w-[120px]"} flex`}
        >
          {label}
          {isRequired ? (
            <span className={`isRequired text-required font-normal `}>*</span>
          ) : (
            ""
          )}
        </label>
        {type === "date" && (
          <div className="relative">
            <DatePicker
              // showYearDropdown
              name={name}
              selected={selectedDate}
              onChange={handleDateChange}
              onBlur={handleDateBlur}
              dateFormat="yyyy/MM/dd"
              isClearable
              className={`input-type-date  h-12 min-w-290 max-w-300  ${
                !isValue && !selectedDate && "input-danger"
              }  ${upload && "max-w-[230px]"} `}
            ></DatePicker>
            <span className="absolute top-[50%] -translate-y-2/4 left-3">
              <img src={datePicker} className="w-6" alt="" />
            </span>
            <span className="absolute top-[50%] -translate-y-2/4 right-2">
              <ExpandMoreIcon />
            </span>
          </div>
        )}
      </div>
    </Box>
  );
};

export default InputDatePicker;
