import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TeamPerformanceWidget = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Team Performance
        </Typography>
        <Typography variant="body1">
          Average Completion Time: 3 days
        </Typography>
        <Typography variant="body1">
          Team Efficiency: 85%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TeamPerformanceWidget;
