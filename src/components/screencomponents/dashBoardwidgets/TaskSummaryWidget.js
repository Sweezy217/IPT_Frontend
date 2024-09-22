import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TaskSummaryWidget = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Task Summary
        </Typography>
        <Typography variant="body1">
          Total Tasks: 54
        </Typography>
        <Typography variant="body1">
          Completed: 45
        </Typography>
        <Typography variant="body1">
          Pending: 9
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskSummaryWidget;
