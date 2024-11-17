import React, { useState } from "react";
import {
  Box,
  Modal,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import CommonAlert from "./Alert"; // Import the CommonAlert component
import { editTeamMember } from "../apis/Apis";

const EditModal = (props) => {
  const [name, setName] = useState(props.teamMember.firstName);
  const [lastname, setLastName] = useState(props.teamMember.lastName);
  const [role, setRole] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info"); // Can be 'success', 'error', 'warning', 'info'

  const roles = [
    "Admin",
    "Lead Developer",
    "UX Designer",
    "QA Engineer",
    "Product Owner",
    "Business Analyst",
    "Scrum Master",
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
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
    setName("");
    setRole("");
    props.setTeamMember({});
    props.setOpen(false);
  };

  const handleSave = async () => {
    if (name && role && lastname) {
      const updatedList = props.teamMembers.map((item) => {
        if (item._id === props.teamMember._id) {
          return { ...item, firstName: name, lastName: lastname, role: role };
        }
        return item;
      });

      const [, err] = await editTeamMember({
        id: props.teamMember._id,
        firstName: name,
        lastName: lastname,
        role: role,
      });
      if (!err) {
        props.setTeamMembers(updatedList);
        props.setCurrentTeamMembers(updatedList);
        props.setTeamMember({});
        props.setOpen(false);
        setName("");
        setRole("");
        handleShowAlert("Team member updated successfully", "success");
      }
    } else {
      handleShowAlert("Name and role are required.", "error");
    }
  };

  console.log("teamMember", props.teamMember);
  return (
    <>
      <CommonAlert
        sx={{ position: "fixed", top: "100", left: "300px" }}
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
        <Box sx={style}>
          <Typography id="edit-modal-title" variant="h6" component="h2">
            Edit Team Member
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              id="name"
              variant="outlined"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Surname"
              id="surname"
              variant="outlined"
              required
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel required>Role</InputLabel>
              <Select
                id="role"
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                variant="outlined"
                required
              >
                {roles.map((role, index) => (
                  <MenuItem key={index} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{ marginRight: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={!name || !role}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditModal;
