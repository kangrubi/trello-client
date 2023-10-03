import { Outlet } from "react-router-dom";
import AuthProvider from "../../../provider/auth.provider";

const AuthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
