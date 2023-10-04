import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./features/auth/hooks/useAuth";
import { useUser } from "./features/user/hooks/useUser";
import { useEffect } from "react";

function App() {
  const { isLogin, signIn, signOut } = useAuth();
  const { profile, fetchProfile } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      await fetchProfile();
    })();
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      if (isLogin) {
        navigate("/board/list");
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (profile !== undefined) {
      signIn();
    } else {
      signOut();
      navigate("/auth/login");
    }
  }, [navigate, profile, signIn, signOut]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
