import axiosClient from "./axiosClient";

const companyApi = {
  getCompany() {
    const url = "/company";
    return axiosClient.get(url);
  },
};

export default companyApi;
