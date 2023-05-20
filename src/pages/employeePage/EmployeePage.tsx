/* eslint-disable @typescript-eslint/no-explicit-any */
import { unwrapResult } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { EmployeeList } from "../../modules/employee/components/employeeList/EmployeeList";
import { SearchEmployee } from "../../modules/employee/components/searchEmployee/SearchEmployee";
import {
  deleteFieldTableEmployee,
  getEmployeeList,
} from "../../modules/employee/redux/employeeSlice";
import { IDataEmployeeParams } from "../../types/employee";

export function EmployeePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      await getDataEmployeeList(search, page);
      setLoading(false);
    })();
  }, [search, page, getDataEmployeeList]);

  const searchParamsString = (queryParams: {
    search?: string;
    page: string;
  }) => {
    const searchParams = new URLSearchParams(queryParams);
    navigate({
      pathname: "/employee",
      search: `${searchParams}`,
    });
  };

  const handleSearchEmployee = debounce(
    (keyword: string | null, page?: number) => {
      const queryParams: { search?: string; page: string } = keyword
        ? {
            search: keyword,
            page: page ? String(page) : "1",
          }
        : {
            page: String(page ? page : dataEmployee.current_page),
          };

      searchParamsString(queryParams);
    },
    250
  );

  const handleDeleteFieldTable = async (selectedTables: number[]) => {
    console.log(selectedTables);

    setLoading(true);

    const updatedPage =
      Number(page) === dataTables.last_page &&
      selectedTables.length >= dataTables.data.length
        ? Number(page) -
            Math.floor(selectedTables.length / dataEmployee.per_page) || 1
        : page;

    await dispatch(deleteFieldTableEmployee(selectedTables));
    await getDataEmployeeList(search, String(updatedPage));

    const queryParams = search
      ? {
          search: search,
          page: String(updatedPage),
        }
      : {
          page: String(updatedPage),
        };

    searchParamsString(queryParams);

    setLoading(false);
  };

  return (
    <div className="pt-[92px] pl-[376px]">
      <div className="flex justify-between mt-10 mb-5">
        <h1 className="text-36 font-medium text-textPrimary ">
          Employee Management
        </h1>
        <SearchEmployee
          search={search}
          onSearchEmployee={handleSearchEmployee}
        />
      </div>
      <div className="pt-[10px] px-[10px] rounded-xl shadow-md bg-bgrGray2">
        <EmployeeList
          onDeleteFieldTable={handleDeleteFieldTable}
          onChangePage={handleSearchEmployee}
          dataEmployee={dataTables}
          currentPage={Number(page)}
          loading={loading}
          search={search}
        />
      </div>
    </div>
  );
}
