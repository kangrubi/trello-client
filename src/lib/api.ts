import axios, { AxiosResponse } from "axios";
import { IApi } from "../types/api.type";
import commonConfig from "../config/common.config";

const axiosInstance = axios.create({
  baseURL: commonConfig.API_URL,
  timeout: 5000,
});

const api: IApi = {
  get: (url: string): Promise<AxiosResponse> => axiosInstance.get(url),
  post: (url: string, body: unknown): Promise<AxiosResponse> =>
    axiosInstance.post(url, body),
  put: (url: string, body: unknown): Promise<AxiosResponse> =>
    axiosInstance.put(url, body),
  delete: (url: string): Promise<AxiosResponse> => axiosInstance.delete(url),
};

class ApiSingleton {
  private static instance: IApi;

  static getInstance(): IApi {
    if (!ApiSingleton.instance) {
      ApiSingleton.instance = api;
    }

    return ApiSingleton.instance;
  }
}

export default ApiSingleton.getInstance();
