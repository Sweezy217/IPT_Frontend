import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const UpcomingDeadlinesWidget = () => {
  const deadlines = [
    { task: 'Submit Proposal', date: 'Sep 2nd, 2024' },
    { task: 'Design Review', date: 'Sep 5th, 2024' },
    { task: 'Final Presentation', date: 'Sep 10th, 2024' },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upcoming Deadlines
        </Typography>
        <List>
          {deadlines.map((deadline, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={deadline.task}
                secondary={`Due: ${deadline.date}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlinesWidget;
