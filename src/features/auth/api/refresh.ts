import { axiosInstance } from "@/lib/axios";

export const postRefresh = async (refreshToken: string) => {
  return axiosInstance.post("/auth/refresh", { refreshToken });
};
