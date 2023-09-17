import { useState } from "react";
import { UserResponse } from "..";
import { storage } from "../../../utils/storage";
import { RegisterRequestDTO, postRegister } from "../api/register";
import { AxiosError } from "axios";

type ErrorCode = {
  error: string;
  message: string[];
  statusCode: number;
};

type Error = {
  error: string;
  errorCodes: ErrorCode;
  message: string;
  path: string;
  statusCode: number;
  timestamp: string;
};

export const useAuth = () => {
  const [error, setError] = useState<Error>();
  // const handleUserResponse = (request: UserResponse) => {
  //   const { user, access_token } = request;
  //   storage.setToken(access_token);
  //   return user;
  // };

  const signUp = async (request: RegisterRequestDTO) => {
    try {
      const response = await postRegister(request);

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<Error>;
      setError(_error.response?.data);
    }
  };

  return { error, signUp };
};
