import { axiosInstance } from "../../../lib/axios";
import { PublicApiResponse } from "../types";

interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  username: string;
  email: string;
  profileImage?: string;
}

export const postRegister = async (params: RegisterParams) => {
  return axiosInstance.post<PublicApiResponse<RegisterResponse>>(
    "/api/v1/auth/register",
    params
  );
};
