import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SignUpSide from "../signup/Signup";
import { useAuthContext } from "../../components/hooks/useAuthContext";
import {
  fetchUserWorkspaces,
  // fetchTeamMembers,
} from "../../components/apis/Apis";
// import { useTeamMemberContext } from "../../components/hooks/useTeamMemberContext";

const HomePage = () => {
  const { user, setUser, userOrgs, setUserOrgs } = useAuthContext();
  // const { setTeamMembers } = useTeamMemberContext();
  useEffect(() => {
    const fetchData = async () => {
      let currentUser = localStorage.getItem("AuthUser");
      let loggedIn = JSON.parse(currentUser);

      if (!loggedIn) {
        loggedIn = {};
      }

      setUser(loggedIn);

      if (!loggedIn.email) {
        console.error("User email not found. Cannot fetch workspaces.");
      }
      if (userOrgs.length > 0) {
        return;
      }
      try {
        const [userOrg, userOrgsError] = await fetchUserWorkspaces(
          loggedIn.email
        );
        if (userOrgsError) {
          console.error("Error fetching user workspaces:", userOrgsError);
          return;
        }

        setUserOrgs(userOrg);

        if (!userOrg.length > 0) {
          console.log("No workspaces found for the user.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userOrgs]);

  console.log(userOrgs, "123456789");

  return (
    <>
      {Object.keys(user).length ? (
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            backgroundImage: "url(./backimg.jpg)",
          }}
        >
          <Box
            sx={{ position: "fixed", top: "0", height: "100vh", zIndex: "20" }}
          >
            <SideBar user={user} userOrgs={userOrgs} />
          </Box>
          <Box
            sx={{
              flex: 1,
              p: 3,
              marginLeft: "220px",
              width: "100%",
              overflow: "auto",
              overflowX: "auto", // Enable horizontal scrolling
              "&::-webkit-scrollbar": {
                height: "8px", // Slim height for the horizontal scrollbar
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#C4C4C4", // Light color for the scrollbar thumb
                borderRadius: "10px", // Rounded corners for a modern look
                border: "2px solid transparent", // Some space between thumb and track
                backgroundClip: "content-box", // Ensure thumb has padding inside the track
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#A0A0A0", // Darken on hover for better visibility
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent", // Make the track transparent
              },
              scrollbarWidth: "thin", // For Firefox
              scrollbarColor: "#C4C4C4 transparent", // Firefox thumb and track colors
            }}
          >
            <Outlet />
          </Box>
        </Box>
      ) : (
        <SignUpSide />
      )}
    </>
  );
};

export default HomePage;
