import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../auth/hooks/useAuth.hook";
import useUser from "../../user/hooks/useUser.hook";

const RootLayout = () => {
  const { isLogin, authorize, unauthorize, logout } = useAuth();
  const { getUserProfile } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [prevLocation] = useState(location.pathname);

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

  const handleClickLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
    } else {
      if (prevLocation.includes("/auth") || prevLocation === "/") {
        navigate("/board/list");
        return;
      }

      navigate(prevLocation);
    }
  }, [isLogin]);

  return (
    <div className="root-layout">
      <div>
        <button onClick={handleClickLogout}>logout</button>
      </div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
