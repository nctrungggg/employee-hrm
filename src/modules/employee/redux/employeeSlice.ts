import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeApi from "../../../api/employeeApi";
import { IDataEmployeeParams } from "../../../types/employee";
import { toast } from "react-toastify";

interface initialState {
  dataEmployee: IDataEmployeeParams;
  loadingEmployee: boolean;
}

interface EmployeeListParams {
  keywordSearch?:  string | null;
  currentPage?:  string | null;
}

export const getEmployeeList = createAsyncThunk(
  "employee",
  async ({ keywordSearch = "", currentPage = "1" }: EmployeeListParams) => {
    const {
      data: { data },
    } = await employeeApi.getEmployList({ keywordSearch, currentPage });

    return data;
  }
);

export const deleteFieldTableEmployee = createAsyncThunk(
  "product/deleteProduct",
  async (record_ids: number[]) => {
    const {
      data: { message },
    } = await employeeApi.deleteEmployee(record_ids);

    toast.success(message);
    return;
  }
);

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
};

const authSlice = createSlice({
  name: "employee",
  initialState,

  reducers: {},

  extraReducers: {
    [getEmployeeList.fulfilled.toString()]: (state, action) => {
      state.dataEmployee = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;

export default reducer;
