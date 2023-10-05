import { axiosInstance } from "../../../lib/axios";

interface ResetPasswordParams {
  token: string;
  password: string;
}

export const postResetPassword = async (params: ResetPasswordParams) => {
  return await axiosInstance.post("/api/v1/auth/reset-password", params);
};
