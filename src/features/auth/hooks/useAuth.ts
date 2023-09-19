import { useState } from "react";
import { UserResponse } from "..";
import { storage } from "../../../utils/storage";
import { RegisterRequestDTO, postRegister } from "../api/register";
import { AxiosError } from "axios";
import { LoginRequestDTO, postLogin } from "../api/login";
import { useAuthStore } from "@/stores/authStore";

type Error = {
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
  message: string;
};

export const useAuth = () => {
  const [error, setError] = useState<Error>();
  const isLogin = useAuthStore((state) => state.isLogin);
  const signIn = useAuthStore((state) => state.signIn);
  const signOut = useAuthStore((state) => state.signOut);

  const handleUserResponse = (request: UserResponse) => {
    const { user, accessToken, refreshToken } = request;
    storage.setToken({ accessToken, refreshToken });
    return user;
  };

  const signUp = async (request: RegisterRequestDTO) => {
    try {
      const response = await postRegister(request);
      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<Error>;
      setError(_error.response?.data);
    }
  };

  const login = async (request: LoginRequestDTO) => {
    try {
      const response = await postLogin(request);
      handleUserResponse(response.data);
      signIn();
    } catch (error: unknown) {
      const _error = error as AxiosError<Error>;
      setError(_error.response?.data);
    }
  };

  return { isLogin, error, signUp, login, signIn, signOut };
};
