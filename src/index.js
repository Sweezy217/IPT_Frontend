import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./components/contexts/AuthContext";
import { TeamMemberContextProvider } from "./components/contexts/TeamMemberContext";
import { TaskContextProvider } from "./components/contexts/TaskContext";
import { ProjectContextProvider } from "./components/contexts/ProjectContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TeamMemberContextProvider>
      <ProjectContextProvider>
        <TaskContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </TaskContextProvider>
      </ProjectContextProvider>
    </TeamMemberContextProvider>
  </React.StrictMode>
);
