export interface PublicApiResponse<T> {
  statusCode: number;
  data: T;
  timestamp: string;
}

export interface GetRefreshResponse {
  accessToken: string;
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
