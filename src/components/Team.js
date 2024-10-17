import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";
import TeamMemberCard from "./homeComponents/TeamMemberCard";
import AddTeamMemberCard from "./homeComponents/AddMember";
import InviteUserModal from "./modals/InviteModal";
import { fetchTeamMembers } from "./apis/Apis";
import { useAuthContext } from "./hooks/useAuthContext";
import { useTeamMemberContext } from "./hooks/useTeamMemberContext";

const Team = (props) => {
  const { userOrgs } = useAuthContext();
  const { teamMembers, setTeamMembers } = useTeamMemberContext();
  const workspaceName = userOrgs[0] || [];
  const [currentTeamMembers, setCurrentTeamMembers] = useState(
    teamMembers || []
  );
  const [teamMember, setTeamMember] = useState({});
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (currentTeamMembers?.length) {
        return;
      }

      try {
        const [data, err] = await fetchTeamMembers(workspaceName.workspaceName);
        if (!err) {
          setTeamMembers(data);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchData();
  }, [currentTeamMembers, workspaceName.workspaceName]);
  useEffect(() => {
    setCurrentTeamMembers(
      teamMembers.filter(
        (item) => item.workspaceName == workspaceName.workspaceName
      )
    );
  }, [teamMembers]);

  console.log("currentTeamMembers", currentTeamMembers);
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", color: "#fff" }}
        >
          Team Members
        </Typography>
        <Grid container spacing={3}>
          {currentTeamMembers
            .filter((item) => item.workspaceName == workspaceName.workspaceName)
            .map((member) => (
              <TeamMemberCard
                member={member}
                setOpen={setOpen}
                teamMember={teamMember}
                setOpenDelete={setOpenDelete}
                setTeamMember={setTeamMember}
              />
            ))}
          <AddTeamMemberCard open={openInvite} setOpen={setOpenInvite} />
        </Grid>
      </Box>
      <EditModal
        open={open}
        setOpen={setOpen}
        teamMembers={currentTeamMembers}
        setTeamMember={setTeamMember}
        teamMember={teamMember}
        setCurrentTeamMembers={setCurrentTeamMembers}
        setTeamMembers={setTeamMembers}
      />
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        teamMember={teamMember}
        teamMembers={currentTeamMembers}
        setTeamMember={setTeamMember}
        setCurrentTeamMembers={setCurrentTeamMembers}
        setTeamMembers={setTeamMembers}
      />
      <InviteUserModal
        open={openInvite}
        setOpen={setOpenInvite}
        workspaceName={workspaceName?.workspaceName}
        setTeamMembers={setTeamMembers}
      />
    </>
  );
};

export default Team;
