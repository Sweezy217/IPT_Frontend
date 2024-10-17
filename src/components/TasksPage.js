import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  CardContent,
  Card,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddTaskForm from "./modals/AddTaskModal";
import Cards from "./modals/Cards";
import DeleteTasksModal from "./modals/DeleteTasksModal";
import { getUserTasks } from "./apis/Apis";
import { useTaskContext } from "./hooks/useTaskContext";
import { useAuthContext } from "./hooks/useAuthContext";
import MoveTaskModal from "./modals/MoveTaskModal";

const TasksPage = () => {
  const { tasks, setTasks } = useTaskContext();
  const { user, userOrgs } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [inReviewTasks, setInReviewTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const sections = [
    { name: "In Progress" },
    { name: "In Review" },
    { name: "Done" },
  ];
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleMoveTask = (task) => {
    console.log("Task moved to:", task);
    handleCloseModal();
  };
  console.log("123456789op", tasks, "toDoTasks", toDoTasks);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, err] = await getUserTasks({
          email: user.email,
          workspaceName: userOrgs[0]?.workspaceName,
        });
        if (!err) {
          setTasks(data.message);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    // If tasks are already populated, filter them
    if (tasks.length) {
      setTasks(tasks);
    } else {
      fetchData();
    }
  }, [tasks]);
  useEffect(() => {
    setToDoTasks(tasks.filter((item) => item.status === "to do"));
    setInProgressTasks(tasks.filter((item) => item.status === "In Progress"));
    setInReviewTasks(tasks.filter((item) => item.status === "In Review"));
    setDoneTasks(tasks.filter((item) => item.status === "Done"));
  }, [tasks]);

  console.log("taskstaskstasks", tasks);
  // Handler to add a task to the respective category
  const addTask = (task) => {
    console.log(task);
    // Add the new task to the existing list using the spread operator
    setToDoTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <>
      <MoveTaskModal
        open={isModalOpen}
        onClose={handleCloseModal}
        sections={sections}
        onMoveTask={handleMoveTask}
      />
      {/* <CommonAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={alertSeverity}
        message={alertMessage}
      /> */}
      <Box
        sx={{
          display: "flex", // Flex container for horizontal layout
          flexGrow: 1,
          padding: "0 10px",
          width: "110%", // Let it take the full width
          overflowX: "hidden", // Enable horizontal scrolling
          overflowY: "auto", // Enable vertical scrolling as well
          whiteSpace: "nowrap",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Paper
              sx={{
                padding: "0",
                height: "100%",
                maxHeight: "87vh",
                overflowY: "auto",
                background: "rgba(0, 0, 0, 0.7)",
                scrollbarWidth: "thin", // For Firefox
                scrollbarColor: "#888 #333", // For Firefox: Thumb color and track color
                "&::-webkit-scrollbar": {
                  width: "5px", // Width of the scrollbar
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888", // Scrollbar thumb color
                  borderRadius: "10px", // Rounded corners for the scrollbar thumb
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555", // Color when hovering over the scrollbar thumb
                },
                "&::-webkit-scrollbar-track": {
                  background: "#333", // Scrollbar track color
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  position: "sticky", // Stick to the top when scrolling
                  top: 0, // Keep it pinned to the top
                  zIndex: 10, // Make sure it's above the other content
                  backgroundColor: "#ccc", // Make sure it blends with the Paper background
                  padding: "10px", // Add some padding for spacing
                  display: "flex",
                  color: "#fff",
                  height: "30px",
                  borderRadius: "3px",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 2,
                  opacity: "100%",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add subtle shadow to distinguish it when scrolling
                }}
              >
                To Do
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  marginTop: "10px",
                  opacity: "100%",
                }}
              >
                {toDoTasks.map((task) => (
                  <Cards
                    handleOpenModal={handleOpenModal}
                    task={task}
                    open={openDelete}
                    setSelectedTask={setSelectedTask}
                    setOpen={setOpenDelete}
                  />
                ))}
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<AddIcon />}
                  onClick={() => setOpen(true)}
                  sx={{ width: "255px", background: "#000", mb: 2 }}
                >
                  Add Task
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Repeat for other task categories */}
          <Grid item xs={3}>
            <Paper
              sx={{
                padding: "0",
                height: "100%",
                maxHeight: "87vh",
                overflowY: "auto",
                background: "rgba(0, 0, 0, 0.7)",
                scrollbarWidth: "thin", // For Firefox
                scrollbarColor: "#888 #333", // For Firefox: Thumb color and track color
                "&::-webkit-scrollbar": {
                  width: "5px", // Width of the scrollbar
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888", // Scrollbar thumb color
                  borderRadius: "10px", // Rounded corners for the scrollbar thumb
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555", // Color when hovering over the scrollbar thumb
                },
                "&::-webkit-scrollbar-track": {
                  background: "#333", // Scrollbar track color
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  position: "sticky", // Stick to the top when scrolling
                  top: 0, // Keep it pinned to the top
                  zIndex: 10, // Make sure it's above the other content
                  backgroundColor: "#ccc", // Make sure it blends with the Paper background
                  padding: "10px", // Add some padding for spacing
                  display: "flex",
                  color: "#fff",
                  height: "30px",
                  borderRadius: "3px",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 2,
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add subtle shadow to distinguish it when scrolling
                }}
              >
                In Progress
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  marginTop: "10px",
                }}
              >
                {inProgressTasks.map((task, index) => (
                  <Cards
                    handleOpenModal={handleOpenModal}
                    task={task}
                    open={openDelete}
                    setSelectedTask={setSelectedTask}
                    setOpen={setOpenDelete}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              sx={{
                padding: "0",
                height: "100%",
                maxHeight: "87vh",
                overflowY: "auto",
                background: "rgba(0, 0, 0, 0.7)",
                scrollbarWidth: "thin", // For Firefox
                scrollbarColor: "#888 #333", // For Firefox: Thumb color and track color
                "&::-webkit-scrollbar": {
                  width: "5px", // Width of the scrollbar
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888", // Scrollbar thumb color
                  borderRadius: "10px", // Rounded corners for the scrollbar thumb
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555", // Color when hovering over the scrollbar thumb
                },
                "&::-webkit-scrollbar-track": {
                  background: "#333", // Scrollbar track color
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  position: "sticky", // Stick to the top when scrolling
                  top: 0, // Keep it pinned to the top
                  zIndex: 10, // Make sure it's above the other content
                  backgroundColor: "#ccc", // Make sure it blends with the Paper background
                  padding: "10px", // Add some padding for spacing
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  height: "30px",
                  borderRadius: "3px",
                  flexDirection: "column",
                  gap: 2,
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add subtle shadow to distinguish it when scrolling
                }}
              >
                In Review
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  marginTop: "10px",
                }}
              >
                {inReviewTasks.map((task, index) => (
                  <Cards
                    handleOpenModal={handleOpenModal}
                    task={task}
                    open={openDelete}
                    setSelectedTask={setSelectedTask}
                    setOpen={setOpenDelete}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              sx={{
                padding: "0",
                height: "100%",
                maxHeight: "87vh",
                overflowY: "auto",
                background: "rgba(0, 0, 0, 0.7)",
                scrollbarWidth: "thin", // For Firefox
                scrollbarColor: "#888 #333", // For Firefox: Thumb color and track color
                "&::-webkit-scrollbar": {
                  width: "5px", // Width of the scrollbar
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888", // Scrollbar thumb color
                  borderRadius: "10px", // Rounded corners for the scrollbar thumb
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555", // Color when hovering over the scrollbar thumb
                },
                "&::-webkit-scrollbar-track": {
                  background: "#333", // Scrollbar track color
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  position: "sticky", // Stick to the top when scrolling
                  top: 0, // Keep it pinned to the top
                  zIndex: 10, // Make sure it's above the other content
                  backgroundColor: "rgba(204, 204, 204, 0.9)",
                  padding: "10px", // Add some padding for spacing
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  height: "30px",
                  borderRadius: "3px",
                  flexDirection: "column",
                  gap: 2,
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add subtle shadow to distinguish it when scrolling
                }}
              >
                Done
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  marginTop: "10px",
                }}
              >
                {doneTasks.map((task, index) => (
                  <Cards
                    handleOpenModal={handleOpenModal}
                    task={task}
                    open={openDelete}
                    setSelectedTask={setSelectedTask}
                    setOpen={setOpenDelete}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <AddTaskForm open={open} setOpen={setOpen} addTask={addTask} />
      <DeleteTasksModal
        open={openDelete}
        setOpen={setOpenDelete}
        toDoTasks={toDoTasks}
        setToDoTasks={setToDoTasks}
        inProgressTasks={inProgressTasks}
        inReviewTasks={inReviewTasks}
        doneTasks={doneTasks}
        setInProgressTasks={setInProgressTasks}
        setInReviewTasks={setInReviewTasks}
        setDoneTasks={setDoneTasks}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
    </>
  );
};

export default TasksPage;
