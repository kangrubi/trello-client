import { axiosInstance } from "../../../lib/axios";
import { PublicApiResponse } from "../types";

interface RegisterResponse {
  username: string;
  email: string;
  profileImage: string;
}

interface RegisterParams {
  username: string;
  email: string;
  profileImage: string;
}

export const postRegister = (params: RegisterParams) => {
  return axiosInstance.post<PublicApiResponse<RegisterResponse>>(
    "/api/v1/auth/register",
    params
  );
};
