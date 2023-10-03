import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../auth/hooks/useAuth";

const RootLayout = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
    }
  }, [isLogin, navigate]);

  return (
    <div className="root-layout">
      <Outlet />
    </div>
  );
};

export default RootLayout;
