import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.hook";
import { useEffect } from "react";

const AuthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
