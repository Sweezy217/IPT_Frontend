import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageUploaderModal from "./modals/ImgUploader";
import { useAuthContext } from "./hooks/useAuthContext";

const SideBar = (props) => {
  const navigate = useNavigate();
  const { userOrgs } = useAuthContext();
  const user = props.user;
  const workspaces = userOrgs[0] || [];
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

  return (
    <>
      <Box
        sx={{
          width: "250px",
          backgroundColor: "blue",
          boxShadow: "2px 4px 6px 2px #ccc",
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
          {workspaces?.workspaceName}
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
        setImage={setImage}
      />
    </>
  );
};

export default SideBar;
