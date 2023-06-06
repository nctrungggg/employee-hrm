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

  getIdEmployeeApi(id: number) {
    const url = `employee/${id}`;
    return axiosClient.get(url);
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

  updateEmployee(data: IEmployeeParams, id: string | undefined) {
    const url = `employee/${id}`;
    return axiosClient.put(url, data);
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

  getGrades() {
    const url = "/grade";
    return axiosClient.get(url);
  },

  getBenefits() {
    const url = "/benefit";
    return axiosClient.get(url);
  },

  getIdEmployeeContractUpload(id: number) {
    const url = `/contract/get-employee-contracts?employee_id=${id}`;
    return axiosClient.get(url);
  },

  // addEmployeeContractUpload(formData: FormData) {
  //   const url = `/contract/save-multiple`;
  //   return axiosClient.post(url, formData);
  // },
  addEmployeeContractUpload(formData: FormData) {
    const url = `/contract/save-multiple`;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return axiosClient.post(url, formData, config);
  },

  addEmployeeOthersUpload(formData: FormData) {
    const url = `/employee-document/upload`;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return axiosClient.post(url, formData, config);
  },
};

export default employeeApi;
