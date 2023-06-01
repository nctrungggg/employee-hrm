import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";
import InputDatePicker from "../../../../../components/formControl/inputDatePicker/InputDatePicker";
import { SelectInput } from "../../../../../components/formControl/selectInput/SelectInput";
import { employeeType } from "../../../../../contexts/dataLink";
import { IEmployeeParams } from "../../../../../types/employee";
import { useParams } from "react-router-dom";

export interface IContractInfomationProps {
  employeeState: IEmployeeParams;
  handleChangeFormContract: (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => void;
  handleDateChangeContractDate: (date: string | null) => void;
}

export function ContractInfomation({
  employeeState,
  handleChangeFormContract,
  handleDateChangeContractDate,
}: IContractInfomationProps) {
  const { id } = useParams();

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-18 font-medium text-textPrimary">
          Contract Information
        </h3>
        <p className="text-14 font-normal text-textSecondary">
          Required (<span className="text-red3">*</span>)
        </p>
      </div>
      <div className="w-full h-[1px] bg-[#DFE3E6] my-[10px]"></div>
      <div className="flex flex-col gap-[10px] px-5">
        <InputDatePicker
          isRequired
          type="date"
          value={employeeState.contract_start_date}
          name="contract_start_date"
          handleDateChangeContractDate={handleDateChangeContractDate}
          label="Date Start"
          className={"!w-[250px]"}
        />
        <SelectInput
          disabled={id ? true : false}
          dataList={employeeType}
          label="Employee Type"
          placeholder="Choose Type"
          value={employeeState.type}
          onChange={handleChangeFormContract}
          name="type"
          isType
          isRequired
        />
      </div>

      {/* <div className="mt-5">
        <ContractUpload contractList={contractListInfo} />
      </div> */}
    </div>
  );
}
