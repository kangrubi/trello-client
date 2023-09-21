import { axiosInstance } from "@/lib/axios";

interface PostRefreshResponse {
  accessToken: string;
  newRefreshToken: string;
}

export const postRefresh = async (refreshToken: string) => {
  return axiosInstance.post<PostRefreshResponse>("/auth/refresh", {
    refreshToken,
  });
};
