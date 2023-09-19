import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";
import { useEffect } from "react";
import { getProfile } from "./features/user/api/profile";

function App() {
  const { isLogin, signIn, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) return;

    (async () => {
      try {
        await getProfile();
        signIn();
      } catch (error) {
        signOut();
        navigate("/login");
      }
    })();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
