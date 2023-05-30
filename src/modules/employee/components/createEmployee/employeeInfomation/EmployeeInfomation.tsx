import { SelectChangeEvent } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../../app/store";
import { InputField } from "../../../../../components/formControl/inputField/InputField";
import { SelectInput } from "../../../../../components/formControl/selectInput/SelectInput";
import { genders } from "../../../../../contexts/dataLink";
import { IFormEmployeeInformationParams } from "../../../../../types/employee";
import { getMarriageStatus } from "../../../redux/employeeSlice";
import InputDatePicker from "../../../../../components/formControl/inputDatePicker/InputDatePicker";

export interface IEmployeeInfomationProps {
  FormEmployeeInformation: IFormEmployeeInformationParams;
  handleChangeFormInfoEmployee: (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => void;
  handleDateChangeDob: (date: string | null) => void;
}

export function EmployeeInfomation({
  FormEmployeeInformation,
  handleChangeFormInfoEmployee,
  handleDateChangeDob,
}: IEmployeeInfomationProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const marriageStatus = useSelector(
    (state: RootState) => state.employee.marriageStatus
  );

  useEffect(() => {
    (async () => {
      const resultAction = await dispatch(getMarriageStatus());
      unwrapResult(resultAction);
    })();
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-18 font-medium text-textPrimary">
          Personal Information
        </h3>
        <p className="text-14 font-normal text-textSecondary">
          Required (<span className="text-red3">*</span>)
        </p>
      </div>
      <div className="w-full h-[1px] bg-[#DFE3E6] my-[10px]"></div>
      <div className="flex pb-3 gap-[50px] px-5">
        <div className="flex flex-col gap-[10px]">
          {id && (
            <InputField
              type="text"
              value={FormEmployeeInformation.nik}
              name="nik"
              onChange={handleChangeFormInfoEmployee}
              label="NIK"
            />
          )}
          <InputField
            type="text"
            value={FormEmployeeInformation.name}
            name="name"
            isRequired
            onChange={handleChangeFormInfoEmployee}
            label="Name"
          />
          <SelectInput
            dataList={genders}
            label="Gender"
            placeholder="Choose Gender"
            isRequired
            value={FormEmployeeInformation.gender}
            onChange={handleChangeFormInfoEmployee}
            name="gender"
          />
          <InputField
            type="text"
            value={FormEmployeeInformation.mother_name}
            name="mother_name"
            onChange={handleChangeFormInfoEmployee}
            label="Mother Name"
          />
          <InputDatePicker
            type="date"
            value={FormEmployeeInformation.dob}
            name="dob"
            handleDateChangeDob={handleDateChangeDob}
            label="Date of birth"
            isRequired
          />
          <InputField
            type="text"
            value={FormEmployeeInformation.pob}
            name="pob"
            onChange={handleChangeFormInfoEmployee}
            label="Place of birth"
          />
          <InputField
            type="text"
            value={FormEmployeeInformation.ktp_no}
            name="ktp_no"
            isRequired
            onChange={handleChangeFormInfoEmployee}
            label="KTP No."
          />
          <InputField
            type="text"
            value={FormEmployeeInformation.nc_id}
            name="nc_id"
            isRequired
            onChange={handleChangeFormInfoEmployee}
            label="National Card ID"
          />
          <InputField
            type="text"
            value={FormEmployeeInformation.home_address_1}
            name="home_address_1"
            onChange={handleChangeFormInfoEmployee}
            label="Home Address 1"
          />
          <InputField
            type="text"
            value={FormEmployeeInformation.home_address_2}
            name="home_address_2"
            onChange={handleChangeFormInfoEmployee}
            label="Home Address 2"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <InputField
            type="text"
            value={FormEmployeeInformation.mobile_no}
            name="mobile_no"
            onChange={handleChangeFormInfoEmployee}
            label="Mobile No."
          />
          <InputField
            type="text"
            value={FormEmployeeInformation.tel_no}
            name="tel_no"
            onChange={handleChangeFormInfoEmployee}
            label="Tel No."
          />
          <SelectInput
            dataList={marriageStatus}
            label="Marriage Status"
            placeholder="Choose Marriage Status"
            value={FormEmployeeInformation.marriage_id}
            onChange={handleChangeFormInfoEmployee}
            name="marriage_id"
            isNa
          />
          <InputField
            type="text"
            value={FormEmployeeInformation.card_number}
            name="card_number"
            onChange={handleChangeFormInfoEmployee}
            label="Bank Card No."
          />
          <InputField
            type="text"
            value={FormEmployeeInformation.bank_account_no}
            name="bank_account_no"
            onChange={handleChangeFormInfoEmployee}
            label="Bank Account No."
          />
          <InputField
            type="text"
            value={FormEmployeeInformation.bank_name}
            name="bank_name"
            onChange={handleChangeFormInfoEmployee}
            label="Bank Name"
          />
          <InputField
            type="text"
            value={FormEmployeeInformation.family_card_number}
            name="family_card_number"
            onChange={handleChangeFormInfoEmployee}
            label="Family Card Number"
          />
          <InputField
            type="text"
            value={FormEmployeeInformation.safety_insurance_no}
            name="safety_insurance_no"
            onChange={handleChangeFormInfoEmployee}
            label="Safety Insurance No."
          />
          <InputField
            type="text"
            value={FormEmployeeInformation.health_insurance_no}
            name="health_insurance_no"
            onChange={handleChangeFormInfoEmployee}
            label="Health Insurance No."
          />
        </div>
      </div>
    </div>
  );
}
