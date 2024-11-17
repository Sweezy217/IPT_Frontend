import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  // Chip,
  Box,
  // Badge,
  IconButton,
  Tooltip,
} from "@mui/material";
import { differenceInDays, parseISO } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Helper function to determine the task status
const getTaskStatus = (dueDate) => {
  const today = new Date();
  const due = parseISO(dueDate);
  const daysRemaining = differenceInDays(due, today);

  if (daysRemaining < 0) {
    return "Overdue";
  } else if (daysRemaining <= 3) {
    return "Almost Due";
  }
  return "On Time";
};

const TaskCard = ({ task, setOpen, setSelectedTask }) => {
  const taskStatus = getTaskStatus(task.dueDate);

  return (
    <Card
      sx={{
        opacity: "100%",
        background: "#fff",
        margin: "0 10px",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)", // Subtle shadow
        borderRadius: 2, // Softer corners
        overflow: "hidden",
        width: "95%",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Task Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "600", color: "#333", mb: 1, fontSize: "14px" }}
        >
          {task.title}
        </Typography>

        {/* Task Assignees */}
        <Stack direction="row" spacing={1} mb={2}>
          {task.assignee.map((assignee, index) => (
            <Avatar
              key={index}
              alt={assignee.name}
              src={assignee.avatarUrl}
              sx={{
                width: 28,
                height: 28,
                border: "2px solid #fff",
                borderRadius: "50%",
                bgcolor: "primary.main",
              }}
            />
          ))}
        </Stack>

        {/* Task Dates (Styled like Trello) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#777",
            fontSize: "12px",
            mb: 2,
          }}
        >
          <Typography variant="caption">Start: {task.startDate}</Typography>
          <Typography variant="caption">Due: {task.dueDate}</Typography>
        </Box>
      </CardContent>

      {/* Action Buttons (Simplified, similar to Trello) */}
      <Box
        sx={{
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#fafafa",
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
        }}
      >
        <Tooltip title="Edit Task">
          <IconButton
            aria-label="edit"
            onClick={() => {
              // Handle edit action
            }}
            sx={{
              bgcolor: "#f4f5f7",
              color: "#4a4a4a",
              transition: "background-color 0.3s",
              "&:hover": { bgcolor: "#d4d7db" },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Task">
          <IconButton
            aria-label="delete"
            onClick={() => {
              setOpen(true);
              setSelectedTask(task);
            }}
            sx={{
              bgcolor: "#f4f5f7",
              color: "#4a4a4a",
              transition: "background-color 0.3s",
              "&:hover": { bgcolor: "#d4d7db" },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
};

// Example usage
const Cards = (props) => {
  return (
    <TaskCard
      task={props.task}
      setOpen={props.setOpen}
      setSelectedTask={props.setSelectedTask}
    />
  );
};

export default Cards;
