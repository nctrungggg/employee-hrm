import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeApi from "../../../api/employeeApi";
import { DataEmployee } from "../../../types/employee";

interface initialState {
  dataEmployee: DataEmployee;
  loadingEmployee: boolean;
}

export const getEmployList = createAsyncThunk("employee", async () => {
  const {
    data: { data },
  } = await employeeApi.getEmployList();

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
};

const authSlice = createSlice({
  name: "employee",
  initialState,

  reducers: {},

  extraReducers: {
    [getEmployList.fulfilled.toString()]: (state, action) => {
      state.dataEmployee = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;

export default reducer;
