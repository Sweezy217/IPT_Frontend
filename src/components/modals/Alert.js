// src/components/CommonAlert.js
import React from "react";
import { Alert, Snackbar } from "@mui/material";

const CommonAlert = ({ open, onClose, severity = "info", message }) => {
  return (
    <Snackbar
      sx={{
        position: "absolute",
        top: "0",
        height: "10vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "250px", boxShadow: "2px 4px 6px grey" , marginTop: "15px"}}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CommonAlert;
