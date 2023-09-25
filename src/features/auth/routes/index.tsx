import { RouteObject } from "react-router-dom";
import Register from "../components/Register";

export const authRoutes: RouteObject[] = [
  {
    path: "/register",
    element: <Register />,
  },
];
