import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./features/auth/hooks/useAuth";

const App = () => {
  const { signIn, signOut, isLogin } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      if (isLogin) {
        navigate("/home");
        return;
      }
    }
    console.log(isLogin);
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
