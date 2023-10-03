import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/Root.layout";
import authRoutes from "../../auth/routes/auth.routes";
import boardRoutes from "../../board/routes/board.routes";
import AuthProvider from "../../auth/provider/auth.provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [...authRoutes, ...boardRoutes],
  },
]);

export default router;
