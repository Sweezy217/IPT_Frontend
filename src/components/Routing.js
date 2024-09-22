import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import CreateWorkspaceSignUp from "../pages/signup/CreateWorkspaceSignUp";
import ForgotPassword from "../pages/forgotpassword/ForgotPassword";
import HomePage from "../pages/home/Home";
import TasksPage from "./TasksPage";
import Team from "./Team";
import Settings from "./Settings";
import Support from "./Support";
import Report from "./Reports";
import Schedule from "./Schedule";
import Dashboard from "./DashBoard";
import ProjectsPage from "./Projects";

const Routing = () => {
  let user = localStorage.getItem("AuthUser");
  let loggedIn = JSON.parse(user);
  if (loggedIn == null) loggedIn = {};

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={Object.keys(loggedIn).length ? <HomePage /> : <Signup />}
        >
          <Route path="tasks" element={<TasksPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route index element={<TasksPage />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<Support />} />
          <Route path="report" element={<Report />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="/CreateWorkspaceSignUp"
          element={<CreateWorkspaceSignUp />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default Routing;
