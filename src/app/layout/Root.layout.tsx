import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../auth/hooks/useAuth.hook";
import useUser from "../../user/hooks/useUser.hook";

const RootLayout = () => {
  const { isLogin, authorize, unauthorize } = useAuth();
  const { user, getUserProfile } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await getUserProfile();
        authorize();
      } catch (error) {
        navigate("/auth/login");
        unauthorize();
      }
    })();
  }, []);

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
    } else {
      navigate("/board/list");
    }
  }, [isLogin]);

  return (
    <div className="root-layout">
      <Outlet />
    </div>
  );
};

export default RootLayout;
