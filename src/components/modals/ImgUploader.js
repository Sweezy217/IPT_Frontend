import React from "react";
import { Avatar, Button, Modal, Box, Typography, Stack } from "@mui/material";

const ImageUploaderModal = (props) => {
  const handleClose = () => {
    props.setOpen(false);
    props.setImage("");
  };

  // Function to handle image upload
  const handleUploadImg = (e) => {
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
          textAlign: "center",
        }}
      >
        {/* Modal Title */}
        <Typography
          variant="h6"
          component="h2"
          sx={{ mb: 3, fontWeight: "bold" }}
        >
          Upload Profile Picture
        </Typography>

        {/* Avatar to display uploaded image */}
        <Avatar
          alt="Uploaded Image"
          src={props.image}
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            border: "2px solid #1976d2",
            boxShadow: 2,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />

        {/* Buttons for selecting and saving the image */}
        <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            component="label"
            sx={{
              px: 3,
              width: "100%",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            {props.image === "" ? "Select Image" : "Change Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleUploadImg}
            />
          </Button>

          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                width: "50%",
                color: "#1976d2",
                borderColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                },
              }}
            >
              Save Image
            </Button>

            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                width: "50%",
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
        </Stack>
      </Box>
    </Modal>
  );
};

export default ImageUploaderModal;
