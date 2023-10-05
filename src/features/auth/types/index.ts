export interface PublicApiResponse<T> {
  data: T;
  statusCode: number;
  timestamp: string;
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

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}
