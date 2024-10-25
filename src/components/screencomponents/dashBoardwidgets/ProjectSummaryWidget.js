import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProjectSummaryWidget = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Project Summary
        </Typography>
        <Typography variant="body1">
          Total Projects: {props.projects.length}
        </Typography>
        <Typography variant="body1">
          Ongoing: {props.projects.filter((item => item.status !== "In Progress")).length - 1}
        </Typography>
        <Typography variant="body1">
          Completed: {props.projects.filter((item => item.status == "Completed")).length}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectSummaryWidget;
