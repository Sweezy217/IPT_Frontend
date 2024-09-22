import { createContext, useState } from "react";

export const taskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  return (
    <taskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </taskContext.Provider>
  );
};
