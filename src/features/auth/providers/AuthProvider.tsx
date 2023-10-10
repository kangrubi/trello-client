import { createContext, useState } from "react";
import { IAuthService } from "../service/auth-service";
import {
  CustomError,
  PublicApiResponse,
  RegisterParams,
  RegisterResponse,
} from "../types";
import { AxiosError } from "axios";

interface AuthContextProps {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  register(
    params: RegisterParams
  ): Promise<PublicApiResponse<RegisterResponse> | undefined>;
  error: CustomError | undefined;
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

  const login = async () => {
    authService.login("hello", "world");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
