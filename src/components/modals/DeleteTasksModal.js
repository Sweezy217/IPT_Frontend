import React, { useState } from "react";
import { Box, Modal, Button, Typography } from "@mui/material";
import CommonAlert from "./Alert";
import { deleteTask } from "../apis/Apis";

const DeleteTasksModal = (props) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const taskMap = {
    "to do": {
      tasks: props.toDoTasks,
      setter: props.setToDoTasks,
    },
    Done: {
      tasks: props.doneTasks,
      setter: props.setDoneTasks,
    },
    "In Review": {
      tasks: props.inReviewTasks,
      setter: props.setInReviewTasks,
    },
    "In Progress": {
      tasks: props.inProgressTasks,
      setter: props.setInProgressTasks,
    },
  };

  const handleShowAlert = (message, severity = "info") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleClose = () => {
    props.setSelectedTask({});
    props.setOpen(false);
  };
  console.log("toDoTaskwee", props.selectedTask);

  const handleDelete = async () => {
    let updatedlist = taskMap[props.selectedTask.status]?.tasks.filter(
      (item) => item._id !== props.selectedTask._id
    );

    console.log("toDoTaskwee", props.selectedTask);
    const [, err] = await deleteTask({
      id: props.selectedTask._id,
      workspaceName: props.selectedTask.workspaceName,
    });
    if (err == null) {
      taskMap[props.selectedTask.status]?.setter(updatedlist);
      handleShowAlert("Task deleted successfully.", "success");
      props.setOpen(false);
      return;
    }
    handleShowAlert(`Error deleteing Task. ${err}`, "error");
    props.setOpen(false);
  };

  return (
    <>
      <CommonAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={alertSeverity}
        message={alertMessage}
      />
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="delete-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this team member? This action cannot
            be undone.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ marginRight: 1 }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteTasksModal;
