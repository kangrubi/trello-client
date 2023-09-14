import { RouteObject } from "react-router-dom";
import { Login, Register } from "../pages";

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default authRoutes;
