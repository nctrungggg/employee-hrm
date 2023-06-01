export interface IEmployeeParams {
  id: number;
  old_staff_id: number | null;
  staff_id: string;
  name: string;
  gender: string | number;
  department_id: string | number;
  company_id: number;
  manager_id: number | null;
  marriage_id: number | string | null;
  position_id: string | number | null;
  type: string;
  mother_name: string;
  dob: string | null;
  pob: string | null;
  ktp_no: string;
  nc_id: string;
  home_address_1: string;
  home_address_2: string | null;
  mobile_no: string | null;
  tel_no: string;
  bank_account_no: string;
  bank_name: string;
  card_number: string | null;
  family_card_number: string;
  health_insurance_no: string;
  safety_insurance_no: string;
  basic_salary: number;
  audit_salary: number;
  health_insurance: number;
  safety_insurance: number;
  meal_allowance: number;
  entitle_ot: boolean;
  meal_allowance_paid: boolean;
  operational_allowance_paid: boolean;
  attendance_allowance_paid: boolean;
  minimum_salary_used: string;
  contract_start_date: string | null;
  shift: string;
  grade_id: number | null;
  remark: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  department_name: string;
  marriage_code: string;
  position_name: string | null;
  grade_prefix: string;
  grade_name: string;
  manager_name: string | null;
  contracts: IContractParams[];
  benefits: IBenefitParams[];
  grade: IGradeParams;
}

export interface IBenefitParams {
  include(): any;
  id: number;
  name: string;
  code: string;
  type: number;
  value: string;
  company_id: number;
  created_at: string;
  updated_at: string;
}

export interface IGradeParams {
  id: number | null;
  name: string;
  prefix: string;
  company_id: number;
  created_at: string;
  updated_at: string;
  benefits: IBenefitParams[];
}

export interface IDataEmployeeParams {
  current_page: number;
  data: IEmployeeParams[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string;
    label: string;
    active: boolean;
  };
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface IContractParams {
  id: number;
  employee_id: number;
  contract_date: string;
  name: string;
  document: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// form employee Information
export interface IFormEmployeeInformationParams {
  nik: string;
  name: string;
  gender: string | number;
  mother_name: string;
  dob: string;
  pob: string;
  ktp_no: string;
  nc_id: string;
  home_address_1: string;
  home_address_2: string;
  mobile_no: string;
  tel_no: string;
  marriage_id: string;
  card_number: string;
  bank_account_no: string;
  bank_name: string;
  family_card_number: string;
  safety_insurance_no: string;
  health_insurance_no: string;
}
export interface IMarriageStatusParams {
  id: number;
  name: string;
  code: string;
  company_id: number;
  created_at: string;
  updated_at: string | null;
}
export interface IContractParams {
  id: number;
  employee_id: number;
  contract_date: string;
  name: string;
  document: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// contract information
export interface IFormContractEmployeeParams {
  contract_start_date: string;
  type: string;
  contract: IContractParams[];
}
export interface IFormDetailsEmployeeParams {
  department_id: string | number | null;
  position_id: string | number | null;
  entitle_ot: boolean;
  meal_allowance_paid: boolean;
  operational_allowance_paid: boolean;
  attendance_allowance_paid: boolean;
}

export interface IDepartmentParams {
  id: number;
  company_id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IPositionParams {
  id: number;
  company_id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

// from employee Salary information
export interface IFormSalaryEmployeeParams {
  basic_salary: number;
  audit_salary: number;
  safety_insurance: number;
  health_insurance: number;
  meal_allowance: number;
}

export interface IValueCheckboxParams {
  entitledOT: boolean;
  mealAllowancePaid: boolean;
  operationalAllowancePaid: boolean;
  attendanceAllowancePaid: boolean;
}
