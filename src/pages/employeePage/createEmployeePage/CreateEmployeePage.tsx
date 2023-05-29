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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import employeeApi from "../../../api/employeeApi";
import { AppDispatch, RootState } from "../../../app/store";
import { ROUTES } from "../../../configs/routes";
import { ContractInfomation } from "../../../modules/employee/components/createEmployee/contractInfomation/ContractInfomation";

import { EmployeeInfomation } from "../../../modules/employee/components/createEmployee/employeeInfomation/EmployeeInfomation";
import { EmployeeOthers } from "../../../modules/employee/components/createEmployee/employeeOthers/EmployeeOthers";
import { EmployeeSalary } from "../../../modules/employee/components/createEmployee/employeeSalary/EmployeeSalary";
import {
  changeValueEmployee,
  resetValueEmployee,
} from "../../../modules/employee/redux/employeeSlice";
import {
  IFormContractEmployeeParams,
  IFormDetailsEmployeeParams,
  IFormEmployeeInformationParams,
  IFormSalaryEmployeeParams,
} from "../../../types/employee";
import { EmployeeDetails } from "../../../modules/employee/components/createEmployee/employeeDetails/EmployeeDetails";

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
  const navigate = useNavigate();
  const employee = useSelector((state: RootState) => state.employee.employee);
  const { id } = useParams();

  const [valueTab, setValueTab] = useState(0);
  const [dob, setDob] = useState<string | null>(employee?.dob || "");
  const [contractDate, setContractDate] = useState<string | null>(
    employee.contract_start_date || ""
  );
  const [isActiveAdd, setIsActiveAdd] = useState<boolean>(false);

  const [tabErorrInfo, setTabErrorInfo] = useState<boolean>(false);
  const [tabErorrContract, setTabErrorContract] = useState<boolean>(false);
  const [tabErorrSalary, setTabErrorSalary] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  // state employee Information form
  const [formEmployeeInfomation, setFormEmployeeInfomation] =
    useState<IFormEmployeeInformationParams>({
      nik: employee.staff_id,
      name: employee.name,
      gender: employee.gender,
      mother_name: employee.mother_name,
      dob: employee.dob,
      pob: String(employee.pob),
      ktp_no: employee.ktp_no,
      nc_id: employee.nc_id,
      home_address_1: employee.home_address_1,
      home_address_2: String(employee.home_address_2),
      mobile_no: String(employee.mobile_no),
      tel_no: employee.tel_no,
      marriage_id: String(employee.marriage_id),
      card_number: String(employee.card_number),
      bank_account_no: employee.bank_account_no,
      bank_name: employee.bank_name,
      family_card_number: employee.family_card_number,
      safety_insurance_no: employee.safety_insurance_no,
      health_insurance_no: employee.health_insurance_no,
    });

  // state contract information form
  const [formContractEmployee, setFormContractEmployee] =
    useState<IFormContractEmployeeParams>({
      contract_start_date: employee.contract_start_date,
      type: String(employee.type),
      contract: [],
    });

  // state employee detail information
  const [formDetailEmployee, setFormDetailEmployee] =
    useState<IFormDetailsEmployeeParams>({
      department_id: employee.department_id,
      position_id: employee.position_id,
    });

  // state employee Salary information
  const [formSalaryEmployee, setFormSalaryEmployee] =
    useState<IFormSalaryEmployeeParams>({
      basic_salary: employee.basic_salary,
      audit_salary: employee.audit_salary,
      safety_insurance: employee.safety_insurance,
      health_insurance: employee.health_insurance,
      meal_allowance: employee.meal_allowance,
    });

  const { name, ktp_no, nc_id, gender } = formEmployeeInfomation;
  const { contract_start_date, type } = formContractEmployee;
  const { basic_salary, audit_salary, safety_insurance, meal_allowance } =
    formSalaryEmployee;

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);

    if (!name && !ktp_no && !nc_id && !gender && newValue !== 0) {
      setTabErrorInfo(true);
    }
    if (!contract_start_date && !type && newValue !== 1) {
      setTabErrorContract(true);
    }

    if (
      !String(basic_salary) ||
      !String(audit_salary) ||
      !String(safety_insurance) ||
      (!String(meal_allowance) && newValue !== 3)
    ) {
      setTabErrorSalary(true);
    }
  };

  // handle Add employee information Submitted
  const handleChangeFormInfoEmployee = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;

    setFormEmployeeInfomation((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleDateChangeDob = (dateString: string | null) => {
    setFormEmployeeInfomation((prevValues) => ({
      ...prevValues,
      dob: dateString || "",
    }));

    setDob(dateString);
  };

  // handle Add contract information Submitted
  const handleChangeFormContract = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;

    setFormContractEmployee((prevValues) => ({
      ...prevValues,
      [name]: value,
      contract_start_date: contractDate || "",
    }));
  };
  const handleDateChangeContractDate = (dateString: string | null) => {
    setFormContractEmployee((prevValues) => ({
      ...prevValues,
      contract_start_date: dateString || "",
    }));

    setContractDate(dateString);
  };

  // handle Add Detail Employee Information Submitted
  const handleChangeFormDetail = () => {
    (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
      console.log(e.target);

      const { name, value } = e.target;

      setFormDetailEmployee((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
  };

  // handle Add Salary Employee Information Submitted
  const handleFormChangeSalary = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;

    setFormSalaryEmployee((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // check data when adding employee
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkInvalidValueForm = () => {
    if (name && ktp_no && nc_id && dob && gender) {
      setTabErrorInfo(false);
    } else {
      setTimeout(() => {
        setTabErrorInfo(true);
      }, 2000);
    }
    if (contract_start_date && type) {
      setTabErrorContract(false);
    }

    if (
      String(basic_salary) &&
      String(audit_salary) &&
      String(safety_insurance) &&
      String(safety_insurance)
    ) {
      setTabErrorSalary(false);
    }

    if (
      name &&
      ktp_no &&
      nc_id &&
      dob &&
      contract_start_date &&
      type &&
      gender
    ) {
      setIsActiveAdd(true);
    } else {
      setIsActiveAdd(false);
    }
  };
  useEffect(() => {
    checkInvalidValueForm();
  }, [
    name,
    ktp_no,
    nc_id,
    gender,
    dob,
    contract_start_date,
    type,
    checkInvalidValueForm,
  ]);

  // update data vào redux
  useEffect(() => {
    const mergedData = {
      ...formEmployeeInfomation,
      ...formContractEmployee,
      ...formDetailEmployee,
      ...formSalaryEmployee,
    };

    dispatch(changeValueEmployee(mergedData));
  }, [
    dispatch,
    formContractEmployee,
    formDetailEmployee,
    formEmployeeInfomation,
    formSalaryEmployee,
  ]);

  // handle add employee
  const handleAddEmployee = async () => {
    const newData = Object.assign(
      {},
      employee,
      formEmployeeInfomation,
      formContractEmployee,
      formDetailEmployee,
      formSalaryEmployee
    );

    try {
      const {
        data: { message },
      } = await employeeApi.addEmployeeApi(newData);

      toast.success(message);

      setTimeout(() => {
        navigate(ROUTES.employee);
      }, 250);

      dispatch(resetValueEmployee());
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="pt-[92px] pl-[376px] ">
      <div className="w-[1030px]">
        <div className="flex justify-between items-center">
          <h1 className="text-36 font-medium text-textPrimary mb-10">
            Employee Management
          </h1>
          {id ? (
            <Button
              type="submit"
              className="h-[48px] w-[140px] !capitalize !rounded-md !bg-bgrBlue !text-white"
            >
              Save Change
            </Button>
          ) : (
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
          )}
        </div>

        <Box sx={{ width: "100%" }}>
          <Box>
            <Tabs
              className="tab-container "
              value={valueTab}
              onChange={handleChangeTabs}
              aria-label="basic tabs example"
            >
              <Tab
                icon={
                  tabErorrInfo ? (
                    <ErrorOutlineRoundedIcon style={{ fontSize: 22 }} />
                  ) : (
                    ""
                  )
                }
                iconPosition={"end"}
                className={`tab-button  ${tabErorrInfo && "tab-button-error"}`}
                component="button"
                label="Employee Information"
                {...a11yProps(0)}
              />
              <Tab
                icon={
                  tabErorrContract ? (
                    <ErrorOutlineRoundedIcon style={{ fontSize: 22 }} />
                  ) : (
                    ""
                  )
                }
                iconPosition={"end"}
                className={`tab-button ${
                  tabErorrContract && "tab-button-error"
                }`}
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
                icon={
                  tabErorrSalary ? (
                    <ErrorOutlineRoundedIcon style={{ fontSize: 22 }} />
                  ) : (
                    ""
                  )
                }
                iconPosition={"end"}
                className={`tab-button ${tabErorrSalary && "tab-button-error"}`}
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

          <div className="shadow-sm bg-bgrGray2 p-[10px] rounded-xl  mt-5">
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
                  handleChangeFormInfoEmployee={handleChangeFormInfoEmployee}
                  handleDateChangeDob={handleDateChangeDob}
                />
              </TabPanel>
              <TabPanel value={valueTab} index={1}>
                <ContractInfomation
                  formContractEmployee={formContractEmployee}
                  handleChangeFormContract={handleChangeFormContract}
                  handleDateChangeContractDate={handleDateChangeContractDate}
                />
              </TabPanel>
              <TabPanel value={valueTab} index={2}>
                <EmployeeDetails
                  formDetailEmployee={formDetailEmployee}
                  handleChangeFormDetail={handleChangeFormDetail}
                />
              </TabPanel>
              <TabPanel value={valueTab} index={3}>
                <EmployeeSalary
                  formSalaryEmployee={formSalaryEmployee}
                  handleFormChangeSalary={handleFormChangeSalary}
                />
              </TabPanel>
              <TabPanel value={valueTab} index={4}>
                <EmployeeOthers />
              </TabPanel>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
