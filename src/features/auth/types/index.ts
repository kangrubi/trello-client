export interface RegisterResponse {
  username: string;
  email: string;
  profileImage?: string;
}

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface ForgotPsswordParams {
  email: string;
}
