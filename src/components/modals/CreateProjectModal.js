import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useTeamMemberContext } from "../hooks/useTeamMemberContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchTeamMembers } from "../utils/Utils";
import { addProject } from "../apis/Apis";
import { useProjectContext } from "../hooks/useProjectContext";

const CreateProjectModal = (props) => {
  const { teamMembers } = useTeamMemberContext();
  const { userOrgs } = useAuthContext();
  const workspaceName = userOrgs[0] || [];
  const { projects, setProjects } = useProjectContext();

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    selectedTeamMembers: [],
    priority: "",
    status: "",
  });
  const currentTeamMembers = useFetchTeamMembers(
    workspaceName.workspaceName,
    teamMembers
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const onSubmit = async () => {
    const missingFields = [];

    for (const [key, value] of Object.entries(newProject)) {
      if (value === "" || (Array.isArray(value) && value.length === 0)) {
        missingFields.push(key);
      }
    }

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following fields: ${missingFields.join(" , ")}`
      );
      return;
    }

    try {
      const [, err] = await addProject({
        ...newProject,
        workspaceName: workspaceName.workspaceName,
      });
      if (!err) {
        handleClose();
        setNewProject({
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          selectedTeamMembers: [],
          priority: "",
          status: "",
        });
      }
      setProjects([...projects, newProject]);
      alert("Project Successfully Saved");
    } catch (error) {
      console.error();
      alert(error);
    }
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          maxHeight: "85vh",
          bgcolor: "background.default",
          borderRadius: 3,
          boxShadow: 5,
          overflowY: "auto",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Create a New Project
        </Typography>
        <TextField
          label="Project Title"
          name="title"
          value={newProject.title}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Project Description"
          name="description"
          value={newProject.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Box display="flex" gap={2}>
          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={newProject.startDate}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField
            label="End Date"
            type="date"
            name="endDate"
            value={newProject.endDate}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Box>

        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel id="team-members-label">Team Members</InputLabel>
          <Select
            labelId="team-members-label"
            name="selectedTeamMembers"
            value={newProject.selectedTeamMembers}
            onChange={(e) => {
              setNewProject({
                ...newProject,
                selectedTeamMembers: e.target.value,
              });
            }}
            multiple
            renderValue={(selected) =>
              selected
                .map((member) => `${member.firstName} ${member.lastName}`)
                .join(", ")
            }
            label="Team Members"
          >
            {currentTeamMembers
              .filter(
                (item) => item.workspaceName === workspaceName.workspaceName
              )
              .map((member) => (
                <MenuItem key={member._id} value={member}>
                  {`${member.firstName} ${member.lastName}`}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <Box display="flex" gap={2}>
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={newProject.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={newProject.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="not-started">Not Started</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          sx={{
            mt: 2,
            py: 1.5,
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          Create Project
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateProjectModal;
