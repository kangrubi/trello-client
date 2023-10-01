import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_URL } from "../config";
import { storage } from "../utils/storage";

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
