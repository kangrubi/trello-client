import { postLogout } from "@/features/auth/api/logout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUser } from "@/features/auth/hooks/useUser";
import { storage } from "@/utils/storage";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isLogin, signOut } = useAuth();
  const { profile } = useUser();
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    if (isLogin) {
      const refreshToken = storage.getToken().refreshToken;
      await postLogout(refreshToken);

      storage.clearToken();

      signOut();

      navigate("/login");
    }
  };

  return (
    <div>
      {profile.username}

      <button type="button" onClick={handleClickLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default Home;
