import { AxiosError } from "axios";
import { postRegister } from "../api/register";
import { CustomError } from "../types";
import { useState } from "react";
import { postLogin } from "../api/login";
import { useAuthStore } from "../../../stores/authStore";

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
  const isLogin = useAuthStore((state) => state.isLogin);
  const signIn = useAuthStore((state) => state.signIn);
  const signOut = useAuthStore((state) => state.signOut);

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
      signIn();
      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;

      if (!_error.response) return;

      setError(_error.response.data);
    }
  };

  return { error, isLogin, fetchRegister, fetchLogin, signIn, signOut };
};

export default useAuth;
