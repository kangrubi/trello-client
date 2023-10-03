import { Outlet } from "react-router-dom";
import AuthProvider from "../provider/auth.provider";

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
