import { FormControlLabel, FormGroup, SelectChangeEvent } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../app/store";
import BpCheckbox from "../../../../../components/bpCheckbox/BpCheckbox";
import { SelectInput } from "../../../../../components/formControl/selectInput/SelectInput";
import { IFormDetailsEmployeeParams } from "../../../../../types/employee";
import { getDepartment, getPosition } from "../../../redux/employeeSlice";

interface IEmployeeDetailsProps {
  formDetailEmployee: IFormDetailsEmployeeParams;
  handleChangeFormDetail: (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => void;
}

interface CheckboxValues {
  entitledOT: boolean;
  mealAllowancePaid: boolean;
  operationalAllowancePaid: boolean;
  attendanceAllowancePaid: boolean;
}

export function EmployeeDetails({
  formDetailEmployee,
  handleChangeFormDetail,
}: IEmployeeDetailsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { departmentList, positionList } = useSelector(
    (state: RootState) => state.employee
  );
  const [checkboxValues, setCheckboxValues] = useState<CheckboxValues>({
    entitledOT: false,
    mealAllowancePaid: false,
    operationalAllowancePaid: true,
    attendanceAllowancePaid: true,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    let updatedValues: CheckboxValues;

    if (name === "entitledOT") {
      updatedValues = {
        ...checkboxValues,
        [name]: checked,
        operationalAllowancePaid: checked ? false : true,
        attendanceAllowancePaid: checked ? false : true,
      };
    } else {
      updatedValues = {
        ...checkboxValues,
        [name]: checked,
      };
    }
    setCheckboxValues(updatedValues);
  };

  useEffect(() => {
    (async () => {
      await Promise.all([
        dispatch(getDepartment()),
        dispatch(getPosition()),
      ]).then(([resultActionDepartment, resultActionPosition]) => {
        unwrapResult(resultActionDepartment);
        unwrapResult(resultActionPosition);
      });
    })();
  }, [dispatch]);

  return (
    <div className="max-w-[560px]">
      <div className="flex flex-col gap-[10px] px-2 ">
        <SelectInput
          dataList={departmentList}
          label="Department"
          placeholder="Choose Department"
          value={formDetailEmployee.department_id}
          onChange={handleChangeFormDetail}
          name="department_id"
          isNa
        />

        <SelectInput
          dataList={positionList}
          label="Position"
          placeholder="Choose Position"
          value={formDetailEmployee.position_id}
          onChange={handleChangeFormDetail}
          name="position_id"
          isNa
        />
      </div>

      <div className="mt-5 px-2 inline-block">
        <FormGroup className="flex flex-col gap-5">
          <FormControlLabel
            control={
              <BpCheckbox
                name="entitledOT"
                checked={checkboxValues.entitledOT}
                onChange={handleCheckboxChange}
              />
            }
            label="Entitled OT"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 24,
                color: "#30a46c",
              },
              "& .MuiFormControlLabel-label": {
                fontSize: 14,
              },
            }}
          />

          <FormControlLabel
            control={
              <BpCheckbox
                name="mealAllowancePaid"
                checked={checkboxValues.mealAllowancePaid}
                onChange={handleCheckboxChange}
              />
            }
            label="Meal Allowance Paid"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 24,
                color: "#30a46c",
              },
              "& .MuiFormControlLabel-label": {
                fontSize: 14,
              },
            }}
          />

          <FormControlLabel
            disabled
            checked
            control={
              <BpCheckbox
                name="operationalAllowancePaid"
                checked={checkboxValues.operationalAllowancePaid}
                onChange={handleCheckboxChange}
              />
            }
            label="Operational Allowance Paid"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 24,
                color: "#c1c8cdcc",
              },
              "& .MuiFormControlLabel-label": {
                fontSize: 14,
              },
            }}
          />

          <FormControlLabel
            disabled
            checked
            control={
              <BpCheckbox
                name="attendanceAllowancePaid"
                checked={checkboxValues.attendanceAllowancePaid}
                onChange={handleCheckboxChange}
              />
            }
            label="Attendance Allowance Paid"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 24,
                color: "#c1c8cdcc",
              },
              "& .MuiFormControlLabel-label": {
                fontSize: 14,
              },
            }}
          />
        </FormGroup>
      </div>
    </div>
  );
}
