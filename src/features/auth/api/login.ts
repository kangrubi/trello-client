import { axiosInstance } from "../../../lib/axios";
import { PublicApiResponse } from "../types";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export const postLogin = async (params: LoginParams) => {
  return axiosInstance.post<PublicApiResponse<LoginResponse>>(
    "/api/v1/auth/login",
    params,
    { withCredentials: true }
  );
};
