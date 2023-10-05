import { RouteObject } from "react-router-dom";
import { AuthLayout, ForgotPassword, Login, Register, ResetPassword } from "..";

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
