import { createContext, useState } from "react";
import { AuthService } from "../service/auth.service";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "../types/auth.type";
import apiService from "../../app/lib/api";

interface IAuthContext {
  register: (request: IRegisterRequest) => Promise<IRegisterResponse>;
  login: (request: ILoginRequest) => Promise<ILoginResponse>;
  isLogin: boolean;
}

interface IAuthDIContainer {
  authService: AuthService;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthDIContainer = (
  { authService }: IAuthDIContainer = {
    authService: new AuthService(apiService),
  }
) => {
  const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const register = async (request: IRegisterRequest) => {
      const response = await authService.register(request);
      return response;
    };

    const login = async (request: IRegisterRequest) => {
      try {
        const response = await authService.login(request);

        localStorage.setItem("token", response.accessToken);

        setIsLogin(true);

        return response;
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <AuthContext.Provider
        value={{
          register,
          login,
          isLogin,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  return AuthProvider;
};

const AuthProvider = AuthDIContainer();

export default AuthProvider;
