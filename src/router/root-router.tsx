import { AuthProvider } from "@/features/auth/providers/AuthProvider";
import authRoutes from "@/features/auth/routes/auth-routes";
import { AuthService } from "@/features/auth/service/auth-service";
import boardRoutes from "@/features/board/routes/board-routes";
import { UserProvider } from "@/features/user/providers/UserProvider";
import { UserService } from "@/features/user/service/user-service";
import RootLayout from "@/layout/RootLayout";
import httpService from "@/lib/http";
import { createBrowserRouter } from "react-router-dom";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider authService={new AuthService(httpService)}>
        <UserProvider userService={new UserService(httpService)}>
          <RootLayout />
        </UserProvider>
      </AuthProvider>
    ),
    children: [...authRoutes, ...boardRoutes],
  },
]);

export default rootRouter;
