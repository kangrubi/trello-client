import { RouteObject } from "react-router-dom";
import App from "../App";
import authRoutes from "../features/auth/routes";
import Home from "@/page/Home";

const rootRoutes: RouteObject[] = [
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

export default rootRoutes;
