import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useAuthContext } from "./hooks/useAuthContext";

const Settings = () => {
  // States for managing form input
  const { user, setUser } = useAuthContext();
  const email = user?.email;
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [status, setStatus] = useState("");

  // Function to handle saving changes and sending PUT request
  const handleSaveChanges = async () => {
    try {
      // Assume there's an API endpoint at /api/users/update-profile
      const response = await fetch(
        `http://localhost:8000/update-user?email=${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: name,
            lastName: surname,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("Profile updated successfully!");

        const updatedUser = { ...user, firstName: name, lastName: surname };
        localStorage.setItem("AuthUser", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        setStatus(`Failed to update profile: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatus("An error occurred while updating the profile.");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Settings</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">User Profile</Typography>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Surname"
          variant="outlined"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>

        {/* Status message */}
        {status && (
          <Typography sx={{ mt: 2 }} variant="body2" color="error">
            {status}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Settings;
