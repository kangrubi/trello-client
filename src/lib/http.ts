/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/config";
import axios from "axios";

export interface IHttpService {
  request<T>(config: any): Promise<T>;
  get<T>(url: string, config?: any): Promise<T>;
  post<T>(url: string, data?: any, config?: any): Promise<T>;
  put<T>(url: string, data?: any, config?: any): Promise<T>;
  patch<T>(url: string, data?: any, config?: any): Promise<T>;
  delete<T>(url: string, config?: any): Promise<T>;
}

class HttpService implements IHttpService {
  private axiosInstance = axios.create({
    baseURL: API_URL,
  });
  private static instance: HttpService;

  private constructor() {
    this.setRequestInterceptor(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.setResponseInterceptor(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }

    return HttpService.instance;
  }

  private setRequestInterceptor(
    onFulfilled?: (value: any) => any,
    onRejected?: (error: any) => any
  ): void {
    this.axiosInstance.interceptors.request.use(onFulfilled, onRejected);
  }

  private setResponseInterceptor(
    onFulfilled?: (value: any) => any,
    onRejected?: (error: any) => any
  ): void {
    this.axiosInstance.interceptors.response.use(onFulfilled, onRejected);
  }

  public async request<T>(config: any): Promise<T> {
    const response = await this.axiosInstance.request<T>(config);
    return response.data;
  }

  public async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.request<T>({ ...config, method: "GET", url });
    return response;
  }

  public async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.request<T>({
      ...config,
      method: "POST",
      url,
      data,
    });
    return response;
  }

  public async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.request<T>({
      ...config,
      method: "PUT",
      url,
      data,
    });
    return response;
  }

  public async patch<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.request<T>({
      ...config,
      method: "PATCH",
      url,
      data,
    });
    return response;
  }

  public async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.request<T>({
      ...config,
      method: "DELETE",
      url,
    });
    return response;
  }
}

const httpService = HttpService.getInstance();

export default httpService;
