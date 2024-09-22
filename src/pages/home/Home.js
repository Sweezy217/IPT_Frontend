import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SignUpSide from "../signup/Signup";
import { useAuthContext } from "../../components/hooks/useAuthContext";
import {
  fetchUserWorkspaces,
  fetchTeamMembers,
} from "../../components/apis/Apis";
import { useTeamMemberContext } from "../../components/hooks/useTeamMemberContext";

const HomePage = () => {
  const { user, setUser, setUserOrgs } = useAuthContext();
  const { setTeamMembers } = useTeamMemberContext();
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

      try {
        const [userOrgs, userOrgsError] = await fetchUserWorkspaces(
          loggedIn.email
        );
        if (userOrgsError) {
          console.error("Error fetching user workspaces:", userOrgsError);
          return;
        }

        setUserOrgs(userOrgs);

        if (!userOrgs.length > 0) {
          console.log("No workspaces found for the user.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("123456789", user);
  return (
    <>
      {Object.keys(user).length ? (
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box sx={{ position: "fixed", top: "0", height: "100vh" }}>
            <SideBar user={user} />
          </Box>
          <Box sx={{ flex: 1, p: 3, marginLeft: "270px" }}>
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
