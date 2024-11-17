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
import AddIcon from "@mui/icons-material/Add";

const AddTeamMemberCard = (props) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          boxShadow: 5,
          borderRadius: "16px",
          height: "250px",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
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
        ></Avatar>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold">
            Invite TeamMember
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 1, fontStyle: "italic" }}
          >
            Invite a TeamMember
          </Typography>
        </CardContent>

        <Box
          sx={{
            width: "130px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            id="invite"
            aria-label="add"
            onClick={() => props.setOpen(true)}
            sx={{
              bgcolor: "success.main",
              color: "white",
              transition: "background-color 0.3s",
              "&:hover": { bgcolor: "success.dark" },
              boxShadow: 3,
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Card>
    </Grid>
  );
};

export default AddTeamMemberCard;
