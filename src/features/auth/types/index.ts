export interface PublicApiResponse<T> {
  statusCode: string;
  data: T;
  timestamp: string;
}
