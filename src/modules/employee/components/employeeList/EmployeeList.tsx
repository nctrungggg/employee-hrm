import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import addIcon from "../../../../assets/add.svg";
import noData from "../../../../assets/noData.svg";
import trashIcon from "../../../../assets/trash.svg";
import trashDisableIcon from "../../../../assets/trashDisable.svg";
import { IDataEmployeeParams } from "../../../../types/employee";
import { ROUTES } from "../../../../configs/routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { getIdEmployee, resetValueEmployee } from "../../redux/employeeSlice";
import { unwrapResult } from "@reduxjs/toolkit";


interface IEmployeeListProps {
  dataEmployee: IDataEmployeeParams;
  onDeleteFieldTable: (listId: number[]) => void;
  onChangePage: (keyword: string | null, page: number) => void;
  currentPage: number;
  loading: boolean;
  search: string | null;
}

interface Column {
  id:
    | "NIK"
    | "Name"
    | "Gender"
    | "Bank Card No."
    | "Bank Account No."
    | "Family Card No."
    | "Marriage Status"
    | "Mother Name"
    | "Place of birth"
    | "Date of birth"
    | "Home Address"
    | "National Card ID No."
    | "Date Start"
    | "First Contract"
    | "Second Contract"
    | "End Contract"
    | "Department"
    | "Employee Type"
    | "Salary Rp."
    | "Position"
    | "O/T Paid"
    | "Meal paid"
    | "Meal Rp."
    | "Grading";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "NIK", label: "NIK", minWidth: 100 },
  { id: "Name", label: "Name", minWidth: 150 },
  { id: "Gender", label: "Gender", minWidth: 70 },
  { id: "Bank Card No.", label: "Bank Card No.", minWidth: 140 },
  { id: "Bank Account No.", label: "Bank Account No.", minWidth: 150 },
  { id: "Family Card No.", label: "Family Card No.", minWidth: 150 },
  { id: "Marriage Status", label: "Marriage Status", minWidth: 150 },
  { id: "Mother Name", label: "Mother Name", minWidth: 150 },
  { id: "Place of birth", label: "Place of birth", minWidth: 150 },
  { id: "Date of birth", label: "Date of birth", minWidth: 150 },
  { id: "Home Address", label: "Home Address", minWidth: 200 },
  { id: "National Card ID No.", label: "National Card ID No.", minWidth: 170 },
  { id: "Date Start", label: "Date Start", minWidth: 130 },
  { id: "First Contract", label: "First Contract", minWidth: 150 },
  { id: "Second Contract", label: "Second Contract", minWidth: 150 },
  { id: "End Contract", label: "End Contract", minWidth: 150 },
  { id: "Department", label: "Department", minWidth: 150 },
  { id: "Employee Type", label: "Employee Type", minWidth: 150 },
  { id: "Salary Rp.", label: "Salary Rp.", minWidth: 150 },
  { id: "Position", label: "Position", minWidth: 150 },
  { id: "O/T Paid", label: "O/T Paid", minWidth: 100 },
  { id: "Meal paid", label: "Meal paid", minWidth: 100 },
  { id: "Meal Rp.", label: "Meal Rp.", minWidth: 100 },
  { id: "Grading", label: "Grading", minWidth: 100 },
];

