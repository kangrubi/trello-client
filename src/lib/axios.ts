import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_URL } from "../config";
import { storage } from "@/utils/storage";
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

interface RetryableAxiosRequestConfig extends AxiosRequestConfig {
  _retry: boolean;
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await postRefresh(storage.getToken().refreshToken);

        storage.setToken({
          accessToken: data.accessToken,
          refreshToken: data.newRefreshToken,
        });

        return axiosInstance(originalRequest);
      } catch (error) {
        storage.clearToken();

        return Promise.reject(new Error("Unauthorized"));
      }
    }

    return Promise.reject(error);
  }
);
