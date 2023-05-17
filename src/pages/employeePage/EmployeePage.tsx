/* eslint-disable @typescript-eslint/no-explicit-any */
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { ROUTES } from "../../configs/routes";
import { ACCESS_TOKEN_KEY } from "../../constants/constants";
import { EmployeeList } from "../../modules/employee/components/employeeList/EmployeeList";
import { SearchEmployee } from "../../modules/employee/components/searchEmployee/SearchEmployee";
import {
  deleteFieldTableEmployee,
  getEmployeeList,
} from "../../modules/employee/redux/employeeSlice";
import { IDataEmployeeParams } from "../../types/employee";

export function EmployeePage() {
  const dispatch = useDispatch<AppDispatch>();
  const authToken = Cookies.get(ACCESS_TOKEN_KEY);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  console.log(page);

  const dataEmployee = useSelector(
    (state: RootState) => state.employee.dataEmployee
  );

  const [dataTables, setDataTables] =
    useState<IDataEmployeeParams>(dataEmployee);

  useEffect(() => {
    setDataTables(dataEmployee);
  }, [dataEmployee]);

  const getDataEmployeeList = useCallback(
    async (keywordSearch: string | null, currentPage: string | null) => {
      const resultAction = await dispatch(
        getEmployeeList({ keywordSearch, currentPage })
      );

      unwrapResult(resultAction);
    },
    [dispatch]
  );

  useEffect(() => {
    (async () => {
      getDataEmployeeList(search, page);
    })();
  }, [search, page, getDataEmployeeList]);

  const handleSearchEmployee = debounce(
    (keyword: string | "", page?: number) => {
      const queryParams: { search?: string; page: string } = keyword
        ? {
            search: keyword,
            page: "1",
          }
        : {
            page: String(page ? page : dataEmployee.current_page),
          };

      const searchParams = new URLSearchParams(queryParams);

      navigate({
        pathname: "/employee",
        search: `${searchParams}`,
      });
    },
    250
  );

  const handleDeleteFieldTable = async (selectedTables: number[]) => {
    await dispatch(deleteFieldTableEmployee(selectedTables));
    getDataEmployeeList(search, page);
  };

  if (!authToken) {
    return <Navigate to={`${ROUTES.auth}/${ROUTES.signIn}`} />;
  }

  return (
    <div className="pt-[92px] pl-[376px]">
      <div className="flex justify-between mt-10 mb-5">
        <h1 className="text-36 font-medium text-textPrimary ">
          Employee Management
        </h1>
        <SearchEmployee
          search={search}
          // currentPage={page}
          onSearchEmployee={handleSearchEmployee}
        />
      </div>
      <div className="pt-[10px] px-[10px] rounded-xl shadow-md bg-bgrGray2">
        <EmployeeList
          onDeleteFieldTable={handleDeleteFieldTable}
          onChangePage={handleSearchEmployee}
          dataEmployee={dataTables}
          currentPage={Number(page)}
        />
      </div>
    </div>
  );
}
