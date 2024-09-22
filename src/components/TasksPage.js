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

const TasksPage = () => {
  const { tasks, setTasks } = useTaskContext();
  const { user, userOrgs } = useAuthContext();
  const [toDoTasks, setToDoTasks] = useState(tasks || []);
  const [toDoTask, setToDoTask] = useState({});
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [inReviewTasks, setInReviewTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

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
      setToDoTasks(tasks.filter((item) => item.status === "to do"));
    } else {
      fetchData();
    }
  }, [tasks]);
  useEffect(() => {
    // This effect runs whenever tasks change
    setToDoTasks(tasks.filter((item) => item.status === "to do"));
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
      <Box sx={{ flexGrow: 1, padding: " 0 10px" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper
              sx={{
                padding: "10px",
                height: "100%",
                maxHeight: "80vh",
                overflowY: "auto", // Add scrollbar when content overflows
              }}
            >
              <Typography variant="h6" gutterBottom>
                To Do
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {toDoTasks.map((task) => (
                  <Cards
                    task={task}
                    open={openDelete}
                    setOpen={setOpenDelete}
                  />
                ))}
              </Box>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
                sx={{ mt: 2 }}
              >
                Add Task
              </Button>
            </Paper>
          </Grid>

          {/* Repeat for other task categories */}
          <Grid item xs={3}>
            <Paper
              sx={{
                padding: "10px",
                height: "100%",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <Typography variant="h6" gutterBottom>
                In Progress
              </Typography>
              <ul>
                {inProgressTasks.map((task, index) => (
                  <li key={index}>{task.title}</li>
                ))}
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              sx={{
                padding: "10px",
                height: "100%",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <Typography variant="h6" gutterBottom>
                In Review
              </Typography>
              <ul>
                {inReviewTasks.map((task, index) => (
                  <li key={index}>{task.title}</li>
                ))}
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              sx={{
                padding: "10px",
                height: "100%",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Done
              </Typography>
              <ul>
                {doneTasks.map((task, index) => (
                  <li key={index}>{task.title}</li>
                ))}
              </ul>
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
        toDoTask={toDoTask}
        setToDoTask={setToDoTask}
      />
    </>
  );
};

export default TasksPage;
