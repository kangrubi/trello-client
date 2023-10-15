export interface PublicApiResponse<T> {
  statusCode: number;
  timestamp: string;
  data: T;
}

export interface CustomError {
  statusCode: number;
  message: {
    message: string;
    error: string;
    statusCode: number;
  };
  timestamp: string;
  path: string;
}
