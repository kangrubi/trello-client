import { RouteObject } from "react-router-dom";
import { List } from "..";
import BoardLayout from "../layout/BoardLayout";
import Temp from "../pages/Temp";

export const boardRoutes: RouteObject[] = [
  {
    path: "board",
    element: <BoardLayout />,
    children: [
      {
        path: "list",
        element: <List />,
      },
      {
        path: "temp",
        element: <Temp />,
      },
    ],
  },
];
