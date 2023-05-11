/* eslint-disable @typescript-eslint/no-explicit-any */
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import addIcon from "../../assets/add.svg";
import searchIcon from "../../assets/search.svg";
import trashIcon from "../../assets/trash.svg";
import { ROUTES } from "../../configs/routes";
import { ACCESS_TOKEN_KEY } from "../../constants/constants";
import { EmployeeList } from "../../modules/employee/components/employeeList/EmployeeList";
import { getEmployList } from "../../modules/employee/redux/employeeSlice";

export function EmployeePage() {
  const dispatch = useDispatch<AppDispatch>();
  const authToken = Cookies.get(ACCESS_TOKEN_KEY);

  const dataEmployee = useSelector((state: any) => state.employee.dataEmployee);

  useEffect(() => {
    (async () => {
      const resultAction = await dispatch(getEmployList());
      unwrapResult(resultAction);
    })();
  }, [dispatch]);

  if (!authToken) {
    return <Navigate to={`${ROUTES.auth}/${ROUTES.signIn}`} />;
  }

  if (!dataEmployee) return;

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
      <div className="pt-[10px] px-[10px]  bg-bgrGray2">
        <div className="flex justify-end border-gray-200 pb-3">
          <div className="flex items-center  gap-1 rounded-md">
            <div className="w-[90px] h-[35px] bg-bgrBlue2 rounded-md flex items-center justify-center gap-[6px] cursor-pointer hover:bg-[#0091ff14]">
              <img src={addIcon} alt="add-icon" />
              <Link
                className="text-bgrBlue text-14 font-normal"
                to="/employee/create-or-update"
              >
                Add
              </Link>
            </div>
            <div className="w-[90px] h-[35px] flex items-center justify-center gap-[6px] rounded-md bg-red2 cursor-pointer hover:bg-[#e5484d14]">
              <img src={trashIcon} alt="trash-icon" />
              <button className="text-red3 text-14 font-normal">Delete</button>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#DFE3E6] mb-[10px]"></div>
        <EmployeeList dataEmployee={dataEmployee} />
      </div>
    </div>
  );
}
