/* eslint-disable @typescript-eslint/no-explicit-any */
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import searchIcon from "../../assets/search.svg";
import { ROUTES } from "../../configs/routes";
import { ACCESS_TOKEN_KEY } from "../../constants/constants";
import { EmployeeList } from "../../modules/employee/components/employeeList/EmployeeList";
import {
  deleteFieldTableEmployee,
  getEmployList,
} from "../../modules/employee/redux/employeeSlice";

export function EmployeePage() {
  const dispatch = useDispatch<AppDispatch>();
  const authToken = Cookies.get(ACCESS_TOKEN_KEY);

  const dataEmployee = useSelector((state: any) => state.employee.dataEmployee);
  const [dataTables, setDataTables] = useState(dataEmployee);

  useEffect(() => {
    setDataTables(dataEmployee);
  }, [dataEmployee]);

  useEffect(() => {
    (async () => {
      const resultAction = await dispatch(getEmployList());
      unwrapResult(resultAction);
    })();
  }, [dispatch]);

  if (!authToken) {
    return <Navigate to={`${ROUTES.auth}/${ROUTES.signIn}`} />;
  }

  const handleDeleteFieldTable = (selectedTables: number[]) => {
    console.log(selectedTables);
    dispatch(deleteFieldTableEmployee(selectedTables));

    setDataTables((prevData: { data: any[] }) => ({
      ...prevData,
      data: prevData.data.filter((row) => !selectedTables.includes(row.id)),
    }));
  };

  return (
    <div className="pt-[92px] pl-[376px]">
      <div className="flex justify-between mt-10 mb-5">
        <h1 className="text-36 font-medium text-textPrimary ">
          Employee Management
        </h1>
        <div className="w-[200px] flex items-center border border-[#DFE3E6] border-solid h-[40px] rounded-lg bg-bgrGray2">
          <div className="px-3">
            <img src={searchIcon} alt=" search-icon" />
          </div>
          <input
            type="text"
            placeholder="Search name..."
            className="font-normal text-14 text-textPrimary !bg-inherit py-[8.5px]"
          />
        </div>
      </div>
      <div className="pt-[10px] px-[10px] rounded-xl shadow-md bg-bgrGray2">
        <EmployeeList
          onDeleteFieldTable={handleDeleteFieldTable}
          dataEmployee={dataTables}
        />
      </div>
    </div>
  );
}
