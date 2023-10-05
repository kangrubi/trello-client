import { axiosInstance } from "../../../lib/axios";

export const postForgotPassword = async (email: string) => {
  return await axiosInstance.post("/api/v1/auth/forgot-password", { email });
};
