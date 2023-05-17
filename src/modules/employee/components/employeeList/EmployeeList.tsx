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
import { useState } from "react";
import { Link } from "react-router-dom";
import addIcon from "../../../../assets/add.svg";
import trashIcon from "../../../../assets/trash.svg";
import trashDisableIcon from "../../../../assets/trashDisable.svg";
import { IDataEmployeeParams } from "../../../../types/employee";

interface IEmployeeListProps {
  dataEmployee: IDataEmployeeParams;
  onDeleteFieldTable: (listId: number[]) => void;
  onChangePage: (keyword: string | "", page: number) => void;
  currentPage: number;
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
}: IEmployeeListProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    onChangePage("", newPage);
  };

  const handleRowSelect = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId: number) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleHeaderSelect = () => {
    setSelectedRows(
      selectedRows.length === dataEmployee.data.length
        ? []
        : dataEmployee.data.map((row) => row.id)
    );
  };

  const isRowSelected = (id: number) => selectedRows.includes(id);

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

  return (
    <div>
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
        <div className="max-w-[1000px] h-[470px] overflow-auto mt-3 relative">
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <div
                      onClick={handleHeaderSelect}
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
                        onChange={handleHeaderSelect}
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
                      onClick={() => handleRowSelect(row.id)}
                      className={`row-start-select  ${
                        isRowSelected(row.id) ? "row-selected" : ""
                      } `}
                      // onDoubleClick={() => {
                      //   console.log(row.id);
                      //   navigate(`/employee/create-or-update/${row.id}`);
                      // }}
                    >
                      <TableCell align="center">
                        <Checkbox
                          color="primary"
                          onChange={() => handleRowSelect(row.id)}
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
                      <TableCell>{row.card_number}</TableCell>
                      <TableCell>{row.bank_account_no}</TableCell>
                      <TableCell>{row.family_card_number}</TableCell>
                      <TableCell>{row.marriage_code}</TableCell>
                      <TableCell>{row.mother_name}</TableCell>
                      <TableCell>{row.pob}</TableCell>
                      <TableCell>{row.dob}</TableCell>
                      <TableCell>{row.home_address_1}</TableCell>
                      <TableCell>{row.nc_id}</TableCell>
                      <TableCell>{row.contract_start_date}</TableCell>
                      <TableCell>{row.contract_start_date}</TableCell>
                      <TableCell>{row.card_number}</TableCell>
                      <TableCell>{row.card_number}</TableCell>
                      <TableCell>{row.department_name}</TableCell>
                      <TableCell>
                        {row.department_id === 1 ? "Permanent" : ""}
                      </TableCell>
                      <TableCell>{row.audit_salary}</TableCell>
                      <TableCell>{row.position_name}</TableCell>
                      <TableCell>
                        {row.attendance_allowance_paid === 1 ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                        {row.attendance_allowance_paid === 1 ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>{row.health_insurance}</TableCell>
                      <TableCell>{row.grade_name}</TableCell>
                    </TableRow>
                  );
                })}

                {dataEmployee?.data.length === 0 && (
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                    <div className="flex items-center justify-center flex-col">
                      <svg
                        width="113"
                        height="114"
                        viewBox="0 0 113 114"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="56"
                          cy="55.5"
                          r="55.5"
                          fill="#6350FF"
                          fillOpacity="0.1"
                        ></circle>
                        <rect
                          x="29.3599"
                          y="34.4102"
                          width="56.98"
                          height="42.92"
                          rx="2"
                          fill="#6E56CF"
                        ></rect>
                        <rect
                          x="34.9097"
                          y="49.9492"
                          width="37.74"
                          height="2.22"
                          rx="1"
                          fill="white"
                          fillOpacity="0.2"
                        ></rect>
                        <path
                          d="M20.1099 50.9305C20.1099 49.8104 20.1099 49.2503 20.3279 48.8225C20.5196 48.4462 20.8256 48.1402 21.2019 47.9485C21.6297 47.7305 22.1898 47.7305 23.3099 47.7305H47.161C47.7691 47.7305 48.0731 47.7305 48.3505 47.8124C48.5961 47.885 48.8255 48.004 49.0262 48.1631C49.2529 48.3428 49.4278 48.5914 49.7778 49.0886L55.0439 56.5704C55.3939 57.0677 55.5689 57.3163 55.7955 57.4959C55.9963 57.655 56.2256 57.7741 56.4713 57.8466C56.7487 57.9286 57.0527 57.9286 57.6607 57.9286H88.6899C89.81 57.9286 90.37 57.9286 90.7978 58.1466C91.1742 58.3383 91.4801 58.6443 91.6719 59.0206C91.8899 59.4484 91.8899 60.0085 91.8899 61.1286V98.9205C91.8899 100.041 91.8899 100.601 91.6719 101.028C91.4801 101.405 91.1742 101.711 90.7978 101.902C90.37 102.12 89.81 102.12 88.6899 102.12H23.3099C22.1898 102.12 21.6297 102.12 21.2019 101.902C20.8256 101.711 20.5196 101.405 20.3279 101.028C20.1099 100.601 20.1099 100.041 20.1099 98.9205V50.9305Z"
                          fill="#F7CE00"
                        ></path>
                        <rect
                          x="57.48"
                          y="93.6094"
                          width="24.42"
                          height="2.96"
                          rx="1"
                          fill="white"
                        ></rect>
                        <rect
                          x="34.9097"
                          y="37.3691"
                          width="45.14"
                          height="2.96"
                          rx="1"
                          fill="white"
                          fillOpacity="0.2"
                        ></rect>
                        <rect
                          x="34.9097"
                          y="43.2891"
                          width="24.42"
                          height="1.48"
                          rx="0.74"
                          fill="white"
                          fillOpacity="0.2"
                        ></rect>
                        <rect
                          x="83.3799"
                          y="93.6094"
                          width="2.96"
                          height="2.96"
                          rx="1"
                          fill="white"
                        ></rect>
                        <circle
                          cx="5.6802"
                          cy="92.8706"
                          r="1.48"
                          fill="#F7CE00"
                        ></circle>
                        <circle
                          cx="78.5698"
                          cy="112.48"
                          r="1.48"
                          fill="#6E56CF"
                        ></circle>
                        <circle
                          cx="106.32"
                          cy="94.7206"
                          r="3.33"
                          fill="#F7CE00"
                        ></circle>
                        <circle
                          cx="5.6801"
                          cy="21.0898"
                          r="3.33"
                          fill="#6E56CF"
                        ></circle>
                        <circle
                          cx="91.8899"
                          cy="70.3001"
                          r="2.22"
                          fill="#6E56CF"
                        ></circle>
                        <g filter="url(#filter0_d_5951_39835)">
                          <circle
                            cx="96.3299"
                            cy="17.7605"
                            r="12.95"
                            fill="#6E56CF"
                          ></circle>
                          <path
                            d="M95.5781 22.5462C96.8068 22.5459 98.0001 22.1346 98.968 21.3777L102.011 24.4207L102.99 23.4419L99.9469 20.3989C100.704 19.431 101.116 18.2374 101.116 17.0084C101.116 13.9551 98.6316 11.4707 95.5781 11.4707C92.5245 11.4707 90.04 13.9551 90.04 17.0084C90.04 20.0618 92.5245 22.5462 95.5781 22.5462ZM95.5781 12.8551C97.8687 12.8551 99.7316 14.7179 99.7316 17.0084C99.7316 19.299 97.8687 21.1617 95.5781 21.1617C93.2874 21.1617 91.4245 19.299 91.4245 17.0084C91.4245 14.7179 93.2874 12.8551 95.5781 12.8551Z"
                            fill="white"
                          ></path>
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_5951_39835"
                            x="76.3799"
                            y="3.81055"
                            width="35.8999"
                            height="35.9004"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            ></feFlood>
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            ></feColorMatrix>
                            <feOffset dx="-2" dy="4"></feOffset>
                            <feGaussianBlur stdDeviation="2.5"></feGaussianBlur>
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0.388235 0 0 0 0 0.313726 0 0 0 0 1 0 0 0 0.25 0"
                            ></feColorMatrix>
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_5951_39835"
                            ></feBlend>
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_5951_39835"
                              result="shape"
                            ></feBlend>
                          </filter>
                        </defs>
                      </svg>
                      <h6 className="mb-2 mt-8">No Data</h6>
                      <p className="text-[#687076]">
                        Your record will be synced here once it ready
                      </p>
                    </div>
                  </div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="flex items-center gap-5 py-4">
          <Pagination
            page={currentPage}
            count={dataEmployee.last_page}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
            shape="rounded"
          />

          {dataEmployee && (
            <Typography>
              {dataEmployee.from} - {dataEmployee.to} of {dataEmployee.total}
            </Typography>
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
