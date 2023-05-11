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

  getCompany() {
    const url = "/company";
    return axiosClient.get(url);
  },
};

export default authApi;
