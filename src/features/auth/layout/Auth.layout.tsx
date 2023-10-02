import { Outlet } from "react-router-dom";
import { AuthProvider } from "../provider/auth.provider";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default AuthLayout;
