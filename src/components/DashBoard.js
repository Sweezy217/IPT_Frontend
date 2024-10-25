// Dashboard.js
import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { getUserTasks, getProjects } from "./apis/Apis";
import ProjectSummaryWidget from "../components/screencomponents/dashBoardwidgets/ProjectSummaryWidget";
import TaskSummaryWidget from "../components/screencomponents/dashBoardwidgets/TaskSummaryWidget";
import UpcomingDeadlinesWidget from "../components/screencomponents/dashBoardwidgets/UpcomingDeadlinesWidget";
import TeamPerformanceWidget from "../components/screencomponents/dashBoardwidgets/TeamPerformanceWidget";
import ActivityFeedWidget from "../components/screencomponents/dashBoardwidgets/ActivityFeedWidget";
import CalendarWidget from "../components/screencomponents/dashBoardwidgets/CalendarWidget";
import { useTaskContext } from "./hooks/useTaskContext";
import { useAuthContext } from "./hooks/useAuthContext";
import { useProjectContext } from "./hooks/useProjectContext";

const Dashboard = () => {
  const { tasks, setTasks } = useTaskContext();
  const { projects, setProjects } = useProjectContext();
  const { user, userOrgs } = useAuthContext();

  console.log(projects, user, "eee12ww", tasks);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, err] = await getUserTasks({
          email: user.email,
          workspaceName: userOrgs[0]?.workspaceName,
        });
        if (!err) {
          setTasks(data.message);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    // If tasks are already populated, filter them
    if (tasks.length) {
      setTasks(tasks);
    } else {
      fetchData();
    }
    const fetchProjects = async () => {
      if (projects.length > 0) {
        return setProjects(projects);
      }

      try {
        const [proj, err] = await getProjects(userOrgs[0]?.workspaceName);
        if (!err) {
          console.log("proj", proj);
          setProjects(proj);
        } else {
          console.error("Error fetching projects:", err);
        }
      } catch (error) {
        console.error(
          "An unexpected error occurred while fetching projects:",
          error
        );
      }
    };

    fetchProjects();
  }, [tasks]);
  return (
    <Box sx={{ p: 2, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProjectSummaryWidget projects={projects} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TaskSummaryWidget tasks={tasks} />
        </Grid>
        <Grid item xs={12} md={4}>
          <UpcomingDeadlinesWidget />
        </Grid>
        <Grid item xs={12} md={4}>
          <TeamPerformanceWidget />
        </Grid>
        <Grid item xs={12} md={4}>
          <CalendarWidget />
        </Grid>
        <Grid item xs={12}>
          <ActivityFeedWidget />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
