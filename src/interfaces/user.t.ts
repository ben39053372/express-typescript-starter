
export interface IUserInputDTO {
  username: string;
  password: string;
  email: string;
}

export interface IUser extends IUserInputDTO {
  id: string;
  active: boolean;
}

export interface IUserLogin {
  loginName: string;
  saltedPassword: string;
}