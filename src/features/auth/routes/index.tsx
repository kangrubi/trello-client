import { RouteObject } from "react-router-dom";
import { AuthLayout, Login, Register } from "..";

export const authRoutes: RouteObject[] = [
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "register", element: <Register /> },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];
