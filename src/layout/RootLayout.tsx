import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUser } from "@/features/user/hooks/useUser";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const { profile, userProfile } = useUser();
  const { isLogin, signIn, signOut } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <div>
      <h2>gg</h2>
      {userProfile?.username}
      <Outlet />
    </div>
  );
};

export default RootLayout;
