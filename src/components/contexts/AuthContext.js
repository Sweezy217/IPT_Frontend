import { createContext, useState } from "react";

export const AuthCont = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userOrgs, setUserOrgs] = useState([]);
  const [user, setUser] = useState({});
  return (
    <AuthCont.Provider value={{ user, setUser, userOrgs, setUserOrgs }}>
      {children}
    </AuthCont.Provider>
  );
};
