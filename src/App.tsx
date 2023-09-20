import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";
import { useEffect } from "react";
import { getProfile } from "./features/user/api/profile";

function App() {
  const { isLogin, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      if (isLogin) {
        navigate("/home");
        return;
      }
    }

    if (!isLogin) {
      (async () => {
        try {
          await getProfile();
          signIn();
        } catch (error) {
          signOut();
          navigate("/login");
        }
      })();
    }
  }, [isLogin, location.pathname, navigate, signIn, signOut]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
