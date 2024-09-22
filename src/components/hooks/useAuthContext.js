import { useContext } from "react";
import { AuthCont } from "../contexts/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthCont);

  if (!context)
    throw new Error("useContext must be used inside AuthContextProvider");

  return context;
};
