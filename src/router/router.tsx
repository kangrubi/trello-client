import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/Root.layout";
import authRoutes from "../features/auth/routes/auth.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [...authRoutes],
  },
]);

export default router;
