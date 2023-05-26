/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import employeeApi from "../../../api/employeeApi";
import {
  IDataEmployeeParams,
  IEmployeeParams,
  IMarriageStatusParams,
} from "../../../types/employee";

interface initialState {
  dataEmployee: IDataEmployeeParams;
  loadingEmployee: boolean;
  marriageStatus: IMarriageStatusParams[];
  employee: IEmployeeParams;
}

interface EmployeeListParams {
  keywordSearch?: string | null;
  currentPage?: string | null;
}

export const getEmployeeList = createAsyncThunk(
  "employee",
  async ({ keywordSearch = "", currentPage = "1" }: EmployeeListParams) => {
    const {
      data: { data },
    } = await employeeApi.getEmployListApi({ keywordSearch, currentPage });

    return data;
  }
);

export const deleteFieldTableEmployee = createAsyncThunk(
  "product/deleteProduct",
  async (record_ids: number[]) => {
    const {
      data: { message },
    } = await employeeApi.deleteEmployeeApi(record_ids);

    toast.success(message);
    return;
  }
);

export const getMarriageStatus = createAsyncThunk("auth/company", async () => {
  const {
    data: { data: company },
  } = await employeeApi.getMarriageStatusApi();

  return company;
});

const initialState: initialState = {
  dataEmployee: {
    current_page: 0,
    data: [],
    first_page_url: "",
    from: 0,
    last_page: 0,
    last_page_url: "",
    links: {
      url: "",
      label: "",
      active: false,
    },
    next_page_url: "",
    path: "",
    per_page: 0,
    prev_page_url: "",
    to: 0,
    total: 0,
  },

  loadingEmployee: false,
  marriageStatus: [],

  employee: {
    attendance_allowance_paid: 1,
    audit_salary: 0,
    bank_account_no: "",
    bank_name: "",
    basic_salary: 0,
    card_number: "",
    company_id: 1,
    contract_start_date: "",
    contracts: [],
    created_at: "",
    deleted_at: "",
    department_id: 1,
    department_name: "",
    dob: "",
    entitle_ot: 1,
    family_card_number: "",
    gender: "",
    grade_id: 1,
    grade_name: "",
    grade_prefix: "",
    health_insurance: 0,
    health_insurance_no: "",
    home_address_1: "",
    home_address_2: "",
    id: 0,
    ktp_no: "",
    manager_id: 1,
    manager_name: "",
    marriage_code: "",
    marriage_id: 1,
    meal_allowance: 0,
    meal_allowance_paid: 1,
    minimum_salary_used: "",
    mobile_no: "",
    mother_name: "",
    name: "",
    nc_id: "",
    old_staff_id: 0,
    operational_allowance_paid: 1,
    pob: "",
    position_id: 1,
    position_name: "",
    remark: "",
    safety_insurance: 0,
    safety_insurance_no: "",
    shift: "",
    staff_id: "",
    tel_no: "",
    type: "",
    updated_at: "",
  },
};

const authSlice = createSlice({
  name: "employee",
  initialState,

  reducers: {
    changeValueEmployee: (state, actions) => {
      state.employee = { ...state.employee, ...actions.payload };
    },

    resetValueEmployee: (state) => {
      state.employee = initialState.employee;
    },
  },

  extraReducers: {
    [getEmployeeList.fulfilled.toString()]: (state, action) => {
      state.dataEmployee = action.payload;
    },

    [getMarriageStatus.fulfilled.toString()]: (state, action) => {
      state.marriageStatus = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;
export const { changeValueEmployee, resetValueEmployee } = actions;
export default reducer;
