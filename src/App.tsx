import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./features/auth/hooks/useAuth";
import { useUser } from "./features/user/hooks/useUser";
import { useEffect, useState } from "react";
import { storage } from "./utils/storage";

function App() {
  const { isLogin, signIn, signOut, fetchLogout } = useAuth();
  const { profile, fetchProfile } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [prevLocation] = useState(location.pathname);

  useEffect(() => {
    (async () => {
      await fetchProfile();
    })();
  }, []);

  useEffect(() => {
    if (!isLogin) {
      if (location.pathname.includes("/auth")) return;
      navigate("/auth/login");
      return;
    }

    if (
      prevLocation.includes("/auth") ||
      prevLocation.includes("/board") ||
      prevLocation === "/"
    ) {
      navigate("/board/list");
      return;
    }
    navigate(prevLocation);
  }, [isLogin]);

  useEffect(() => {
    if (profile !== undefined) {
      signIn();
    } else {
      if (location.pathname.includes("/auth")) return;
      navigate("/auth/login");
      signOut();
    }
  }, [profile]);

  const handleClickLogout = async () => {
    await fetchLogout();
    signOut();
    storage.clearToken();
  };

  return (
    <>
      <button type="button" onClick={handleClickLogout}>
        로그아웃
      </button>
      <Outlet />
    </>
  );
}

export default App;
