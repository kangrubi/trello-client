/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import commonConfig from "../config/common.config";
import localStorageService, {
  LocalStorageService,
} from "../../localStorage/localStorage.service";

interface IApiServiceConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export class ApiService {
  private static instance: ApiService;
  private axiosInstance: AxiosInstance;
  private localStorageService: LocalStorageService;

  private constructor(
    config?: IApiServiceConfig,
    localStorageService?: LocalStorageService
  ) {
    this.axiosInstance = axios.create({
      baseURL: config?.baseURL || "https://api.example.com",
      timeout: config?.timeout || 10000,
      headers: config?.headers || { "Content-Type": "application/json" },
    });

    this.localStorageService =
      localStorageService || LocalStorageService.getInstance();

    axios.interceptors.request.use(
      (config) => {
        const token = this.localStorageService.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  public static getInstance(
    config?: IApiServiceConfig,
    localStorageService?: LocalStorageService
  ): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService(config, localStorageService);
    }

    return ApiService.instance;
  }

  private handleResponse(response: AxiosResponse): any {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

    throw new Error(`HTTP error: ${response.status}`);
  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error);
  }

  public async request<T>(
    method: string,
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.request({
        method,
        url,
        data: body,
        ...config,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>("GET", url, undefined, config);
  }

  public post<T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("POST", url, body, config);
  }

  public put<T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("PUT", url, body, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>("DELETE", url, undefined, config);
  }

  public patch<T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("PATCH", url, body, config);
  }
}

const apiService = ApiService.getInstance(
  {
    baseURL: commonConfig.API_URL,
    timeout: 5000,
  },
  localStorageService
);

export default apiService;
