import { createContext } from "react";
import { AuthService } from "../service/auth.service";
import { IRegisterRequest, IRegisterResponse } from "../types/auth.type";
import apiService from "../../app/lib/api";

interface IAuthContext {
  register: (request: IRegisterRequest) => Promise<IRegisterResponse>;
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
    const register = async (request: IRegisterRequest) => {
      const response = await authService.register(request);
      return response;
    };
    return (
      <AuthContext.Provider
        value={{
          register,
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
