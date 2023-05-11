import Cookies from "js-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authApi from "../../../api/authApi";
import { ACCESS_TOKEN_KEY, STORAGE_KEY } from "../../../constants/constants";
import { ILoginParams } from "../../../types/auth";
import { ICompanyParams } from "../../../types/company";
interface initialState {
  // currentUser: null;
  companyList: ICompanyParams[];
}

export const signIn = createAsyncThunk(
  "auth/sign-in",
  async (payload: ILoginParams) => {
    try {
      const { data } = await authApi.signIn(payload);

      Cookies.set(ACCESS_TOKEN_KEY, data.data.token);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    // save data to local storage
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (payload: string) => {
    try {
      const data = await authApi.fortgotPassword(payload);
      console.log(data);

      // toast.success(data.message, {
      //   autoClose: 2000,
      // });

      Cookies.set(ACCESS_TOKEN_KEY, data.data.token);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);

export const getCompany = createAsyncThunk("auth/company", async () => {
  const {
    data: { data: company },
  } = await authApi.getCompany();

  return company;
});

const initialState: initialState = {
  companyList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: () => {
      Cookies.remove(ACCESS_TOKEN_KEY);
    },
  },

  extraReducers: {
    [getCompany.fulfilled.toString()]: (state, action) => {
      state.companyList = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;

export const { logout } = actions;
export default reducer;
