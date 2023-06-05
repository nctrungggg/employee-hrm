/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import employeeApi from "../../../api/employeeApi";
import {
  IBenefitParams,
  IContractInfoParams,
  IContractParams,
  IDataEmployeeParams,
  IDepartmentParams,
  IEmployeeParams,
  IGradeParams,
  IMarriageStatusParams,
  IPositionParams,
} from "../../../types/employee";

interface initialState {
  dataEmployee: IDataEmployeeParams;
  loadingEmployee: boolean;
  marriageStatus: IMarriageStatusParams[];
  employee: IEmployeeParams;

  departmentList: IDepartmentParams[];
  positionList: IPositionParams[];
  benefitsList: IBenefitParams[];
  gradeList: IGradeParams[];

  errorsInputEmployee: any;
}

interface contractUploadState {
  contractList: IContractParams[];
  contractInfo: IContractInfoParams;
}

const initialState: contractUploadState = {
  contractList: [],
  contractInfo: {
    employee_id: "",
    names: [],
    contract_dates: [],
    documents: [],
    modified_contracts: [],
  },
};

const contractUploadSlice = createSlice({
  name: "contractUpload",
  initialState,

  reducers: {},

  extraReducers: {},
});

const { actions, reducer } = contractUploadSlice;

export default reducer;
