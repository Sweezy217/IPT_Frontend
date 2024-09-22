import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Calendar from 'react-calendar';

const CalendarWidget = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Calendar
        </Typography>
        <Calendar />
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;
