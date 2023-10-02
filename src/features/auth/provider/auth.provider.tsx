import { createContext } from "react";
import { AuthService } from "../service/auth.service";
import apiService from "../../../lib/api";

interface IAuthContext {
  authService: AuthService;
}

const authContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <authContext.Provider
      value={{
        authService: new AuthService(apiService),
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
