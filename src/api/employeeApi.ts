import axiosClient from "./axiosClient";
interface EmployeeListParams {
  keywordSearch: string | null;
  currentPage: string | null;
}
const employeeApi = {
  getEmployList({ keywordSearch = "", currentPage = "" }: EmployeeListParams) {
    const url = `employee`;
    return axiosClient.get(url, {
      params: {
        search: keywordSearch,
        page: currentPage,
      },
    });
  },

  deleteEmployee(record_ids: number[]) {
    const url = `employee/multiple-delete`;
    return axiosClient.delete(url, {
      data: {
        record_ids: record_ids,
      },
    });
  },
};

export default employeeApi;
