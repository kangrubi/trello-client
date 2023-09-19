import { axiosInstance } from "@/lib/axios";
import { UserResponse } from "..";

export type LoginRequestDTO = {
  email: string;
  password: string;
};

export const postLogin = (request: LoginRequestDTO) => {
  return axiosInstance.post<UserResponse>("/auth/login", request);
};
