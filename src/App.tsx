import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./features/auth/hooks/useAuth";
import useUser from "./features/user/hooks/useUser";

const App = () => {
  const { signIn, signOut, isLogin } = useAuth();
  const { profile, fetchGetProfile } = useUser();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await fetchGetProfile();
    })();
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      if (isLogin) {
        navigate("/home");
        return;
      }
    }
  }, [isLogin]);

  useEffect(() => {
    if (profile !== undefined) {
      signIn();
    } else {
      signOut();
      navigate("/login");
    }
  }, [navigate, profile, signIn, signOut]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
