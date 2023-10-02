import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/Root.layout";
import authRoutes from "../features/auth/routes/auth.routes";
import boardRoutes from "../features/board/routes/board.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [...authRoutes, ...boardRoutes],
  },
]);

export default router;
