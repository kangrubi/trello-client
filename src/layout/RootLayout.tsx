import { useAuth } from "@/features/auth/hooks/useAuth";
import storage from "@/storage";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const { userProfile, logout, signOut, isLogin } = useAuth();

  const handleClickLogoutButton = async () => {
    await logout();
    storage.removeItem();
    signOut();
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
