import React, { useState } from "react";
import { Box, Modal, Button, Typography } from "@mui/material";
import CommonAlert from "./Alert";
import { deleteTeamMember } from "../apis/Apis";

const DeleteModal = (props) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");

  const handleShowAlert = (message, severity = "info") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleClose = () => {
    props.setTeamMember({});
    props.setOpen(false);
  };

  const handleDelete = async () => {
    let updatedList = props.teamMembers.filter(
      (item) => item._id !== props.teamMember._id
    );

    // delete TeamMember
    const [, err] = await deleteTeamMember({
      email: props.teamMember.email,
      workspaceName: props.teamMember.workspaceName,
    });

    if (!err) {
      props.setCurrentTeamMembers(updatedList);
      props.setTeamMembers(updatedList);
      handleShowAlert("Team member deleted successfully.", "success");
    } else {
      handleShowAlert(err, "error");
    }

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

export default DeleteModal;
