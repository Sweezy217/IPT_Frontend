import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const ActivityFeedWidget = () => {
  const activities = [
    { description: 'John Doe completed the task "Create Wireframes".', time: '10 minutes ago' },
    { description: 'Jane Smith commented on the task "Design Review".', time: '1 hour ago' },
    { description: 'Mike Brown started the task "Develop Landing Page".', time: '2 hours ago' },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Activity Feed
        </Typography>
        <List>
          {activities.map((activity, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={activity.description}
                secondary={activity.time}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ActivityFeedWidget;
