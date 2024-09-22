import React from "react";
import { Avatar, Button, Modal, Box, Typography, Stack } from "@mui/material";

const ImageUploaderModal = (props) => {
  const handleClose = () => props.setOpen(false);

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      props.setImage(imageUrl);
    }
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Modal Title */}
        <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
          Upload Profile Picture
        </Typography>

        {/* Avatar to display uploaded image */}
        <Avatar
          alt="Uploaded Image"
          src={props.image}
          sx={{ width: 120, height: 120, mb: 3, border: "2px solid #1976d2" }}
        />

        {/* Buttons for selecting and saving the image */}
        <Stack direction="row" spacing={2}>
          <Button variant="contained" component="label" sx={{ px: 3 }}>
            {props.image === "" ? "Select Image" : "Change Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>

          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: "#1976d2",
              borderColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          >
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ImageUploaderModal;
