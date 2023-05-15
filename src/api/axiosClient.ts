import axios from "axios";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY, API_HOST } from "../constants/constants";

const axiosClient = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosClient;
