import { RouteObject } from "react-router-dom";
import AuthLayout from "../layout/Auth.layout";
import Login from "../page/Login.page";
import Register from "../page/Register.page";

const authRoutes: RouteObject[] = [
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default authRoutes;
