import { axiosInstance } from "../../../lib/axios";

interface ProfileResponse {
  username: string;
  email: string;
  profileImage?: string;
}

export const getProfile = async () => {
  return axiosInstance.get<ProfileResponse>("/api/v1/user/profile");
};
