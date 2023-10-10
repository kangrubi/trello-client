import { RouteObject } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { Register } from "..";

const authRoutes: RouteObject[] = [
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default authRoutes;
