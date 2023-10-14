import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUser } from "@/features/user/hooks/useUser";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const { profile, userProfile } = useUser();
  const { isLogin, signIn, signOut } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [prevLocation] = useState(location.pathname);

  useEffect(() => {
    (async () => {
      try {
        await profile();
        signIn();
      } catch (error) {
        if (location.pathname.includes("/auth")) return;
        navigate("/auth/login");
        signOut();
      }
    })();
  }, []);

  useEffect(() => {
    if (!isLogin) {
      if (location.pathname.includes("/auth")) return;
      navigate("/auth/login");
      return;
    }

    if (prevLocation.includes("/auth") || prevLocation === "/") {
      navigate("/board/boards");
      return;
    }

    navigate(prevLocation);
  }, [isLogin]);

  return (
    <div>
      {userProfile?.username}
      <Outlet />
    </div>
  );
};

export default RootLayout;
