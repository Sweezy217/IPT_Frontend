import { useContext } from "react";
import { projectContext } from "../contexts/ProjectContext";

export const useProjectContext = () => {
  const context = useContext(projectContext);

  if (!context)
    throw new Error("useContext must be used inside ProjectContextProvider");

  return context;
};
