import { axiosInstance } from "../../../lib/axios";
import { GetRefreshResponse, PublicApiResponse } from "../types";

export const getRefresh = async () => {
  return axiosInstance.get<PublicApiResponse<GetRefreshResponse>>(
    "/api/v1/auth/refresh"
  );
};
