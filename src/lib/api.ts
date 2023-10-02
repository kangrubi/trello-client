import axios from "axios";

class ApiService implements IApiService {
  private static instance: ApiService;

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }

    return ApiService.instance;
  }

  public async get<T>(url: string): Promise<T> {
    const response = await axios.get(url);
    return response.data;
  }

  public async post<T>(url: string, body: unknown): Promise<T> {
    const response = await axios.post(url, body);
    return response.data;
  }

  public async put<T>(url: string, body: unknown): Promise<T> {
    const response = await axios.put(url, body);
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await axios.delete(url);
    return response.data;
  }

  public async patch<T>(url: string, body: unknown): Promise<T> {
    const response = await axios.patch(url, body);
    return response.data;
  }
}

export default ApiService.getInstance();
