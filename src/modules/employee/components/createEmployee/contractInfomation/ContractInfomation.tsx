import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";
import InputDatePicker from "../../../../../components/formControl/inputDatePicker/InputDatePicker";
import { SelectInput } from "../../../../../components/formControl/selectInput/SelectInput";
import { employeeType } from "../../../../../contexts/dataLink";
import { IFormContractEmployeeParams } from "../../../../../types/employee";

export interface IContractInfomationProps {
  formContractEmployee: IFormContractEmployeeParams;
  handleChangeFormContract?: (
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
      <div className="flex flex-col gap-[10px] px-5">
        <InputDatePicker
          isRequired={true}
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
          isRequired={true}
          value={formContractEmployee.type}
          onChange={handleChangeFormContract}
          name="type"
          isType
        />
      </div>

      {/* <div className="mt-5">
        <ContractUpload contractList={contractListInfo} />
      </div> */}
    </div>
  );
}
