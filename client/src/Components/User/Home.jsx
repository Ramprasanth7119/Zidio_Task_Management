import React from "react";
import { ProgressBar } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./Navbar";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Home = () => {
  const taskStats = {
    total: 12,
    pending: 3,
    inProgress: 5,
    completed: 4,
  };

  const recentActivities = [
    { task: "Finish Report", status: "Completed", date: "02/25/2025" },
    { task: "Update Docs", status: "Pending", date: "02/24/2025" },
  ];

  const upcomingTasks = [
    { title: "Design Website Mockup", deadline: "02/26/2025" },
    { title: "Team Meeting", deadline: "02/28/2025" },
  ];

  const progressData = {
    completed: 40,
    inProgress: 30,
    notStarted: 30,
  };

  const chartData = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        label: "Task Progress",
        data: [progressData.completed, progressData.inProgress, progressData.notStarted],
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <AppNavbar />
      <div className="container mt-4">
        <h2 className="mb-4">Dashboard</h2>

        {/* Task Stats */}
        <div className="row">
          <div className="col-md-3">
            <div className="card text-white bg-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Tasks</h5>
                <p className="card-text">{taskStats.total}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-warning mb-3">
              <div className="card-body">
                <h5 className="card-title">Pending</h5>
                <p className="card-text">{taskStats.pending}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-info mb-3">
              <div className="card-body">
                <h5 className="card-title">In Progress</h5>
                <p className="card-text">{taskStats.inProgress}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-success mb-3">
              <div className="card-body">
                <h5 className="card-title">Completed</h5>
                <p className="card-text text-black">{taskStats.completed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-4">
          <h4>Recent Activities</h4>
          <ul className="list-group">
            {recentActivities.map((activity, index) => (
              <li key={index} className="list-group-item">
                <strong>{activity.task}</strong> - {activity.status} on {activity.date}
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Tasks */}
        <div className="mt-4">
          <h4>Upcoming Tasks</h4>
          <ul className="list-group">
            {upcomingTasks.map((task, index) => (
              <li key={index} className="list-group-item">
                <strong>{task.title}</strong> | Deadline: {task.deadline}
              </li>
            ))}
          </ul>
        </div>

        {/* Task Progress Tracker */}
        <div className="mt-4">
          <h4>Task Progress Tracker</h4>
          <ProgressBar>
            <ProgressBar variant="success" now={progressData.completed} key={1} label={`${progressData.completed}%`} />
            <ProgressBar variant="warning" now={progressData.inProgress} key={2} label={`${progressData.inProgress}%`} />
            <ProgressBar variant="danger" now={progressData.notStarted} key={3} label={`${progressData.notStarted}%`} />
          </ProgressBar>
        </div>

        {/* Graph */}
        <div className="mt-4">
          <h4>Task Progress Overview</h4>
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
