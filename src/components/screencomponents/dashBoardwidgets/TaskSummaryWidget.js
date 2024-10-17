import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const TaskSummaryWidget = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Task Summary
        </Typography>
        <Typography variant="body1">
          Total Tasks: {props.tasks.length}
        </Typography>
        <Typography variant="body1">Completed: {props.tasks.filter((item) => item.status === "Done").length}</Typography>
        <Typography variant="body1">Pending: {props.tasks.filter((item) => item.status === "to do").length}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskSummaryWidget;
