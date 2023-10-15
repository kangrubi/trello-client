import { createContext, useEffect, useState } from "react";
import { IAuthService } from "../service/auth-service";
import {
  LoginParams,
  LoginResponse,
  RegisterParams,
  RegisterResponse,
} from "../types";
import { AxiosError } from "axios";
import useAuthStore from "@/stores/auth-store";
import storage from "@/storage";
import { IUserService } from "@/features/user/service/user-service";
import { useNavigate } from "react-router-dom";
import { CustomError, PublicApiResponse } from "@/types";

interface AuthContextProps {
  login(
    request: LoginParams
  ): Promise<PublicApiResponse<LoginResponse> | undefined>;
  logout(): Promise<void>;
  register(
    request: RegisterParams
  ): Promise<PublicApiResponse<RegisterResponse> | undefined>;
  error: CustomError | undefined;
  isLogin: boolean;
  signIn: () => void;
  signOut: () => void;
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
  const isLogin = useAuthStore((state) => state.isLogin);
  const signIn = useAuthStore((state) => state.signIn);
  const signOut = useAuthStore((state) => state.signOut);
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
    authService.logout();
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

  useEffect(() => {
    (async () => {
      try {
        await userService.profile();
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
        login,
        logout,
        register,
        isLogin,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
