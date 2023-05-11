import axiosClient from "./axiosClient";

const employeeApi = {
  getEmployList() {
    const url = "/employee";
    return axiosClient.get(url);
  },
};

export default employeeApi;
