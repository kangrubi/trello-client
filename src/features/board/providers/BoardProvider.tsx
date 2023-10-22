import React, { createContext, useState } from "react";
import { IBoardService } from "../service/board-service";
import { BoradResponse, PostBoardParams } from "../types";
import { CustomError } from "@/types";
import { AxiosError } from "axios";

interface BoardContextProps {
  error: CustomError | undefined;
  getBoards(): Promise<BoradResponse[] | undefined>;
  postBoards(request: PostBoardParams): Promise<BoradResponse | undefined>;
}

export const BoardContext = createContext<BoardContextProps | undefined>(
  undefined
);

interface BoardProviderProps {
  children: React.ReactNode;
  boardService: IBoardService;
}

export const BoardProvider = ({
  children,
  boardService,
}: BoardProviderProps) => {
  const [error, setError] = useState<CustomError>();

  const getBoards = async () => {
    try {
      const response = await boardService.getBoards();

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;

      if (!_error.response) return;

      setError(_error.response.data);
    }
  };

  const postBoards = async (request: PostBoardParams) => {
    try {
      const response = await boardService.postBoards(request);

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;

      if (!_error.response) return;

      setError(_error.response.data);
    }
  };

  return (
    <BoardContext.Provider
      value={{
        error,
        getBoards,
        postBoards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
