import { createContext, useState } from "react";
import { AuthService } from "../service/auth.service";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "../types/auth.type";
import apiService from "../../app/lib/api";
import localStorageService from "../../localStorage/localStorage.service";

interface IAuthContext {
  register: (request: IRegisterRequest) => Promise<IRegisterResponse>;
  login: (request: ILoginRequest) => Promise<ILoginResponse>;
  isLogin: boolean;
  authorize: () => void;
  unauthorize: () => void;
}

interface IAuthDIContainer {
  authService: AuthService;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthDIContainer = (
  { authService }: IAuthDIContainer = {
    authService: new AuthService(apiService, localStorageService),
  }
) => {
  const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const register = async (request: IRegisterRequest) => {
      const response = await authService.register(request);
      return response;
    };

    const login = async (request: ILoginRequest) => {
      try {
        const response = await authService.login(request);

        setIsLogin(true);

        return response;
      } catch (error) {
        console.log(error);
        setIsLogin(false);

        throw error;
      }
    };

    const authorize = () => {
      setIsLogin(true);
    };

    const unauthorize = () => {
      setIsLogin(false);
    };

    return (
      <AuthContext.Provider
        value={{
          register,
          login,
          isLogin,
          authorize,
          unauthorize,
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
