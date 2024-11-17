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
import { inviteUser } from "../apis/Apis";
import { useAuthContext } from "../hooks/useAuthContext";

const InviteUserModal = (props) => {
  const { userOrgs } = useAuthContext();
  const workspace = userOrgs[0] || [];
  const workspaceName = workspace?.workspaceName;
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
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

  const handleClose = () => {
    setEmail("");
    setRole("");
    props.setOpen(false);
  };

  const handleSendInvite = async () => {
    if (workspaceName == "") return console.log("NO WS");
    const invitingUser = await inviteUser({
      email: email,
      workspaceName: workspaceName,
      roles: [role],
    });

    console.log(userOrgs[0], "invitingUser23", invitingUser, workspaceName);
    setEmail("");
    setRole("");
    props.setOpen(false);
  };

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="invite-user-modal-title"
      aria-describedby="invite-user-modal-description"
    >
      <Box sx={style}>
        <Typography id="invite-user-modal-title" variant="h6" component="h2">
          Invite User
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            id="invite-email"
            fullWidth
            label="Email"
            variant="outlined"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel required>Role</InputLabel>
            <Select
              id="role-select"
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
              id="send-invite"
              variant="contained"
              color="primary"
              onClick={handleSendInvite}
              disabled={!email || !role}
            >
              Send Invite
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default InviteUserModal;
