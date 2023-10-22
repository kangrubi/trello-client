import { useContext } from "react";
import { BoardContext } from "../providers/BoardProvider";

const useBoard = () => {
  const context = useContext(BoardContext);

  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }

  return context;
};
export default useBoard;
