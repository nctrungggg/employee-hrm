import { ILoginParams } from "../types/auth";
import axiosClient from "./axiosClient";

const authApi = {
  signIn(data: ILoginParams) {
    const url = "/login";
    return axiosClient.post(url, data);
  },

  fortgotPassword(email: string) {
    {
      const url = "/forgot-password?";
      return axiosClient.post(url, email);
    }
  },

  logout() {
    const url = "/logout";
    return axiosClient.post(url);
  },

  getInfoUser() {
    const url = "/user/detail";
    return axiosClient.get(url);
  }
};

export default authApi;
