import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";
import { useEffect } from "react";
import { useUser } from "./features/auth/hooks/useUser";

function App() {
  const { isLogin, signIn, signOut } = useAuth();
  const { fetchUserProfile } = useUser();
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
          await fetchUserProfile();
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
