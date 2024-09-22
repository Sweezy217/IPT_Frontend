// src/components/CommonAlert.js
import React from "react";
import { Alert, Snackbar } from "@mui/material";

const CommonAlert = ({ open, onClose, severity = "info", message }) => {
  return (
    <Snackbar
     
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }} // Full width
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CommonAlert;
