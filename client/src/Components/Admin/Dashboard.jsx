import { useState, useEffect } from "react";
import axios from "axios";

const AdminTaskAssign = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]); // State to store assigned tasks
  const [formData, setFormData] = useState({
    assignedTo: "",
    title: "",
    description: "",
    deadline: "",
    priority: "medium", // Default priority
    status: "pending", // Default status
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // Fetch token from localStorage
        const response = await axios.get("http://localhost:5000/api/v1/users", {
          headers: {
            "x-access-token": token, // Pass token for authentication
          },
        });

        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          setMessage("Failed to fetch users");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setMessage("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.assignedTo || !formData.title || !formData.description || !formData.deadline) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken"); // Ensure correct token is used

      const response = await axios.post(
        `http://localhost:5000/api/v1/task/create/${formData.assignedTo}`, // Pass userId in URL
        {
          title: formData.title,
          description: formData.description,
          deadline: formData.deadline,
          priority: formData.priority,
          status: formData.status,
        },
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setMessage("Task assigned successfully!");
        // Add the newly assigned task to the tasks state
        setTasks((prevTasks) => [
          ...prevTasks,
          {
            ...response.data.task, // assuming the new task is returned in the response
          },
        ]);
        setFormData({
          assignedTo: "",
          title: "",
          description: "",
          deadline: "",
          priority: "medium",
          status: "pending",
        });
      } else {
        setMessage("Failed to assign task");
      }
    } catch (error) {
      console.error("Error assigning task:", error);
      setMessage("Failed to assign task");
    }
  };

  return (
    <div>
      <h2>Assign Task</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} required>
          <option value="">Select User</option>
          {users.length > 0 ? (
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username} ({user.email})
              </option>
            ))
          ) : (
            <option disabled>Loading users...</option>
          )}
        </select>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />

        <select name="priority" value={formData.priority} onChange={handleChange} required>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit">Assign Task</button>
      </form>

      {/* Display the assigned tasks */}
      {tasks.length > 0 && (
        <div>
          <h3>Assigned Tasks</h3>
          <div className="assigned-tasks-container">
            {tasks.map((task) => (
              <div key={task._id} className="task-card">
                <h4>{task.title}</h4>
                <p>{formData.description}</p>
                <p><strong>Assigned To:</strong> {task.assignedTo?.username}</p>
                <p><strong>Deadline:</strong> {task.deadline}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTaskAssign;
