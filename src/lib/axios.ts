import axios from "axios";
import { API_URL } from "../config";
import { storage } from "@/utils/storage";

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
