export interface ILoginParams {
  username: string;
  password: string;
  factory?: string;
  company_id?: string;
}

export interface ISignUpParams {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: number | string;
  state: number | string;
}
