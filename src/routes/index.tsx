import { RouteObject } from "react-router-dom";
import App from "../App";
import { authRoutes } from "../features/auth/routes";
import { boardRoutes } from "../features/board/routes";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [...authRoutes, ...boardRoutes],
  },
];
