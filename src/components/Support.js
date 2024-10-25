import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
// import emailjs from "emailjs-com"; // Import EmailJS

const Support = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // const handleSendEmail = () => {
  //   if (email && message) {
  //     const templateParams = {
  //       user_email: email,
  //       user_message: message,
  //     };

  //     emailjs
  //       .send(
  //         process.env.REACT_APP_EMAILJS_SERVICE_ID, // Use env variable
  //         process.env.REACT_APP_EMAILJS_TEMPLATE_ID, // Use env variable
  //         templateParams,
  //         process.env.REACT_APP_EMAILJS_USER_ID // Use env variable
  //       )
  //       .then(
  //         (response) => {
  //           console.log(
  //             "Email sent successfully!",
  //             response.status,
  //             response.text
  //           );
  //           setStatus("Email sent successfully!");
  //         },
  //         (error) => {
  //           console.error("Failed to send email:", error);
  //           setStatus("Failed to send email.");
  //         }
  //       );
  //   } else {
  //     setStatus("Please fill out both fields.");
  //   }
  // };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Support</Typography>

      {/* Contact Us Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Contact Us</Typography>
        <TextField
          fullWidth
          label="Your Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Your Message"
          variant="outlined"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
          // onClick={handleSendEmail}
        >
          Send Message
        </Button>

        {status && (
          <Typography sx={{ mt: 2 }} variant="body2" color="error" setStatus={setStatus}>
            {status}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Support;
