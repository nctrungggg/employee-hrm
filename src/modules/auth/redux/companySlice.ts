import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import companyApi from "../../../api/companyApi";
import { ICompanyParams } from "../../../types/company";

interface initialState {
  companyList: ICompanyParams[];
}

export const getCompany = createAsyncThunk("auth/company", async () => {
  const {
    data: { data: company },
  } = await companyApi.getCompany();
  console.log(company);

  return company;
});

const initialState: initialState = {
  companyList: [],
};

const authSlice = createSlice({
  name: "company",
  initialState,

  reducers: {},

  extraReducers: {
    [getCompany.fulfilled.toString()]: (state, action) => {
      state.companyList = action.payload;
    },
  },
});

const { reducer } = authSlice;

export default reducer;
