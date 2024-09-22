import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for charts
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const Report = () => {
  const barChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Task Completion Rate",
        data: [50, 30, 30, 45, 24, 60, 20, 40, 70, 100, 80, 30],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [10, 25, 65],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: "grey",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Ideal Burndown",
        data: [20, 16, 12, 8, 4],
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
      {
        label: "Actual Progress",
        data: [20, 15, 13, 10, 2],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Reports</Typography>
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Task Completion Rate</Typography>
            <Bar data={barChartData} />
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Workload Distribution</Typography>
            <Pie data={pieChartData} />
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Sprint Completion</Typography>
            <Line data={lineChartData} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Report;
