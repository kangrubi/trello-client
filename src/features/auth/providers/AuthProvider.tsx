import { createContext, useState } from "react";
import { IAuthService } from "../service/auth-service";
import {
  CustomError,
  LoginParams,
  LoginResponse,
  PublicApiResponse,
  RegisterParams,
  RegisterResponse,
} from "../types";
import { AxiosError } from "axios";
import useAuthStore from "@/stores/auth-store";
import storage from "@/storage";

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
  authService: IAuthService;
}

export const AuthProvider = ({ children, authService }: AuthProviderProps) => {
  const [error, setError] = useState<CustomError>();
  const isLogin = useAuthStore((state) => state.isLogin);
  const signIn = useAuthStore((state) => state.signIn);
  const signOut = useAuthStore((state) => state.signOut);

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
