import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../auth/hooks/useAuth.hook";
import useUser from "../../user/hooks/useUser.hook";

const RootLayout = () => {
  const { isLogin, authorize, unauthorize } = useAuth();
  const { getUserProfile } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location.pathname);

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
      setPrevLocation(location.pathname);
    } else {
      if (location.pathname === "/auth/login") {
        navigate(prevLocation);
      }
    }
  }, [isLogin]);

  return (
    <div className="root-layout">
      <Outlet />
    </div>
  );
};

export default RootLayout;
