import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/Root.layout";
import authRoutes from "../../auth/routes/auth.routes";
import boardRoutes from "../../board/routes/board.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [...authRoutes, ...boardRoutes],
  },
]);

export default router;
