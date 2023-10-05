import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_URL } from "../config";
import { storage } from "../utils/storage";
import {
  CustomError,
  PublicApiResponse,
  RefreshResponse,
} from "../features/auth/types";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = storage.getToken();

    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error: AxiosError | Error): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError | Error): Promise<AxiosError> => {
    const _error = error as AxiosError<CustomError>;
    const { response } = _error;
    const originalConfig = _error.config as AxiosRequestConfig;

    if (response?.status === 401) {
      const response = await axios.get<PublicApiResponse<RefreshResponse>>(
        `${API_URL}/api/v1/auth/refresh`
      );

      storage.setToken(response.data.data.accessToken);

      return axiosInstance(originalConfig);
    }

    return Promise.reject(error);
  }
);
