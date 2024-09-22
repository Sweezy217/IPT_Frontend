import { useContext } from "react";
import { taskContext } from "../contexts/TaskContext";

export const useTaskContext = () => {
  const context = useContext(taskContext);

  if (!context)
    throw new Error("useContext must be used inside TaskContextProvider");

  return context;
};
