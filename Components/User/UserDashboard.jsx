// src/pages/UserDashboard.js
import { useEffect, useState } from "react";
import axios from "axios";
import AppNavbar from "./Navbar";  // Adjust path to Navbar
import TaskCard from "./TaskCard";  // Adjust path to TaskCard

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) throw new Error("No token found. Please log in.");

        // Fetch user details using token
        const userResponse = await axios.get("http://localhost:5000/api/v1/users", {
          headers: {
            "x-access-token": token,
          },
        });

        const loggedInEmail = localStorage.getItem("userEmail");
        const userData = userResponse.data.data.find(
          (user) => user.email === loggedInEmail
        );

        if (!userData) throw new Error("User not found");

        setUserId(userData._id);

        // Fetch tasks after getting user ID
        fetchTasks(userData._id, token);
      } catch (error) {
        setError("Failed to fetch user details");
        setLoading(false);
      }
    };

    const fetchTasks = async (userId, token) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/task/${userId}`, {
          headers: {
            "x-access-token": token,
          },
        });
        setTasks(response.data.data);
      } catch (error) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <AppNavbar /> {/* Add Navbar here */}
      <div className="container mt-4">
        <div className="row justify-content-between">
          <div className="col-auto">
            <h2 className="dashboard-title">Assigned Tasks</h2>
          </div>
        </div>

        {loading ? (
          <p className="loading-text">Loading tasks...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : tasks.length > 0 ? (
          <div className="row">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} /> 
            ))}
          </div>
        ) : (
          <p>No tasks assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
