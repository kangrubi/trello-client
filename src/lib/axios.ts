import axios, { AxiosError } from "axios";
import { API_URL } from "../config";
import { storage } from "@/utils/storage";
import { CustomError } from "@/features/auth";
import { postRefresh } from "@/features/auth/api/refresh";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token.accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: unknown) => {
    const customError = error as AxiosError<CustomError>;
    const originalRequest = customError.config;

    if (customError.response) {
      if (!originalRequest) return;
      if (customError.response.status === 401 && !originalRequest._retry) {
        try {
          const token = storage.getToken();
          console.log(token);

          if (token) {
            // const response = await postRefresh(token.refreshToken);
            // if (!customError.config) return;
            // customError.config.headers[
            //   "Authorization"
            // ] = `Bearer ${response.data.newRefreshToken}`;
            // storage.setToken({
            //   accessToken: response.data.accessToken,
            //   refreshToken: response.data.newRefreshToken,
            // });
          } else {
            storage.clearToken();
          }
        } catch (error) {
          storage.clearToken();
        }
      }
    }

    Promise.reject(error);
  }
);
