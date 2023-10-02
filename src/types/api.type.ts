interface IApiService {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, body: unknown): Promise<T>;
  put<T>(url: string, body: unknown): Promise<T>;
  delete<T>(url: string): Promise<T>;
  patch<T>(url: string, body: unknown): Promise<T>;
}

export default IApiService;
