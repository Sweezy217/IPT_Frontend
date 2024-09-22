import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProjectSummaryWidget = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Project Summary
        </Typography>
        <Typography variant="body1">
          Total Projects: 12
        </Typography>
        <Typography variant="body1">
          Ongoing: 8
        </Typography>
        <Typography variant="body1">
          Completed: 4
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectSummaryWidget;
