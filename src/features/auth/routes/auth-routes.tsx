import { RouteObject } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { ForgotPassword, Login, Register, ResetPassword } from "..";

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
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
];

export default authRoutes;
