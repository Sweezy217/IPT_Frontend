import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  // Paper,
} from "@mui/material";
import CreateProjectModal from "./modals/CreateProjectModal";
import { useProjectContext } from "./hooks/useProjectContext";
import { getProjects } from "./apis/Apis";
import { useAuthContext } from "./hooks/useAuthContext";

const ProjectsPage = () => {
  const { projects, setProjects } = useProjectContext();
  const { userOrgs } = useAuthContext();
  const workspaceName = userOrgs[0] || [];
  const [currentProj, setCurrentProj] = useState(projects || []);
  const [openModal, setOpenModal] = useState();

  useEffect(() => {
    const fetchProjects = async () => {
      if (projects.length > 0) {
        return setCurrentProj(projects);
      }

      try {
        const [proj, err] = await getProjects(workspaceName.workspaceName);
        if (!err) {
          console.log("proj", proj);
          setProjects(proj);
          setCurrentProj(proj);
        } else {
          console.error("Error fetching projects:", err);
        }
      } catch (error) {
        console.error(
          "An unexpected error occurred while fetching projects:",
          error
        );
      }
    };

    fetchProjects();
  }, [projects, currentProj]);

  return (
    <>
      <Box sx={{ padding: 1}}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#fff", textAlign: "center", mb: 2 }}
        >
          Projects
        </Typography>

        <Grid container spacing={3}>
          {currentProj.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card
                variant="outlined"
                sx={{ height: "100%", borderRadius: 2, boxShadow: 3 }}
              >
                <CardContent sx={{ padding: 3 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "600", marginBottom: 1 }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 1 }}
                  >
                    {project.description}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Start Date: <strong>{project.startDate}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Priority: <strong>{project.priority}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: <strong>{project.status}</strong>
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "space-between", padding: 2 }}
                >
                  <Button size="small" color="primary" variant="contained">
                    View Details
                  </Button>
                  <Button size="small" color="secondary" variant="outlined">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {/* Create Project Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Create New Project
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Start a new project by filling out the details.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setOpenModal(true)}
                >
                  Create Project
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <CreateProjectModal open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default ProjectsPage;