export function EmployeeList({
  dataEmployee,
  onDeleteFieldTable,
  onChangePage,
  currentPage,
  loading,
  search,
}: IEmployeeListProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleChangePage = (_event: unknown, newPage: number) => {
    onChangePage(search, newPage);
  };

  // const handleRowSelect = (id: number) => {
  //   console.log(id, selectedRows);

  //   if (selectedRows.includes(id)) {
  //     setSelectedRows(selectedRows.filter((rowId: number) => rowId !== id));
  //   } else {
  //     setSelectedRows([...selectedRows, id]);
  //   }
  // };

  // const handleHeaderSelect = () => {
  //   console.log("selectedRows:", selectedRows);

  //   setSelectedRows(
  //     selectedRows.length === dataEmployee.data.length
  //       ? []
  //       : dataEmployee.data.map((row) => row.id)
  //   );
  // };

  // Hàm xử lý khi chọn một hàng cụ thể
  const handleSelectRow = (rowId: number) => {
    const isSelected = selectedRows.includes(rowId);

    if (isSelected) {
      // Nếu hàng đã được chọn, ta sẽ loại bỏ nó khỏi danh sách đã chọn
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      // Nếu hàng chưa được chọn, ta sẽ thêm nó vào danh sách đã chọn
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  // Hàm xử lý khi chọn tất cả các item trên trang hiện tại
  const handleSelectAll = () => {
    console.log("selectedRows:", selectedRows);

    const allRowsOnCurrentPage = dataEmployee.data.map((row) => row.id);

    // Kiểm tra xem tất cả các hàng trên trang hiện tại đã được chọn hay chưa
    const allSelected = allRowsOnCurrentPage.every((rowId) =>
      selectedRows.includes(rowId)
    );

    if (allSelected) {
      // Nếu icon tất cả đã được chọn, ta sẽ loại bỏ các hàng khỏi danh sách đã chọn
      setSelectedRows(
        selectedRows.filter((rowId) => !allRowsOnCurrentPage.includes(rowId))
      );
    } else {
      // Nếu icon tất cả chưa đã được chọn, ta sẽ thêm các hàng vào danh sách đã chọn
      setSelectedRows([...selectedRows, ...allRowsOnCurrentPage]);
    }
  };

  const handleDeleteSelected = () => {
    onDeleteFieldTable(selectedRows);

    setOpen(false);
    setTimeout(() => {
      setSelectedRows([]);
    }, 500);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isRowSelected = (id: number) => selectedRows.includes(id);

  return (
    <div>
      <div className="flex justify-end border-gray-200 pb-3">
        <div className="flex items-center  gap-1 rounded-md">
          <Link
            className="text-bgrBlue text-14 font-normal"
            to={`${ROUTES.employee}/${ROUTES.createOrUpdate}`}
          >
            <div className="w-[90px] h-[35px] bg-bgrBlue2 rounded-md flex items-center justify-center gap-[6px] cursor-pointer hover:bg-[#0091ff14]">
              <img src={addIcon} alt="add-icon" />
              Add
            </div>
          </Link>
          <button
            disabled={selectedRows.length > 0 ? false : true}
            className={`w-[90px]  h-[35px] flex items-center justify-center gap-[6px] rounded-md ${
              selectedRows.length > 0
                ? " bg-red2 cursor-pointer hover:bg-[#e5484d14]"
                : " bg-bgrGray cursor-not-allowed"
            }`}
            onClick={handleClickOpen}
          >
            {selectedRows.length > 0 ? (
              <img src={trashIcon} alt="trash-icon" />
            ) : (
              <img src={trashDisableIcon} alt="trash-disable-icon" />
            )}
            <div
              className={`${
                selectedRows.length > 0 ? "text-red3" : "text-[#c1c8cd]"
              } text-14 font-normal`}
            >
              Delete
            </div>
          </button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#DFE3E6] mb-[10px]"></div>
      <Paper>
        <div className="relative">
          <div
            className={`max-w-[1000px] h-[470px]  mt-3  overflow-auto
            `}
          >
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      {/* <div
                        onClick={handleSelectAll}
                        className="relative flex items-center justify-center"
                      >
                        <Checkbox
                          color="primary"
                          checked={
                            selectedRows.length > 0 &&
                            selectedRows.length === dataEmployee.data.length
                          }
                          indeterminate={
                            selectedRows.length > 0 &&
                            selectedRows.length < dataEmployee.data.length
                          }
                          onChange={handleSelectAll}
                          inputProps={{
                            "aria-label": "select all desserts",
                          }}
                        />
                      </div> */}
                      <div
                        onClick={handleSelectAll}
                        className="relative flex items-center justify-center"
                      >
                        <Checkbox
                          color="primary"
                          checked={
                            selectedRows.length > 0 &&
                            selectedRows.length === dataEmployee.data.length
                          }
                          indeterminate={
                            selectedRows.length > 0 &&
                            selectedRows.length < dataEmployee.data.length
                          }
                          onChange={handleSelectAll}
                          inputProps={{
                            "aria-label": "select all desserts",
                          }}
                        />
                      </div>
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataEmployee?.data.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        selected={isRowSelected(row.id)}
                        onClick={() => handleSelectRow(row.id)}
                        className={`row-start-select cursor-pointer  ${
                          isRowSelected(row.id) ? "row-selected" : ""
                        } `}
                        onDoubleClick={() => {
                          navigate(
                            `${ROUTES.employee}/${ROUTES.createOrUpdate}/${row.id}`
                          );
                        }}
                      >
                        <TableCell align="center">
                          <Checkbox
                            color="primary"
                            onChange={() => handleSelectRow(row.id)}
                            checked={selectedRows.includes(row.id)}
                            inputProps={{
                              "aria-label": "select all desserts",
                            }}
                          />
                        </TableCell>
                        <TableCell>{row.staff_id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>
                          {row.gender === 1 ? "Female" : "Male"}
                        </TableCell>
                        <TableCell>
                          {row.card_number ? row.card_number : "---"}
                        </TableCell>
                        <TableCell>
                          {row.bank_account_no ? row.bank_account_no : "---"}
                        </TableCell>
                        <TableCell>
                          {row.family_card_number
                            ? row.family_card_number
                            : "---"}
                        </TableCell>
                        <TableCell>
                          {row.marriage_code ? row.marriage_code : "---"}
                        </TableCell>
                        <TableCell>
                          {row.mother_name ? row.mother_name : "---"}
                        </TableCell>
                        <TableCell>{row.pob ? row.pob : "---"}</TableCell>
                        <TableCell>{row.dob ? row.dob : "---"}</TableCell>
                        <TableCell>
                          {row.home_address_1 ? row.home_address_1 : "---"}
                        </TableCell>
                        <TableCell>
                          {row.home_address_2 ? row.home_address_2 : "---"}
                        </TableCell>

                        <TableCell>{row.nc_id ? row.nc_id : "---"}</TableCell>
                        <TableCell>
                          {row.contract_start_date
                            ? row.contract_start_date
                            : "---"}
                        </TableCell>

                        <TableCell>{row.type ? row.type : "---"}</TableCell>
                        <TableCell>
                          {row.department_name ? row.department_name : "---"}
                        </TableCell>

                        <TableCell>
                          {row.department_id === 1 ? "Permanent" : ""}
                        </TableCell>
                        <TableCell>
                          {row.card_number ? row.card_number : "---"}
                        </TableCell>
                        <TableCell>
                          {row.audit_salary ? row.audit_salary : "---"}
                        </TableCell>
                        <TableCell>
                          {row.position_name ? row.position_name : "---"}
                        </TableCell>
                        <TableCell>
                          {row.attendance_allowance_paid ? "Yes" : "No"}
                        </TableCell>
                        <TableCell>
                          {row.attendance_allowance_paid ? "Yes" : "No"}
                        </TableCell>
                        <TableCell>
                          {row.health_insurance ? row.health_insurance : "---"}
                        </TableCell>
                        <TableCell>
                          {row.grade_name ? row.grade_name : "---"}
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {!dataEmployee.data.length && (
                    <TableRow>
                      <TableCell>
                        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                          <div className="flex items-center justify-center flex-col">
                            <img src={noData} alt="no-data" />
                            <h6 className="mb-2 mt-8 text-18 text-[#11181c]">
                              No Data
                            </h6>
                            <p className="text-[#687076] text-16 font-normal">
                              Your record will be synced here once it ready
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          {loading && (
            <div className="absolute inset-0 bg-slate-50 rounded-lg">
              <div className="absolute top-[50%] right-[50%]">
                <svg
                  aria-hidden="true"
                  className="inline-block w-8 h-8 text-center  animate-spin fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    className="text-bgrBlue"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="w-full h-[1px] bg-[#DFE3E6] mt-[10px]"></div>
        <div className="flex items-center gap-5 py-4">
          <Pagination
            page={currentPage || 1}
            count={dataEmployee.last_page}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
            shape="rounded"
          />

          {dataEmployee.data.length > 0 && (
            <div className="bg-[#f1f3f5] py-2 px-3 m-w-[105px] m-h-[35px] rounded-md">
              <Typography>
                {dataEmployee.from} - {dataEmployee.to} of {dataEmployee.total}
              </Typography>
            </div>
          )}
        </div>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="large" variant="outlined" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleDeleteSelected}
          >
            Yes
          </Button>
        </DialogActions>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 absolute top-6 right-6 cursor-pointer"
          onClick={handleClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Dialog>
    </div>
  );
}
