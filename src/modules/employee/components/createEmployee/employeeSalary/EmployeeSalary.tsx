import { ChangeEvent } from "react";
import { IFormSalaryEmployeeParams } from "../../../../../types/employee";
import { SelectChangeEvent } from "@mui/material";
import { InputField } from "../../../../../components/formControl/inputField/InputField";

export interface IEmployeeSalaryProps {
  formSalaryEmployee: IFormSalaryEmployeeParams;
  handleFormChangeSalary?: (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => void;
}

export function EmployeeSalary({
  formSalaryEmployee,
  handleFormChangeSalary,
}: IEmployeeSalaryProps) {
  return (
    <div>
      <div className="flex flex-col gap-[10px]">
        <InputField
          type="number"
          value={formSalaryEmployee.basic_salary}
          name="basic_salary"
          isRequired
          onChange={handleFormChangeSalary}
          label="Basic Salary"
          isRp
        />
        <InputField
          type="number"
          value={formSalaryEmployee.audit_salary}
          name="audit_salary"
          isRequired
          onChange={handleFormChangeSalary}
          label="Basic Salary (Audit)"
          isRp
        />
        <InputField
          type="number"
          value={formSalaryEmployee.safety_insurance}
          name="safety_insurance"
          isRequired
          onChange={handleFormChangeSalary}
          label="Safety Insurance Amount"
          isRp
        />
        <InputField
          type="number"
          value={formSalaryEmployee.health_insurance}
          name="health_insurance"
          onChange={handleFormChangeSalary}
          label="Healthy Insurance Amount"
          isRp
        />
        <InputField
          type="number"
          value={formSalaryEmployee.meal_allowance}
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
