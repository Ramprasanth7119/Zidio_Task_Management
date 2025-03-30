import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminTaskAssign = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    assignedTo: "",
    title: "",
    description: "",
    deadline: "",
    priority: "medium",
    status: "pending",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:5000/api/v1/users", {
        headers: { "x-access-token": token },
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

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:5000/api/v1/task", {
        headers: { "x-access-token": token },
      });

      if (response.data.success) {
        setTasks(response.data.data);
      } else {
        setMessage("Failed to fetch tasks");
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setMessage("Error fetching tasks");
    }
  };

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
      const token = localStorage.getItem("adminToken");
      const response = isEditing
        ? await axios.put(
            `http://localhost:5000/api/v1/task/${editingTaskId}`,
            formData,
            {
              headers: {
                "x-access-token": token,
                "Content-Type": "application/json",
              },
            }
          )
        : await axios.post(
            `http://localhost:5000/api/v1/task/create/${formData.assignedTo}`,
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
        setMessage(isEditing ? "Task updated successfully!" : "Task assigned successfully!");
        fetchTasks();
        resetForm();
      } else {
        setMessage("Failed to save task");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      setMessage("Failed to save task");
    }
  };

  const handleEditClick = (task) => {
    setFormData({
      assignedTo: task.assignedTo._id,
      title: task.title,
      description: task.description,
      deadline: task.deadline.split("T")[0], // Format date for input
      priority: task.priority,
      status: task.status,
    });
    setIsEditing(true);
    setEditingTaskId(task._id);
    setShowModal(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/users/logout', {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('adminToken'),
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        localStorage.removeItem('adminToken'); // Remove token from storage
        navigate('/'); // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(
        `http://localhost:5000/api/v1/task/status/${taskId}`,
        { status: newStatus },
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setMessage("Task status updated successfully!");
        fetchTasks();
      } else {
        setMessage("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      setMessage("Error updating task status");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(
        `http://localhost:5000/api/v1/task/delete/${taskId}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (response.data.success) {
        setMessage("Task deleted successfully!");
        fetchTasks();
      } else {
        setMessage("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      setMessage("Error deleting task");
    }
  };

  const resetForm = () => {
    setFormData({
      assignedTo: "",
      title: "",
      description: "",
      deadline: "",
      priority: "medium",
      status: "pending",
    });
    setIsEditing(false);
    setEditingTaskId(null);
    setShowModal(false);
  };

  return (
    <div className="container my-5">
      <button onClick={handleLogout} className="btn btn-danger mb-4">Logout</button>
      <h2 className="mb-4 text-center">{isEditing ? "Edit Task" : "Assign Task"}</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {/* Task Assignment Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="assignedTo" className="form-label">Assign Task To</label>
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="form-select"
                required
              >
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
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Task Title</label>
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Task Description</label>
              <textarea
                name="description"
                placeholder="Task Description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="deadline" className="form-label">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="priority" className="form-label">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Update Task" : "Assign Task"}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="btn btn-secondary ms-3">
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Display Assigned Tasks */}
      <h3 className="text-center mb-4">Assigned Tasks</h3>
      <div className="row">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p><strong>Assigned To:</strong> {task.assignedTo.username}</p>
                  <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                  <p><strong>Status:</strong> <span className={`badge ${task.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>{task.status}</span></p>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEditClick(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => updateTaskStatus(task._id, "completed")}
                    >
                      Mark as Completed
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-12 text-center">No tasks assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminTaskAssign;
