/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import {
  Button,
  SelectChangeEvent,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import employeeApi from "../../../api/employeeApi";
import { AppDispatch } from "../../../app/store";
import { ContactInfomation } from "../../../modules/employee/components/createEmployee/contactInfomation/ContactInfomation";
import { EmployeeDetails } from "../../../modules/employee/components/createEmployee/employeeDetails/EmployeeDetails";
import { EmployeeInfomation } from "../../../modules/employee/components/createEmployee/employeeInfomation/EmployeeInfomation";
import { EmployeeOthers } from "../../../modules/employee/components/createEmployee/employeeOthers/EmployeeOthers";
import { EmployeeSalary } from "../../../modules/employee/components/createEmployee/employeeSalary/EmployeeSalary";
import {
  IEmployeeParams,
  IFormEmployeeInformationParams,
} from "../../../types/employee";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function CreateEmployeePage() {
  const [valueTab, setValueTab] = useState(0);
  const [date, setDate] = useState<string | null>("");
  const [isActiveAdd, setIsActiveAdd] = useState<boolean>(false);
  const [isActiveAddContract, setIsActiveAddContract] =
    useState<boolean>(false);

  // state employee Information form
  const [formEmployeeInfomation, setFormEmployeeInfomation] =
    useState<IFormEmployeeInformationParams>({
      nik: "",
      name: "",
      gender: "",
      mother_name: "",
      dob: "",
      pob: "",
      ktp_no: "",
      nc_id: "",
      home_address_1: "",
      home_address_2: "",
      mobile_no: "",
      tel_no: "",
      marriage_id: "",
      card_number: "",
      bank_account_no: "",
      bank_name: "",
      family_card_number: "",
      safety_insurance_no: "",
      health_insurance_no: "",
    });

  const { name, ktp_no, nc_id, gender } = formEmployeeInfomation;

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  // handle Add employee information Submitted
  const handleChangeFormEmployee = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    console.log(formEmployeeInfomation);

    const value = e.target.value;
    setFormEmployeeInfomation((prevValues) => ({
      ...prevValues,
      [e.target.name]: value,
      dob: date || "",
    }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkInvalidValueForm = () => {
    if (name && ktp_no && nc_id && date && (gender === 0 || gender === 1)) {
      setIsActiveAdd(true);
    } else {
      setIsActiveAdd(false);
    }
  };

  useEffect(() => {
    checkInvalidValueForm();
  }, [name, ktp_no, nc_id, gender, date, checkInvalidValueForm]);

  // handle add employee
  const handleAddEmployee = async () => {
    const employeeData: IEmployeeParams = {
      attendance_allowance_paid: 1,
      audit_salary: 0,
      bank_account_no: "",
      bank_name: "",
      basic_salary: 0,
      card_number: "",
      company_id: 1,
      contract_start_date: "2023-05-01",
      contracts: [],
      created_at: "",
      deleted_at: "",
      department_id: 1,
      department_name: "",
      dob: "",
      entitle_ot: 1,
      family_card_number: "",
      gender: 1,
      grade_id: 1,
      grade_name: "",
      grade_prefix: "",
      health_insurance: 0,
      health_insurance_no: "",
      home_address_1: "",
      home_address_2: "",
      id: 0,
      ktp_no: "sadasd",
      manager_id: 1,
      manager_name: "",
      marriage_code: "",
      marriage_id: 1,
      meal_allowance: 0,
      meal_allowance_paid: 1,
      minimum_salary_used: "",
      mobile_no: "",
      mother_name: "",
      name: "sadsadsad",
      nc_id: "ádasdas",
      old_staff_id: 0,
      operational_allowance_paid: 1,
      pob: "",
      position_id: 1,
      position_name: "",
      remark: "",
      safety_insurance: 0,
      safety_insurance_no: "",
      shift: "",
      staff_id: "",
      tel_no: "",
      type: "0",
      updated_at: "",
    };

    const newData = Object.assign({}, employeeData, formEmployeeInfomation);

    try {
      const {
        data: { message },
      } = await employeeApi.addEmployeeApi(newData);

      toast.success(message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="pt-[92px] pl-[376px]">
      <div className="flex justify-between items-center">
        <h1 className="text-36 font-medium text-textPrimary mb-10">
          Employee Management
        </h1>

        <Button
          disabled={isActiveAdd ? false : true}
          className={` !capitalize !py-2 !px-6 !h-12 !font-normal !rounded-md ${
            isActiveAdd && "!bg-bgrBlue"
          }`}
          variant="contained"
          onClick={handleAddEmployee}
        >
          Add
        </Button>
      </div>

      <Box sx={{ width: "100%" }}>
        <Box>
          <Tabs
            className="tab-container"
            value={valueTab}
            onChange={handleChangeTabs}
            aria-label="basic tabs example"
          >
            <Tab
              icon={
                !isActiveAdd ? (
                  <ErrorOutlineRoundedIcon style={{ fontSize: 22 }} />
                ) : (
                  ""
                )
              }
              iconPosition={"end"}
              className={`tab-button ${!isActiveAdd && "tab-button-error"}`}
              // className="tab-button"
              component="button"
              label="Employee Information"
              {...a11yProps(0)}
            />
            <Tab
              className="tab-button"
              component="button"
              label="Contract Information"
              {...a11yProps(1)}
            />
            <Tab
              className="tab-button"
              component="button"
              label="Employment Details"
              {...a11yProps(2)}
            />
            <Tab
              className="tab-button"
              component="button"
              label="Salary & Wages"
              {...a11yProps(3)}
            />
            <Tab
              className="tab-button"
              component="button"
              label="Others"
              {...a11yProps(4)}
            />
          </Tabs>
        </Box>

        <div className="shadow-md bg-bgrGray2 p-[10px] rounded-xl  mt-5">
          <div className="flex justify-between">
            <h3 className="text-18 font-medium">Personal Information</h3>
            <p className="text-14 font-normal text-textSecondary">
              Required (<span className="text-red3">*</span>)
            </p>
          </div>
          <div className="w-full h-[1px] bg-[#DFE3E6] my-[10px]"></div>
          <div className="mb-6">
            <TabPanel value={valueTab} index={0}>
              <EmployeeInfomation
                FormEmployeeInformation={formEmployeeInfomation}
                handleChangeFormEmployee={handleChangeFormEmployee}
                handleDateChange={setDate}
              />
            </TabPanel>
            <TabPanel value={valueTab} index={1}>
              <ContactInfomation
              // formContractEmployee={formContractEmployee}
              // handleFormContractChange={handleFormContractChange}
              />
            </TabPanel>
            <TabPanel value={valueTab} index={2}>
              <EmployeeDetails
              // formDetailEmployee={formDetailEmployee}
              // handleFormDetailChange={handleFormDetailChange}
              />
            </TabPanel>
            <TabPanel value={valueTab} index={3}>
              <EmployeeSalary
              // formSalaryEmployee={formSalaryEmployee}
              // handleFormSalaryChange={handleFormSalaryChange}
              />
            </TabPanel>
            <TabPanel value={valueTab} index={4}>
              <EmployeeOthers />
            </TabPanel>
          </div>
        </div>
      </Box>
    </div>
  );
}
