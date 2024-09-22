// Dashboard.js
import React from "react";
import { Box, Grid } from "@mui/material";
import ProjectSummaryWidget from "../components/screencomponents/dashBoardwidgets/ProjectSummaryWidget";
import TaskSummaryWidget from "../components/screencomponents/dashBoardwidgets/TaskSummaryWidget";
import UpcomingDeadlinesWidget from "../components/screencomponents/dashBoardwidgets/UpcomingDeadlinesWidget";
import TeamPerformanceWidget from "../components/screencomponents/dashBoardwidgets/TeamPerformanceWidget";
import ActivityFeedWidget from "../components/screencomponents/dashBoardwidgets/ActivityFeedWidget";
import CalendarWidget from "../components/screencomponents/dashBoardwidgets/CalendarWidget";

const Dashboard = () => (
  <Box sx={{ p: 2, bgcolor: "#f0f0f0", flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <ProjectSummaryWidget />
      </Grid>
      <Grid item xs={12} md={6}>
        <TaskSummaryWidget />
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

export default Dashboard;
