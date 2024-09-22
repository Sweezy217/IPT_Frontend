import { createContext, useState } from "react";

export const projectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  return (
    <projectContext.Provider value={{ projects, setProjects }}>
      {children}
    </projectContext.Provider>
  );
};
