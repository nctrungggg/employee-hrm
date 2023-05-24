/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import employeeApi from "../../../api/employeeApi";
import {
  IDataEmployeeParams,
  IMarriageStatusParams,
} from "../../../types/employee";

interface initialState {
  dataEmployee: IDataEmployeeParams;
  loadingEmployee: boolean;
  marriageStatus: IMarriageStatusParams[];
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
};

const authSlice = createSlice({
  name: "employee",
  initialState,

  reducers: {},

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

export default reducer;
