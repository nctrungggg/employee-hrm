import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";
import InputDatePicker from "../../../../../components/formControl/inputDatePicker/InputDatePicker";
import { SelectInput } from "../../../../../components/formControl/selectInput/SelectInput";
import { employeeType } from "../../../../../contexts/dataLink";
import { IFormContractEmployeeParams } from "../../../../../types/employee";

export interface IContractInfomationProps {
  formContractEmployee: IFormContractEmployeeParams;
  handleChangeFormContract: (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => void;
  handleDateChangeContractDate: (date: string | null) => void;
}

export function ContractInfomation({
  formContractEmployee,
  handleChangeFormContract,
  handleDateChangeContractDate,
}: IContractInfomationProps) {
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
          value={formContractEmployee.contract_start_date}
          name="contract_start_date"
          handleDateChangeContractDate={handleDateChangeContractDate}
          label="Date Start"
          className={"!w-[250px]"}
        />
        <SelectInput
          dataList={employeeType}
          label="Employee Type"
          placeholder="Choose Type"
          value={formContractEmployee.type}
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
