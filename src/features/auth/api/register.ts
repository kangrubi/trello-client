import { axiosInstance } from "../../../lib/axios";

export type RegisterRequestDTO = {
  username: string;
  email: string;
  password: string;
};

export const postRegister = (request: RegisterRequestDTO) => {
  return axiosInstance.post("/auth/register", request);
};
