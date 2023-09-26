import { axiosInstance } from "../../../lib/axios";

export const postLogout = async () => {
  return axiosInstance.post("/api/v1/auth/logout");
};
