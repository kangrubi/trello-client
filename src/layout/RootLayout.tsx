import { useUser } from "@/features/user/hooks/useUser";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const { userProfile } = useUser();

  return (
    <div>
      {userProfile?.username}
      <Outlet />
    </div>
  );
};

export default RootLayout;
