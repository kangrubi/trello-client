import { createContext, useContext } from "react";
import { AuthService } from "../service/auth.service";
import apiService from "../../../lib/api";
import { IRegisterRequest, IRegisterResponse } from "../types/auth.type";

interface IAuthContext {
  register: (request: IRegisterRequest) => Promise<IRegisterResponse>;
}

interface IAuthDIContainer {
  authService: AuthService;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthDIContainer = ({ authService }: IAuthDIContainer) => {
  const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
      <AuthContext.Provider
        value={{
          register: authService.register,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  return { AuthProvider };
};

const AuthProvider = AuthDIContainer({
  authService: new AuthService(apiService),
});

export default AuthProvider;
