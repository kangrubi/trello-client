import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../auth/hooks/useAuth.hook";
import useUser from "../../user/hooks/useUser.hook";

const RootLayout = () => {
  const { isLogin } = useAuth();
  const { user, getUserProfile } = useUser();
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
