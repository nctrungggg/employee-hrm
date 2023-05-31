import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";
import { InputField } from "../../../../../components/formControl/inputField/InputField";
import {
  IEmployeeParams
} from "../../../../../types/employee";

export interface IEmployeeSalaryProps {
  employeeState: IEmployeeParams;

  handleFormChangeSalary?: (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => void;
}

export function EmployeeSalary({
  employeeState,
  handleFormChangeSalary,
}: IEmployeeSalaryProps) {
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-18 font-medium text-textPrimary">Salary & Wages</h3>
        <p className="text-14 font-normal text-textSecondary">
          Required (<span className="text-red3">*</span>)
        </p>
      </div>
      <div className="w-full h-[1px] bg-[#DFE3E6] my-[10px]"></div>
      <div className="flex flex-col gap-[10px]">
        <InputField
          type="number"
          value={employeeState.basic_salary}
          name="basic_salary"
          isRequired
          onChange={handleFormChangeSalary}
          label="Basic Salary"
          isRp
        />
        <InputField
          type="number"
          value={employeeState.audit_salary}
          name="audit_salary"
          isRequired
          onChange={handleFormChangeSalary}
          label="Basic Salary (Audit)"
          isRp
        />
        <InputField
          type="number"
          value={employeeState.safety_insurance}
          name="safety_insurance"
          isRequired
          onChange={handleFormChangeSalary}
          label="Safety Insurance Amount"
          isRp
        />
        <InputField
          type="number"
          value={employeeState.health_insurance}
          name="health_insurance"
          onChange={handleFormChangeSalary}
          label="Healthy Insurance Amount"
          isRp
        />
        <InputField
          type="number"
          value={employeeState.meal_allowance}
          name="meal_allowance"
          isRequired
          onChange={handleFormChangeSalary}
          label="Meal Allowance"
          isRp
        />
      </div>
    </div>
  );
}
