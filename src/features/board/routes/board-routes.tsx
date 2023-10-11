import { RouteObject } from "react-router-dom";
import BoardLayout from "../layout/BoardLayout";
import { Boards } from "..";

const boardRoutes: RouteObject[] = [
  {
    path: "board",
    element: <BoardLayout />,
    children: [
      {
        path: "boards",
        element: <Boards />,
      },
    ],
  },
];

export default boardRoutes;
