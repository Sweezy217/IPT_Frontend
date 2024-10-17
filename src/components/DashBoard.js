// Dashboard.js
import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { getUserTasks } from "./apis/Apis";
import ProjectSummaryWidget from "../components/screencomponents/dashBoardwidgets/ProjectSummaryWidget";
import TaskSummaryWidget from "../components/screencomponents/dashBoardwidgets/TaskSummaryWidget";
import UpcomingDeadlinesWidget from "../components/screencomponents/dashBoardwidgets/UpcomingDeadlinesWidget";
import TeamPerformanceWidget from "../components/screencomponents/dashBoardwidgets/TeamPerformanceWidget";
import ActivityFeedWidget from "../components/screencomponents/dashBoardwidgets/ActivityFeedWidget";
import CalendarWidget from "../components/screencomponents/dashBoardwidgets/CalendarWidget";
import { useTaskContext } from "./hooks/useTaskContext";
import { useAuthContext } from "./hooks/useAuthContext";

const Dashboard = () => {
  const { tasks, setTasks } = useTaskContext();
  const { user, userOrgs } = useAuthContext();

  console.log(user, "eee12ww", tasks);
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
  }, [tasks]);
  return (
    <Box sx={{ p: 2, bgcolor: "#f0f0f0", flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProjectSummaryWidget />
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
