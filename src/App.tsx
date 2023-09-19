import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";
import { useEffect } from "react";
import { getProfile } from "./features/user/api/profile";
import { postLogout } from "./features/auth/api/logout";
import { storage } from "./utils/storage";

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

  const handleClickLogout = async () => {
    const refreshToken = storage.getToken().refreshToken;
    await postLogout(refreshToken);

    storage.clearToken();
    signOut();
    navigate("/login");
  };

  return (
    <>
      <Outlet />
      <button type="button" onClick={handleClickLogout}>
        로그아웃
      </button>
    </>
  );
}

export default App;
