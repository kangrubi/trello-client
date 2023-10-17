import { createContext, useEffect, useState } from "react";
import { IAuthService } from "../service/auth-service";
import {
  ForgotPsswordParams,
  LoginParams,
  LoginResponse,
  RegisterParams,
  RegisterResponse,
  ResetCustomError,
  ResetPasswordParams,
} from "../types";
import { AxiosError } from "axios";
import useAuthStore from "@/stores/auth-store";
import storage from "@/storage";
import { IUserService } from "@/features/user/service/user-service";
import { useNavigate } from "react-router-dom";
import { CustomError, PublicApiResponse } from "@/types";
import useUserStore from "@/stores/user-store";
import { UserProfile } from "@/features/user/types";

interface AuthContextProps {
  login(
    request: LoginParams
  ): Promise<PublicApiResponse<LoginResponse> | undefined>;
  logout(): Promise<void>;
  register(
    request: RegisterParams
  ): Promise<PublicApiResponse<RegisterResponse> | undefined>;

  error: CustomError | undefined;
  resetPasswordError: ResetCustomError | undefined;
  isLogin: boolean;
  signIn: () => void;
  signOut: () => void;
  userProfile: UserProfile | undefined;
  setUserProfile: (userProfile: UserProfile) => void;
  forgotPassword(
    request: ForgotPsswordParams
  ): Promise<PublicApiResponse<void> | undefined>;
  resetPassword(request: ResetPasswordParams): Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
  userService: IUserService;
  authService: IAuthService;
}

export const AuthProvider = ({
  children,
  userService,
  authService,
}: AuthProviderProps) => {
  const [error, setError] = useState<CustomError>();
  const [resetPasswordError, setResetPasswordError] =
    useState<ResetCustomError>();
  const isLogin = useAuthStore((state) => state.isLogin);
  const signIn = useAuthStore((state) => state.signIn);
  const signOut = useAuthStore((state) => state.signOut);
  const userProfile = useUserStore((state) => state.userProfile);
  const setUserProfile = useUserStore((state) => state.setUserProfile);
  const navigate = useNavigate();

  const login = async (request: LoginParams) => {
    try {
      const response = await authService.login(request);
      storage.setItem(response.data.accessToken);

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;
      if (!_error.response) return;
      setError(_error.response.data);
    }
  };

  const logout = async () => {
    try {
      const response = await authService.logout();

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;
      if (!_error.response) return;
      setError(_error.response.data);
    }
  };

  const register = async (request: RegisterParams) => {
    try {
      const response = await authService.register(request);

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;
      if (!_error.response) return;
      setError(_error.response.data);
    }
  };

  const forgotPassword = async (request: ForgotPsswordParams) => {
    try {
      const response = await authService.forgotPassword(request);

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;
      if (!_error.response) return;
      setError(_error.response.data);
    }
  };

  const resetPassword = async (request: ResetPasswordParams) => {
    try {
      const response = await authService.resetPassword(request);

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<ResetCustomError>;
      if (!_error.response) return;
      setResetPasswordError(_error.response.data);
    }
  };

  const getProfile = async () => {
    try {
      const response = await userService.profile();

      setUserProfile(response.data);

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;
      if (!_error.response) return;
      setError(_error.response.data);
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await getProfile();
        signIn();
      } catch (error) {
        if (location.pathname.includes("/auth")) return;
        navigate("/auth/login");
        signOut();
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        error,
        resetPasswordError,
        login,
        logout,
        register,
        isLogin,
        signIn,
        signOut,
        userProfile,
        setUserProfile,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
