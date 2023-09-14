import { UserResponse } from "..";
import { axiosInstance } from "../../../lib/axios";

export type RegisterRequestDTO = {
  username: string;
  email: string;
  password: string;
};

export const registerWithEmailAndPassword = (request: RegisterRequestDTO) => {
  return axiosInstance.post<UserResponse>("/auth/register", request);
};
