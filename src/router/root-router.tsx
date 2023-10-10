import authRoutes from "@/features/auth/routes/auth-routes";
import RootLayout from "@/layout/RootLayout";
import { createBrowserRouter } from "react-router-dom";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [...authRoutes],
  },
]);

export default rootRouter;
