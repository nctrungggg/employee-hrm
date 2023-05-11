import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { DataEmployee } from "../../../../types/employee";

interface IEmployeeListProps {
  dataEmployee: DataEmployee;
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

export function EmployeeList({ dataEmployee }: IEmployeeListProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  console.log(dataEmployee);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

  return (
    <div>
      <div className="max-w-[1000px] overflow-auto mt-3">
        <Paper>
          <TableContainer className=" max-h-[500px]">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    {/* <input
                      type="checkbox"
                      onChange={handleHeaderSelect}
                      checked={
                        selectedRows.length === dataEmployee.data.length &&
                        dataEmployee.data.length > 0
                      }
                    /> */}
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
                {dataEmployee.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
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
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 100]}
            component="div"
            count={dataEmployee.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
