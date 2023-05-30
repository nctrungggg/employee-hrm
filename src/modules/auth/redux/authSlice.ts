/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import authApi from "../../../api/authApi";
import { ACCESS_TOKEN_KEY } from "../../../constants/constants";
import { ILoginParams } from "../../../types/auth";
import { IUserInfoParams } from "../../../types/userInfo";
interface initialState {
  authToken: string;
  userInFo: IUserInfoParams;
}

export const signIn = createAsyncThunk(
  "auth/sign-in",
  async (payload: ILoginParams) => {
    try {
      const { data } = await authApi.signIn(payload);

      Cookies.set(ACCESS_TOKEN_KEY, data.data.token);

      return data.data.token;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (payload: string) => {
    try {
      const data = await authApi.fortgotPassword(payload);
      toast.success(data.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);

export const getUserInfo = createAsyncThunk("auth/user-info", async () => {
  const {
    data: { data },
  } = await authApi.getInfoUser();

  return data;
});

const initialState: initialState = {
  authToken: Cookies.get(ACCESS_TOKEN_KEY) || "",
  userInFo: {
    company: {
      address: "",
      created_at: "",
      full_name: "",
      id: 0,
      name: "",
      prefix: "",
      tel_no: "",
      updated_at: null,
    },
    id: 0,
    username: "",
    email: "",
    role_id: 0,
    employee_id: null,
    department_id: null,
    company_id: 0,
    register_token: "",
    email_verified_at: null,
    is_active: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    department_name: "",
    position_name: "",
    permissions: [],
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.authToken = "";
      Cookies.remove(ACCESS_TOKEN_KEY);
    },
  },

  extraReducers: {
    [signIn.fulfilled.toString()]: (state, action) => {
      state.authToken = action.payload;
    },

    [getUserInfo.fulfilled.toString()]: (state, action) => {
      state.userInFo = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;

export const { logout } = actions;
export default reducer;
