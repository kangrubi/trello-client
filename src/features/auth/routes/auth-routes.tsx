import { RouteObject } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { Login, Register } from "..";

const authRoutes: RouteObject[] = [
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export default authRoutes;
