import { ICompanyParams } from "./company";

export interface IUserInfoParams {
  company: ICompanyParams;
  id: number;
  username: string;
  email: string;
  role_id: number;
  employee_id: number | null;
  department_id: number | null;
  company_id: number;
  register_token: string | number;
  email_verified_at: string | null;
  is_active: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  department_name: string;
  position_name: string;
  permissions: unknown;
}
