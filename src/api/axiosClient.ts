import axios from "axios";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY, API_HOST } from "../constants/constants";

const authToken = Cookies.get(ACCESS_TOKEN_KEY);

const axiosClient = axios.create({
  baseURL: API_HOST,
  headers: {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${"800|uqEIx0ZaUbZoCRgzB72wxJgOzHVWJSiiZ9kvHImO"}`,
  },
});

export default axiosClient;
