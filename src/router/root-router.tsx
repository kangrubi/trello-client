import { AuthProvider } from "@/features/auth/providers/AuthProvider";
import authRoutes from "@/features/auth/routes/auth-routes";
import { AuthService } from "@/features/auth/service/auth-service";
import RootLayout from "@/layout/RootLayout";
import httpService from "@/lib/http";
import { createBrowserRouter } from "react-router-dom";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider authService={new AuthService(httpService)}>
        <RootLayout />
      </AuthProvider>
    ),
    children: [...authRoutes],
  },
]);

export default rootRouter;
