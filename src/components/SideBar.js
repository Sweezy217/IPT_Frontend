import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  FormControl,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import ImageUploaderModal from "./modals/ImgUploader";
import { useAuthContext } from "./hooks/useAuthContext";
import { uploadImg } from "./apis/Apis";
import { useTaskContext } from "./hooks/useTaskContext";
import { useTeamMemberContext } from "./hooks/useTeamMemberContext";

const SideBar = (props) => {
  const navigate = useNavigate();
  const { userOrgs } = useAuthContext();
  const { tasks, setTasks } = useTaskContext();
  const user = props.user;
  const workspaces = userOrgs[0] || [];
  const [selectedValue, setSelectedValue] = useState("");
  const { teamMembers, setTeamMembers } = useTeamMemberContext();
  const userIntials = user.firstName[0] + user.lastName[0];
  const [image, setImage] = useState("");
  const [openUploadImg, setOpenUploadImg] = useState(false);

  const items = [
    { label: "Tasks", path: "/tasks" },
    { label: "Team", path: "/team" },
    { label: "Projects", path: "/projects" },
    { label: "Schedule", path: "/schedule" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Report", path: "/report" },
    { label: "Settings", path: "/settings" },
    { label: "Support", path: "/support" },
    { label: "Logout", path: "/login" },
  ];

  const handleUploadImg = async (imgData) => {
    try {
      const [uploadImg, err] = await uploadImg(imgData);

      if (!err) {
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const names = [];

  userOrgs.map((item) => {
    names.push(item.workspaceName);
  });
  console.log(names, "workspaces123", userOrgs);
  const organization = localStorage.getItem("organization");
  console.log(organization);

  return (
    <>
      <Box
        sx={{
          width: "200px",
          backgroundColor: "blue",
          padding: "20px",
          color: "white",
          height: "100vh",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            cursor: workspaces.length > 1 ? "pointer" : "default",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {organization || "Select Workspace"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedValue} // Bind to state
              label={organization || "Select Workspace"}
              onChange={(e) => {
                const newValue = e.target.value; // Get the new selected value
                setSelectedValue(newValue); // Update the state
                localStorage.setItem("organization", newValue); // Store the new value in localStorage
                setTasks([]);
                setTeamMembers([]);
              }}
            >
              {names.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Typography>

        {/* Navigation items */}
        {items.map((item, index) =>
          item.label === "Logout" ? (
            <Button
              key={index}
              variant="text"
              color="inherit"
              sx={{
                padding: "5px 0",
                cursor: "pointer",
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              onClick={() => {
                localStorage.removeItem("AuthUser");
                navigate(item.path);
              }}
            >
              {item.label}
            </Button>
          ) : (
            <Typography
              key={index}
              gutterBottom
              sx={{
                padding: "5px 0",
                cursor: "pointer",
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Typography>
          )
        )}
        <Divider sx={{ borderColor: "grey", margin: "20px 0" }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            bottom: "20px",
            left: "20px",
          }}
        >
          <Avatar
            alt={userIntials}
            src={image}
            sx={{
              marginRight: "10px",
              cursor: "pointer",
              width: "60px",
              height: "60px",
            }}
            onClick={() => setOpenUploadImg(true)}
          />
          <Typography sx={{ fontSize: "20px" }} variant="body2">
            {userIntials}
          </Typography>
        </Box>
      </Box>
      <ImageUploaderModal
        open={openUploadImg}
        setOpen={setOpenUploadImg}
        image={image}
        handleUploadImg={handleUploadImg}
        setImage={setImage}
      />
    </>
  );
};

export default SideBar;
