import { axiosInstance } from "../../../lib/axios";
import { PublicApiResponse } from "../../auth/types";

interface ProfileResponse {
  username: string;
  email: string;
  profileImage?: string;
}

export const getProfile = async (accessToken: string) => {
  const { data } = await axiosInstance.get<PublicApiResponse<ProfileResponse>>(
    "/api/v1/user/profile",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};
