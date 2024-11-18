import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { postUserWorkSpace } from "../../components/apis/Apis";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CommonAlert from "../../components/modals/Alert";

const defaultTheme = createTheme();

export default function SignUpSide() {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      owner_email: formData.get("email"),
      workspaceName: formData.get("workspaceName"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
    };

    const missingFields = Object.entries(data).filter(([key, value]) => !value);

    if (missingFields.length > 0) {
      return handleShowAlert(
        `Please fill in the following fields: ${missingFields
          .map(([key]) => key)
          .join(", ")}`,
        "error"
      );
    }
    const email = formData.get("email");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return handleShowAlert(
        "Please enter a valid email address, including a '@' and a domain (e.g., '.com') after it.",
        "error"
      );
    }
    if (formData.get("password") !== formData.get("confirm-password")) {
      return handleShowAlert("Passwords do not match", "error");
    }
    const [, err] = await postUserWorkSpace(data);

    if (!err) {
      return navigate("/login");
    }

    return handleShowAlert(err, "error");
  };

  return (
    <>
      <CommonAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={alertSeverity}
        message={alertMessage}
      />
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              position: "relative",
              backgroundImage: "url(/work.gif)",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "100% 100%",
              opacity: "80%",
              backgroundPosition: "left",
              backgroundRepeat: "no-repeat",
            }}
          ></Grid>

          <Grid
            sx={{ boxShadow: "2px 4px 6px 8px grey" }}
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mt: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create New Workspace
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                {/* Grid for Name and Surname side by side */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                    />
                  </Grid>
                </Grid>

                {/* Email input */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />

                {/* Workspace Name input */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="workspaceName"
                  label="Workspace Name"
                  name="workspaceName"
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      // autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="confirm-password"
                      label="Confirm Password"
                      name="confirm-password"
                    />
                  </Grid>
                </Grid>
                {/* Remember Me checkbox */}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                {/* Submit button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Workspace
                </Button>

                {/* Link to login */}
                <Grid container>
                  <Grid item xs>
                    <Link to="/" variant="body2">
                      {"Sign Up to Existing WorkSpace"}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/login" variant="body2">
                      {"Already have an account? Login"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
