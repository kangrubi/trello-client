import { axiosInstance } from "../../../lib/axios";
import { PublicApiResponse } from "../types";

interface GetRefreshResponse {
  accessToken: string;
}

export const getRefresh = async () => {
  return axiosInstance.get<PublicApiResponse<GetRefreshResponse>>(
    "/api/v1/auth/refresh"
  );
};
