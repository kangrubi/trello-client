import { Outlet } from "react-router-dom";
import AuthProvider from "../../auth/provider/auth.provider";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
};

export default RootLayout;
