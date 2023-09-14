import { RouteObject } from "react-router-dom";
import App from "../App";
import authRoutes from "../features/auth";

const rootRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [...authRoutes],
  },
];

export default rootRoutes;
