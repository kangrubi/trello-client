import { RouteObject } from "react-router-dom";
import { Register } from "../components";

export const authRoutes: RouteObject[] = [
  {
    path: "/register",
    element: <Register />,
  },
];
