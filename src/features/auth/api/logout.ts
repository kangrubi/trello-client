import { axiosInstance } from "@/lib/axios";

export const postLogout = async (refreshToken: string) => {
  return axiosInstance.post("/auth/logout", { refreshToken });
};
