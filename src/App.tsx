import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";
import { useEffect } from "react";
import { useUser } from "./features/auth/hooks/useUser";

function App() {
  const { isLogin, signIn, signOut } = useAuth();
  const { fetchUserProfile, profile } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      if (isLogin) {
        navigate("/home");
        return;
      }
    }

    (async () => {
      await fetchUserProfile();
    })();
  }, []);

  useEffect(() => {
    if (!profile) return;

    if (profile.id !== -1) {
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
}

export default App;
