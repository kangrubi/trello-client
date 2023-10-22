import { RouteObject } from "react-router-dom";
import BoardLayout from "../layout/BoardLayout";
import { Board, Boards } from "..";
import Temp from "../pages/Temp";
import BoardProvider from "../providers/BoardProvider";
import { BoardService } from "../service/board-service";
import httpService from "@/lib/http";

const boardRoutes: RouteObject[] = [
  {
    path: "board",
    element: (
      <BoardProvider boardService={new BoardService(httpService)}>
        <BoardLayout />
      </BoardProvider>
    ),
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
