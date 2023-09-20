import { axiosInstance } from "@/lib/axios";

interface GetProfileResponse {
  id: number;
  username: string;
  email: string;
  profileImage?: string;
  createdAt: string;
}

export const getProfile = () => {
  return axiosInstance.get<GetProfileResponse>("/user/profile");
};
