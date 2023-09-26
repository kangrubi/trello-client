import { RouteObject } from "react-router-dom";
import { Login, Register } from "../components";

export const authRoutes: RouteObject[] = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
