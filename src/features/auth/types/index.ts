export interface PublicApiResponse<T> {
  statusCode: string;
  data: T;
  timestamp: string;
}

export type CustomError = {
  statusCode: number;
  message: {
    message: string;
    statusCode: number;
  };
  timestamp: string;
  path: string;
};
