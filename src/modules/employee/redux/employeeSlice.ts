/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import employeeApi from "../../../api/employeeApi";
import {
  IBenefitParams,
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

export const getIdEmployee = createAsyncThunk(
  "employee/id",
  async (id: number) => {
    const {
      data: { data },
    } = await employeeApi.getIdEmployeeApi(id);

    return data;
  }
);

export const deleteFieldTableEmployee = createAsyncThunk(
  "product/deleteEmployee",
  async (record_ids: number[]) => {
    const {
      data: { message },
    } = await employeeApi.deleteEmployeeApi(record_ids);

    toast.success(message);
    return;
  }
);

export const getMarriageStatus = createAsyncThunk("auth/marriage", async () => {
  const {
    data: { data },
  } = await employeeApi.getMarriageStatusApi();

  return data;
});

export const getDepartment = createAsyncThunk("auth/department", async () => {
  const {
    data: { data },
  } = await employeeApi.getDepartment();

  return data;
});

export const getPosition = createAsyncThunk("auth/position", async () => {
  const {
    data: { data },
  } = await employeeApi.getPosition();

  return data;
});

export const getGrades = createAsyncThunk("auth/grades", async () => {
  const {
    data: { data },
  } = await employeeApi.getGrades();

  return data;
});

export const getBenefits = createAsyncThunk("auth/benefits", async () => {
  const {
    data: { data },
  } = await employeeApi.getBenefits();

  return data;
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

  employee: {
    attendance_allowance_paid: true,
    operational_allowance_paid: true,
    entitle_ot: false,
    meal_allowance_paid: false,
    meal_allowance: 0,
    audit_salary: 0,
    bank_account_no: "",
    bank_name: "",
    basic_salary: 0,
    card_number: "",
    company_id: 1,
    contract_start_date: null,
    contracts: [],
    created_at: "",
    deleted_at: "",
    department_id: "",
    department_name: "",
    dob: null,
    family_card_number: "",
    gender: "",
    grade_id: null,
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
    marriage_id: "",
    minimum_salary_used: "",
    mobile_no: "",
    mother_name: "",
    name: "",
    nc_id: "",
    old_staff_id: 0,
    pob: "",
    position_id: "",
    position_name: "",
    remark: "",
    safety_insurance: 0,
    safety_insurance_no: "",
    shift: "",
    staff_id: "",
    tel_no: "",
    type: "",
    updated_at: "",
    grade: {
      benefits: [],
      company_id: 1,
      created_at: "",
      id: 1,
      name: "",
      prefix: "",
      updated_at: "",
    },
    benefits: [],
  },

  marriageStatus: [],
  departmentList: [],
  positionList: [],
  gradeList: [],
  benefitsList: [],
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
    [getIdEmployee.fulfilled.toString()]: (state, action) => {
      state.employee = action.payload;
    },

    [getMarriageStatus.fulfilled.toString()]: (state, action) => {
      state.marriageStatus = action.payload;
    },

    [getDepartment.fulfilled.toString()]: (state, action) => {
      state.departmentList = action.payload;
    },

    [getPosition.fulfilled.toString()]: (state, action) => {
      state.positionList = action.payload;
    },

    [getGrades.fulfilled.toString()]: (state, action) => {
      state.gradeList = action.payload;
    },

    [getBenefits.fulfilled.toString()]: (state, action) => {
      state.benefitsList = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;
export const { changeValueEmployee, resetValueEmployee } = actions;
export default reducer;
