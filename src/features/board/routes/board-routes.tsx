import { RouteObject } from "react-router-dom";
import BoardLayout from "../layout/BoardLayout";
import { Board, Boards } from "..";
import Temp from "../pages/Temp";

const boardRoutes: RouteObject[] = [
  {
    path: "board",
    element: <BoardLayout />,
    children: [
      {
        path: "boards",
        element: <Boards />,
      },
      {
        path: "boards/:id",
        element: <Board />,
      },
      {
        path: "temp",
        element: <Temp />,
      },
    ],
  },
];

export default boardRoutes;
