import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, TextField, IconButton } from '@mui/material';
import Calendar from 'react-calendar'; // Example of a calendar component
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Schedule = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Design Review', date: '25th Sep, 2:00 PM' },
    { id: 2, title: 'Sprint Planning Meeting', date: '28th Sep, 10:00 AM' },
    { id: 3, title: 'Client Presentation', date: '30th Sep, 4:00 PM' },
    { id: 4, title: 'Code Review Session', date: '2nd Oct, 3:00 PM' },
    { id: 5, title: 'Project Deadline', date: '5th Oct, 11:59 PM' },
    { id: 6, title: 'Team Retrospective', date: '7th Oct, 2:00 PM' }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', date: '' });

  const handleAddEvent = () => {
    setNewEvent({ title: '', date: '' });
    setSelectedEvent(null);
    setOpenDialog(true);
  };

  const handleEditEvent = (event) => {
    setNewEvent({ title: event.title, date: event.date });
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      setEvents(events.map((event) =>
        event.id === selectedEvent.id ? { ...event, ...newEvent } : event
      ));
    } else {
      setEvents([...events, { id: events.length + 1, ...newEvent }]);
    }
    setOpenDialog(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Schedule</Typography>
      <Box sx={{ mt: 2 }}>
        <Calendar />
        <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEvent}>
            Add Event
          </Button>
        </Box>
        {events.map((event) => (
          <Card sx={{ mt: 2 }} key={event.id}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body1">{event.title}</Typography>
                <Typography variant="body2" color="textSecondary">Due: {event.date}</Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handleEditEvent(event)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteEvent(event.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Event Title"
              fullWidth
              variant="outlined"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Event Date"
              fullWidth
              variant="outlined"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <Button sx={{ mt: 2 }} variant="contained" onClick={handleSaveEvent}>
              Save
            </Button>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Schedule;
