import { axiosInstance } from "@/lib/axios";
import { storage } from "@/utils/storage";

interface GetProfileResponse {
  id: number;
  username: string;
  email: string;
  profileImage?: string;
  createdAt: string;
}

export const getProfile = () => {
  return axiosInstance.get<GetProfileResponse>("/user/profile", {
    headers: {
      Authorization: `Bearer ${storage.getToken().accessToken}`,
    },
  });
};
