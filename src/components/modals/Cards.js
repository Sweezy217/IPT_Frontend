import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Chip,
  Box,
  Badge,
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

const TaskCard = ({ task, setOpen }) => {
  const taskStatus = getTaskStatus(task.dueDate);

  return (
    <Card
      sx={{
        maxWidth: 345,
        bgcolor: "#ffffff",
        mb: 2,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)", // Slightly more pronounced shadow
        borderRadius: 2, // Softer corners
        border: "1px solid #e0e0e0",
        overflow: "hidden",
      }}
    >
      <CardContent>
        {/* Task Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "600", color: "#333", mb: 1 }}
        >
          {task.title}
        </Typography>

        {/* Task Description */}
        <Typography
          variant="body2"
          sx={{ color: "#555", mb: 2, fontStyle: "italic", lineHeight: 1.5 }}
        >
          {task.description}
        </Typography>

        {/* Task Assignees */}
        <Stack direction="row" spacing={1} mb={2}>
          {task.assignee.map((assignee, index) => (
            <Avatar
              key={index}
              alt={assignee.name}
              src={assignee.avatarUrl}
              sx={{
                width: 36,
                height: 36,
                border: "2px solid #fff",
                borderRadius: "50%",
                bgcolor: "primary.main",
              }}
            />
          ))}
        </Stack>

        {/* Task Priority as a Chip */}
        <Chip
          label={`Priority: ${task.priority}`}
          sx={{
            bgcolor:
              task.priority === "High"
                ? "#ff6f61"
                : task.priority === "Medium"
                ? "#ffca28"
                : "#66bb6a",
            color: "#fff",
            fontWeight: "bold",
            mb: 2,
            textTransform: "capitalize",
          }}
        />

        {/* Task Dates */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#777",
            mb: 2,
          }}
        >
          <Typography variant="body2">Start: {task.startDate}</Typography>
          <Typography variant="body2">Due: {task.dueDate}</Typography>
        </Box>

        {/* Task Status Badge */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Badge
            badgeContent={taskStatus}
            color={
              taskStatus === "Overdue"
                ? "error"
                : taskStatus === "Almost Due"
                ? "warning"
                : "success"
            }
            sx={{
              ".MuiBadge-dot": {
                width: 8,
                height: 8,
                borderRadius: "50%",
              },
            }}
          />
        </Box>
      </CardContent>

      {/* Action Buttons */}
      <Box
        sx={{
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#f9f9f9",
          display: "flex",
          justifyContent: "space-between",
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
              bgcolor: "info.main",
              color: "white",
              transition: "background-color 0.3s",
              "&:hover": { bgcolor: "info.dark" },
              boxShadow: 2,
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Task">
          <IconButton
            aria-label="delete"
            onClick={() => {
              setOpen(true);
            }}
            sx={{
              bgcolor: "error.main",
              color: "white",
              transition: "background-color 0.3s",
              "&:hover": { bgcolor: "error.dark" },
              boxShadow: 2,
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
};

// Example usage
const Cards = (props) => {
  return <TaskCard task={props.task} setOpen={props.setOpen} />;
};

export default Cards;
