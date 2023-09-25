import { RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";

export const rootRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
];
