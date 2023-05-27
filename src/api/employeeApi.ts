import { IEmployeeParams } from "../types/employee";
import axiosClient from "./axiosClient";
interface EmployeeListParams {
  keywordSearch: string | null;
  currentPage: string | null;
}
const employeeApi = {
  getEmployListApi({
    keywordSearch = "",
    currentPage = "",
  }: EmployeeListParams) {
    const url = `employee`;
    return axiosClient.get(url, {
      params: {
        search: keywordSearch,
        page: currentPage,
      },
    });
  },

  addEmployeeApi(formData: IEmployeeParams) {
    const url = `employee`;
    return axiosClient.post(url, formData);
  },

  deleteEmployeeApi(record_ids: number[]) {
    const url = `employee/multiple-delete`;
    return axiosClient.delete(url, {
      data: {
        record_ids: record_ids,
      },
    });
  },

  getMarriageStatusApi() {
    const url = "/marriage";
    return axiosClient.get(url);
  },

  getDepartment() {
    const url = "/department";
    return axiosClient.get(url);
  },

  getPosition() {
    const url = "/position";
    return axiosClient.get(url);
  },
};

export default employeeApi;
