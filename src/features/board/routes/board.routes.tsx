import { RouteObject } from "react-router-dom";
import BoardLayout from "../layout/Board.layout";
import BoardList from "../page/BoardList.page";

const boardRoutes: RouteObject[] = [
  {
    path: "board",
    element: <BoardLayout />,
    children: [
      {
        path: "list",
        element: <BoardList />,
      },
    ],
  },
];

export default boardRoutes;
