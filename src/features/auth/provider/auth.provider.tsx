import { createContext, useContext } from "react";
import { AuthService } from "../service/auth.service";
import apiService from "../../../lib/api";

interface IAuthContext {
  authService: AuthService;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider
      value={{
        authService: new AuthService(apiService),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
