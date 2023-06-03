import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ExpandLessIcon from "@mui/icons-material/ExpandMore";
import moment from "moment-timezone";
import datePicker from "../../../assets/datePicker.svg";
import { parseDateValue } from "../../../utils/parseDateValue";
interface IInputDatePickerProps {
  label: string;
  isRequired?: boolean;
  name: string;
  handleDateChangeDob?: (date: string | null) => void;
  value: string | null;
  type: string;
  isRp?: boolean;
  upload?: boolean;
  handleDateChangeContractDate?: (date: string | null) => void;
  handleDateChangeUploadContract?: (date: string | null) => void;
  className?: string;
}

const InputDatePicker = (props: IInputDatePickerProps) => {
  const {
    label,
    upload,
    name,
    isRequired,
    type,
    value,
    className,
    handleDateChangeDob,
    handleDateChangeContractDate,
    handleDateChangeUploadContract,
  } = props;

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    parseDateValue(value)
  );

  useEffect(() => {
    setSelectedDate(parseDateValue(value));
  }, [value]);

  const [isValue, setIsValue] = useState(true);

  const handleDateChange = (date: Date | null) => {
    const dateString = moment(date).format("YYYY/MM/DD");
    const formattedDate = dateString.replace(/\//g, "-");

    setSelectedDate(date);

    handleDateChangeDob?.(formattedDate);
    handleDateChangeContractDate?.(formattedDate);
    handleDateChangeUploadContract?.(formattedDate);
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
            <span
              className={`isRequired text-required font-light leading-none`}
            >
              *
            </span>
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onChange={handleDateChange}
              onBlur={handleDateBlur}
              dateFormat="yyyy/MM/dd"
              isClearable
              className={`${className} input-type-date  h-12 w-[290px]  ${
                !isValue && !selectedDate && "input-danger"
              }  ${upload && "max-w-[230px]"} `}
            ></DatePicker>
            <span className="absolute top-[50%] -translate-y-2/4 left-3">
              <img src={datePicker} className="w-6" alt="" />
            </span>
            <span className="absolute top-[50%] -translate-y-2/4 right-2">
              <ExpandLessIcon />
            </span>
          </div>
        )}
      </div>
    </Box>
  );
};

export default InputDatePicker;
