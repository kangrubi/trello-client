import { AxiosError } from "axios";
import { postRegister } from "../api/register";
import { CustomError } from "../types";
import { useState } from "react";
import { postLogin } from "../api/login";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const useAuth = () => {
  const [error, setError] = useState<CustomError>();

  const fetchRegister = async (data: RegisterData) => {
    try {
      const response = await postRegister(data);

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;

      if (!_error.response) return;

      setError(_error.response.data);
    }
  };

  const fetchLogin = async (data: LoginData) => {
    try {
      const response = await postLogin(data);

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;

      if (!_error.response) return;

      setError(_error.response.data);
    }
  };

  return { error, fetchRegister, fetchLogin };
};

export default useAuth;
