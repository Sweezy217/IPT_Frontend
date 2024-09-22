import { createContext, useState } from "react";

export const teamMemberContext = createContext();

export const TeamMemberContextProvider = ({ children }) => {
  
  const [teamMembers, setTeamMembers] = useState([]);
  return (
    <teamMemberContext.Provider value={{ teamMembers, setTeamMembers }}>
      {children}
    </teamMemberContext.Provider>
  );
};
