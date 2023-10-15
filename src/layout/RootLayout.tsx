import { useAuth } from "@/features/auth/hooks/useAuth";
import storage from "@/storage";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const { userProfile, logout, signOut, isLogin } = useAuth();
  const navigate = useNavigate();

  const handleClickLogoutButton = async () => {
    await logout();

    storage.removeItem();

    signOut();

    navigate("/auth/login");
  };

  return (
    <div>
      {isLogin && (
        <>
          {userProfile?.username}
          <button type="button" onClick={handleClickLogoutButton}>
            로그아웃
          </button>
        </>
      )}

      <Outlet />
    </div>
  );
};

export default RootLayout;
