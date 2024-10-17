import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Modal,
} from "@mui/material";
import { createTask } from "../apis/Apis";
import CommonAlert from "./Alert";
import { useTeamMemberContext } from "../hooks/useTeamMemberContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchTeamMembers } from "../utils/Utils";

const AddTaskForm = (props) => {
  const { userOrgs, user } = useAuthContext();
  const { teamMembers } = useTeamMemberContext();
  const workspaceName = userOrgs[0] || [];
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const currentTeamMembers = useFetchTeamMembers(
    workspaceName.workspaceName,
    teamMembers
  );
  console.log(teamMembers);
  const handleShowAlert = (message, severity = "info") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleChange = (event) => {
    setSelectedAssignees(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const task = {
      title: formData.get("taskTitle")?.trim(),
      description: formData.get("taskDescription")?.trim(),
      priority: formData.get("taskPriority"),
      startDate: formData.get("taskStartDate"),
      dueDate: formData.get("taskDueDate"),
      status: "to do",
      email: user.email,
      workspaceName: workspaceName.workspaceName,
      assignee: selectedAssignees,
    };

    if (task.title) {
      try {
        const addTasking = await createTask(task);

        if (addTasking.error) {
          console.error("Failed to create task:", addTasking.error);
          handleShowAlert("Failed to create task. Please try again.", "error");
        } else {
          props.addTask(task);
          handleShowAlert("Created task Successfully", "success");
          props.setOpen(false);
          window.location.reload()
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        handleShowAlert(
          "An unexpected error occurred. Please try again.",
          "error"
        );
      }
    } else {
      alert("Task title is required.");
    }
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
      <CommonAlert
        sx={{ position: "absolute", top: "0", left: "300px" }}
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={alertSeverity}
        message={alertMessage}
      />
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 4,
            mx: "auto",
            p: 4,
            width: "100%",
            maxWidth: 500,
            maxHeight: "70vh", // Limit the height to 70% of the viewport
            overflowY: "auto", // Enable scrolling if content exceeds maxHeight
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography
            id="edit-modal-title"
            variant="h5"
            sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
          >
            Add New Task
          </Typography>
          <TextField
            fullWidth
            id="task-title"
            label="Task Title"
            name="taskTitle"
            margin="normal"
            required
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            id="task-description"
            label="Description"
            name="taskDescription"
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ mb: 3 }}
          >
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              name="taskPriority"
              label="Priority"
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            id="start-date"
            label="Start Date"
            name="taskStartDate"
            type="date"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            id="due-date"
            label="Due Date"
            name="taskDueDate"
            type="date"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 3 }}
          />
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ mb: 3 }}
          >
            <InputLabel id="assignee-label">Assignee</InputLabel>
            <Select
              labelId="assignee-label"
              id="assignee"
              name="taskAssignee"
              label="Assignee"
              multiple
              value={selectedAssignees}
              onChange={handleChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {currentTeamMembers
                .filter(
                  (item) => item.workspaceName === workspaceName.workspaceName
                )
                .map((member) => (
                  <MenuItem value={`${member.firstName} ${member.lastName}`}>
                    {`${member.firstName} ${member.lastName}`}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>Select the person(s) responsible</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5, fontSize: "1rem", fontWeight: "bold", mt: 3 }}
          >
            Add Task
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddTaskForm;
