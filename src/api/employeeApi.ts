import axiosClient from "./axiosClient";

const employeeApi = {
  getEmployList() {
    const url = "employee";
    return axiosClient.get(url);
  },

  deleteEmployee(record_ids: number[]) {
    const encodedRecordIds = record_ids.map(
      (id) => `record_ids%5B%5D=${encodeURIComponent(id)}`
    );
    const param = encodedRecordIds.join("&");
    const url = `employee/multiple-delete?${param}`;
    return axiosClient.delete(url);
  },
};

export default employeeApi;
