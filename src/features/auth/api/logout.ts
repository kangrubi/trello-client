import { axiosInstance } from "../../../lib/axios";

export const postLogout = async () => {
  return await axiosInstance.post("/api/v1/auth/logout");
};
