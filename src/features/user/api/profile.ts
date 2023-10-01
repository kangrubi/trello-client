import { axiosInstance } from "../../../lib/axios";
import { PublicApiResponse } from "../../auth/types";

interface ProfileResponse {
  username: string;
  email: string;
  profileImage?: string;
}

export const getProfile = async () => {
  const { data } = await axiosInstance.get<PublicApiResponse<ProfileResponse>>(
    "/api/v1/user/profile"
  );

  return data;
};
