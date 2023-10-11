export interface PublicApiResponse<T> {
  statusCode: number;
  timestamp: string;
  data: T;
}
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

export interface CustomError {
  statusCode: number;
  message: {
    message: string;
    error: string;
    statusCode: number;
  };
  timestamp: string;
  path: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface LoginParams {
  email: string;
  password: string;
}
