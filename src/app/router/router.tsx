import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/Root.layout";
import authRoutes from "../../auth/routes/auth.routes";
import boardRoutes from "../../board/routes/board.routes";
import AuthProvider from "../../auth/provider/auth.provider";
import UserProvider from "../../user/provider/user.provider";
import { AuthService } from "../../auth/service/auth.service";
import apiService from "../lib/api";
import localStorageService from "../../localStorage/localStorage.service";
import { UserService } from "../../user/service/user.service";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider
        authService={new AuthService(apiService, localStorageService)}
      >
        <UserProvider userService={new UserService(apiService)}>
          <RootLayout />
        </UserProvider>
      </AuthProvider>
    ),
    children: [...authRoutes, ...boardRoutes],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router;
