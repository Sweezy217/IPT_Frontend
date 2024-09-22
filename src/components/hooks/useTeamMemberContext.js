import { useContext } from "react";
import { teamMemberContext } from "../contexts/TeamMemberContext";

export const useTeamMemberContext = () => {
  const context = useContext(teamMemberContext);

  if (!context)
    throw new Error("useContext must be used inside TeamMemberContextProvider");

  return context;
};
