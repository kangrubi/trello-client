import { RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import { authRoutes } from "../features/auth/routes";

export const rootRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      ...authRoutes,
    ],
  },
];
