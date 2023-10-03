import { RouteObject } from "react-router-dom";
import BoardLayout from "../layout/Board.layout";
import BoardList from "../page/BoardList.page";
import BoardTemp from "../page/BoardTemp.page";

const boardRoutes: RouteObject[] = [
  {
    path: "board",
    element: <BoardLayout />,
    children: [
      {
        path: "list",
        element: <BoardList />,
      },
      {
        path: "temp",
        element: <BoardTemp />,
      },
    ],
  },
];

export default boardRoutes;
