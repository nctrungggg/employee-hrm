/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import {
  Button,
  SelectChangeEvent,
  Skeleton,
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

import { unwrapResult } from "@reduxjs/toolkit";
import { EmployeeDetails } from "../../../modules/employee/components/createEmployee/employeeDetails/EmployeeDetails";
import { EmployeeInfomation } from "../../../modules/employee/components/createEmployee/employeeInfomation/EmployeeInfomation";
import { EmployeeOthers } from "../../../modules/employee/components/createEmployee/employeeOthers/EmployeeOthers";
import { EmployeeSalary } from "../../../modules/employee/components/createEmployee/employeeSalary/EmployeeSalary";
import {
  getBenefits,
  getGrades,
  getIdEmployee,
  resetErorrsEmployee,
  resetValueEmployee,
} from "../../../modules/employee/redux/employeeSlice";
import {
  IBenefitParams,
  IGradeParams,
  IValueCheckboxParams,
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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const employee = useSelector((state: RootState) => state.employee.employee);
  const [employeeState, setEmployeeState] = useState(employee);

  const { id } = useParams();
  const idEmployee = Number(id);

  const [valueTab, setValueTab] = useState(0);

  const [contractDate, setContractDate] = useState<string | null>(
    employeeState.contract_start_date || ""
  );

  const [isActiveAdd, setIsActiveAdd] = useState<boolean>(false);

  const [tabErorrInfo, setTabErrorInfo] = useState<boolean>(false);
  const [tabErorrContract, setTabErrorContract] = useState<boolean>(false);
  const [tabErorrSalary, setTabErrorSalary] = useState<boolean>(false);

  const [loadingBttUpdate, setLoadingBttUpdate] = useState(false);

  const {
    name,
    ktp_no,
    nc_id,
    gender,
    contract_start_date,
    type,
    basic_salary,
    audit_salary,
    safety_insurance,
    meal_allowance,
    dob,
  } = employeeState;

  useEffect(() => {
    setEmployeeState(employee);
  }, [dispatch, employee]);

  useEffect(() => {
    dispatch(resetErorrsEmployee());
  }, [dispatch]);

  const handleChangeTabs = (_event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);

    if (!name && !ktp_no && !nc_id && !gender && newValue !== 0) {
      setTabErrorInfo(true);
    }

    if (
      (!contract_start_date ||
        contract_start_date === "Invalid date" ||
        !type) &&
      newValue !== 1
    ) {
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

    setEmployeeState((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDateChangeDob = (dateString: string | null) => {
    setEmployeeState((prevValues) => ({
      ...prevValues,
      dob: dateString || "",
    }));

    // setDob(dateString);
  };

  // handle Add contract information Submitted
  const handleChangeFormContract = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setEmployeeState((prevValues) => ({
      ...prevValues,
      [name]: value,
      contract_start_date: contractDate || "",
    }));
  };
  const handleDateChangeContractDate = (dateString: string | null) => {
    setEmployeeState((prevValues) => ({
      ...prevValues,
      contract_start_date: dateString || "",
    }));

    setContractDate(dateString);
  };

  // handle Add Detail Employee Information Submitted
  const handleChangeFormDetail = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setEmployeeState((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChangeCheckboxFormDetail = (
    valueCheckbox: IValueCheckboxParams
  ) => {
    setEmployeeState((prevValues) => ({
      ...prevValues,
      entitle_ot: valueCheckbox.entitledOT,
      meal_allowance_paid: valueCheckbox.mealAllowancePaid,
      operational_allowance_paid: valueCheckbox.operationalAllowancePaid,
      attendance_allowance_paid: valueCheckbox.attendanceAllowancePaid,
    }));
  };

  // handle Add Salary Employee Information Submitted
  const handleFormChangeSalary = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setEmployeeState((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // handle Add Others Employee Information Submitted
  const handleFormChangeOthers = (
    selectedGradeId: number | null,
    selectedOption: IBenefitParams[],
    remark: string,
    gradeOption: IGradeParams
  ) => {
    setEmployeeState((prevValue) => ({
      ...prevValue,
      grade: {
        id: selectedGradeId,
        company_id: gradeOption?.company_id,
        name: gradeOption?.name,
        benefits: gradeOption?.benefits,
        created_at: gradeOption?.created_at,
        prefix: gradeOption?.prefix,
        updated_at: gradeOption?.updated_at,
      },
      remark: remark,
      grade_id: selectedGradeId,
      benefits: selectedOption,
    }));
  };

  // check data when adding employee
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkInvalidValueForm = () => {
    // check tabs err information
    const hasErrorInfo = !(
      name &&
      ktp_no &&
      nc_id &&
      dob &&
      dob !== "Invalid date" &&
      String(gender)
    );
    setTabErrorInfo(hasErrorInfo);

    // check tabs err salary
    const fieldsToCheck = [
      basic_salary,
      audit_salary,
      safety_insurance,
      meal_allowance,
    ];

    const hasErrorSalary = !fieldsToCheck.every(
      (field) => String(field) && Number(field) >= 0
    );
    setTabErrorSalary(hasErrorSalary);

    // check tabs err contract
    if (contract_start_date && contract_start_date !== "Invalid date" && type) {
      setTabErrorContract(false);
    }

    // set active button add
    if (
      !tabErorrInfo &&
      contract_start_date &&
      contract_start_date !== "Invalid date" &&
      type &&
      !tabErorrSalary
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
  // useEffect(() => {
  //   // dispatch(changeValueEmployee(employeeState));
  // }, [dispatch, employeeState]);

  // handle add employee

  const handleAddEmployee = async () => {
    // transformed data form others
    const { benefits, gender } = employeeState;

    const benefitsIds = benefits.map((benefit) => benefit.id);

    const newFormEmployee = {
      benefits: benefitsIds,
      gender: Number(gender),
    };

    // convert data form detail
    const transformedFormDetailEmployee = Object.fromEntries(
      Object.entries(employeeState).map(([key, value]) => [
        key,
        value === true ? 1 : value === false ? 0 : value,
      ])
    );

    const newData = Object.assign(
      {},
      employeeState,
      transformedFormDetailEmployee,
      newFormEmployee
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

  // call api grades and benefits
  useEffect(() => {
    (async () => {
      await Promise.all([dispatch(getGrades()), dispatch(getBenefits())]).then(
        ([resultActionDepartment, resultActionPosition]) => {
          unwrapResult(resultActionDepartment);
          unwrapResult(resultActionPosition);
        }
      );
    })();
  }, [dispatch]);

  // call api id employee
  useEffect(() => {
    (async () => {
      if (idEmployee) {
        const resultAction = await dispatch(getIdEmployee(idEmployee));
        unwrapResult(resultAction);
      } else {
        dispatch(resetValueEmployee());
      }
    })();
  }, [dispatch, idEmployee]);

  // handle update employee
  const handleUpdateEmployee = async () => {
    const { benefits } = employeeState;
    const benefitsIds = benefits.map((benefit) => benefit.id);
    const newFormOthersEmployee = {
      benefits: benefitsIds,
    };

    // convert data form detail
    const transformedFormDetailEmployee = Object.fromEntries(
      Object.entries(employeeState).map(([key, value]) => [
        key,
        value === true ? 1 : value === false ? 0 : value,
      ])
    );
    const newData = Object.assign(
      {},
      employeeState,
      transformedFormDetailEmployee,
      newFormOthersEmployee
    );
    try {
      setLoadingBttUpdate(true);

      const {
        data: { message },
      } = await employeeApi.updateEmployee(newData, id);

      toast.success(message);

      setLoadingBttUpdate(false);

      navigate(ROUTES.employee);

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
              variant="contained"
              type="submit"
              className={`h-[48px] w-[140px] !capitalize !rounded-md ${
                isActiveAdd && "!bg-bgrBlue"
              } !text-white cursor-pointer`}
              disabled={isActiveAdd ? false : true}
              onClick={handleUpdateEmployee}
            >
              {loadingBttUpdate ? (
                <div>
                  <svg
                    aria-hidden="true"
                    className="inline-block w-6 h-6 text-center text-white animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      className="text-slate-300"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                "Save Change"
              )}
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
            <div className="mb-6">
              <TabPanel value={valueTab} index={0}>
                <EmployeeInfomation
                  employeeState={employeeState}
                  handleChangeFormInfoEmployee={handleChangeFormInfoEmployee}
                  handleDateChangeDob={handleDateChangeDob}
                />
              </TabPanel>
              <TabPanel value={valueTab} index={1}>
                <ContractInfomation
                  employeeState={employeeState}
                  handleChangeFormContract={handleChangeFormContract}
                  handleDateChangeContractDate={handleDateChangeContractDate}
                />
              </TabPanel>
              <TabPanel value={valueTab} index={2}>
                <EmployeeDetails
                  employeeState={employeeState}
                  handleChangeFormDetail={handleChangeFormDetail}
                  handleChangeCheckboxFormDetail={
                    handleChangeCheckboxFormDetail
                  }
                />
              </TabPanel>
              <TabPanel value={valueTab} index={3}>
                <EmployeeSalary
                  employeeState={employeeState}
                  handleFormChangeSalary={handleFormChangeSalary}
                />
              </TabPanel>
              <TabPanel value={valueTab} index={4}>
                <EmployeeOthers
                  employeeState={employeeState}
                  handleFormChangeOthers={handleFormChangeOthers}
                />
              </TabPanel>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
