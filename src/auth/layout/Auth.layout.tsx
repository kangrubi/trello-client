import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const AuthLayout = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/board/list");
    }
  }, [isLogin, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
