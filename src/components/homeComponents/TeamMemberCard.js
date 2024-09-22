import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TeamMemberCard = (props) => {
  console.log("props.teamMember1232", props.teamMember);
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3} key={props.member.name}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            boxShadow: 5,
            borderRadius: "16px",
            height: "250px",
            transition:
              "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: 10,
            },
            position: "relative",
          }}
        >
          <Avatar
            sx={{
              mb: 2,
              bgcolor: "primary.main",
              width: 64,
              height: 64,
              fontSize: "1.25rem",
            }}
          >
            {props.member.firstName[0] + props.member.lastName[0]}
          </Avatar>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold">
              {`${props.member.firstName}  ${props.member.lastName}`}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1, fontStyle: "italic" }}
            >
              {props.member.roles[0]}
            </Typography>
          </CardContent>

          <Box
            sx={{
              //   border: "2px solid red",
              width: "130px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              aria-label="edit"
              onClick={() => {
                props.setTeamMember(props.member);
                props.setOpen(true);
              }}
              sx={{
                bgcolor: "info.main",
                color: "white",
                transition: "background-color 0.3s",
                "&:hover": { bgcolor: "info.dark" },
                mr: 1,
                boxShadow: 3,
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => {
                props.setTeamMember(props.member);
                props.setOpenDelete(true);
              }}
              sx={{
                bgcolor: "error.main",
                color: "white",
                transition: "background-color 0.3s",
                "&:hover": { bgcolor: "error.dark" },
                boxShadow: 3,
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default TeamMemberCard;
