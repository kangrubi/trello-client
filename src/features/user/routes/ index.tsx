import { RouteObject } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import { Profile } from "..";

export const userRoutes: RouteObject[] = [
  {
    path: "user",
    element: <UserLayout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];
