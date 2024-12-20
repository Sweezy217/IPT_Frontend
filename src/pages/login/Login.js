import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../../components/apis/Apis";
import CommonAlert from "../../components/modals/Alert";

const defaultTheme = createTheme();

export default function SignInSide(props) {
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

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      isChecked: isChecked,
    };
    if (!formData.get("email") || !formData.get("password")) {
      return handleShowAlert(
        "Both email and password fields are required.",
        "error"
      );
    }

    // if (formData.get("password").length < 7) {
    //   return handleShowAlert(
    //     "Password length must be at least 8 characters.",
    //     "error"
    //   );
    // }

    const email = formData.get("email");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return handleShowAlert(
        "Please enter a valid email address, including a '@' and a domain (e.g., '.com') after it.",
        "error"
      );
    }

    try {
      const [logginUser, err] = await login(data);
      if (!err) {
        localStorage.setItem("AuthUser", JSON.stringify(logginUser.user));
        navigate("/");
        handleShowAlert("User Logged In", "success");
        window.location.reload();
        return;
      }
      handleShowAlert(err, "error");
    } catch (err) {
      handleShowAlert(err, "error");
    }
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
              backgroundImage: "url(/coffee.gif)",
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
                mt: 14,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login to WorkSpace
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  // autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/forgotpassword">Forgot password?</Link>
                  </Grid>
                  <Grid item>
                    <Link to="/">{"Don't have an account? Sign Up"}</Link>
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
