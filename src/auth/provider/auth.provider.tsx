import { createContext, useState } from "react";
import { AuthService } from "../service/auth.service";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "../types/auth.type";

interface IAuthContext {
  register: (request: IRegisterRequest) => Promise<IRegisterResponse>;
  login: (request: ILoginRequest) => Promise<ILoginResponse>;
  isLogin: boolean;
  authorize: () => void;
  unauthorize: () => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({
  authService,
  children,
}: {
  authService: AuthService;
  children: React.ReactNode;
}) => {
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

  const logout = async () => {
    try {
      await authService.logout();
      setIsLogin(false);
    } catch (error) {
      console.log(error);
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
