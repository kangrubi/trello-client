export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
}
export interface IRegisterResponse {
  username: string;
  email: string;
  profileImage: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
export interface ILoginResponse {
  accessToken: string;
}
