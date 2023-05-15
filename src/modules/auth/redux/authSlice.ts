import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import authApi from "../../../api/authApi";
import { ACCESS_TOKEN_KEY } from "../../../constants/constants";
import { ILoginParams } from "../../../types/auth";
interface initialState {
  authToken: string;
}

export const signIn = createAsyncThunk(
  "auth/sign-in",
  async (payload: ILoginParams) => {
    try {
      const { data } = await authApi.signIn(payload);

      Cookies.set(ACCESS_TOKEN_KEY, data.data.token);

      return data.data.token;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      Cookies.set(ACCESS_TOKEN_KEY, data.data.token);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);

const initialState: initialState = {
  authToken: Cookies.get(ACCESS_TOKEN_KEY) || "",
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
  },
});

const { actions, reducer } = authSlice;

export const { logout } = actions;
export default reducer;
