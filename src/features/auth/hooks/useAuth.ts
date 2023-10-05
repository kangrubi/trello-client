import { useState } from "react";
import { postRegister } from "../api/register";
import {
  CustomError,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from "../types";
import { AxiosError } from "axios";
import { postLogin } from "../api/login";
import { useAuthStore } from "../stores/authStore";
import { postLogout } from "../api/logout";
import { postForgotPassword } from "../api/forgotPassword";
import { postResetPassword } from "../api/resetPassword";

const useAuth = () => {
  const [error, setError] = useState<CustomError>();
  const isLogin = useAuthStore((state) => state.isLogin);
  const signIn = useAuthStore((state) => state.signIn);
  const signOut = useAuthStore((state) => state.signOut);

  const fetchRegister = async (request: RegisterRequest) => {
    try {
      const response = await postRegister(request);

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;

      if (!_error.response) return;

      setError(_error.response.data);
    }
  };

  const fetchLogin = async (request: LoginRequest) => {
    try {
      const response = await postLogin(request);

      signIn();

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;

      if (!_error.response) return;

      setError(_error.response.data);
    }
  };

  const fetchLogout = async () => {
    try {
      const response = await postLogout();

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;

      if (!_error.response) return;

      setError(_error.response.data);
    }
  };

  const fetchForgotPassword = async (email: string) => {
    try {
      const response = await postForgotPassword(email);

      return response;
    } catch (error) {
      const _error = error as AxiosError<CustomError>;

      if (!_error.response) return;

      setError(_error.response.data);
    }
  };

  const fetchResetPassword = async (request: ResetPasswordRequest) => {
    try {
      const response = await postResetPassword(request);

      return response;
    } catch (error) {
      const _error = error as AxiosError<CustomError>;

      if (!_error.response) return;

      setError(_error.response.data);
    }
  };

  return {
    error,
    isLogin,
    signIn,
    signOut,
    fetchRegister,
    fetchLogin,
    fetchLogout,
    fetchForgotPassword,
    fetchResetPassword,
  };
};

export default useAuth;
