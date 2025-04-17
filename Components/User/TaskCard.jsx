import React from "react";

const TaskCard = ({ task }) => {
  // Format the deadline
  const formattedDeadline = new Date(task.deadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card shadow-lg border-0 rounded-3">
      <div className="card-body">
        {/* Title with improved text styling */}
        <h5 className="card-title text-primary mb-2">{task.title}</h5>

        {/* Description with some padding and typography improvements */}
        <p className="card-text text-muted mb-3">{task.description}</p>

        {/* Flexbox for layout of the deadline, priority, and status */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Deadline */}
          <p className="card-text text-secondary">
            <strong>Deadline:</strong> {formattedDeadline}
          </p>

          {/* Priority */}
          <p className="card-text">
            <strong>Priority:</strong> <span className={`badge ${task.priority === "High" ? "bg-danger" : "bg-info"}`}>{task.priority}</span>
          </p>
        </div>

        {/* Status with color coding and badges */}
        <span 
          className={`badge ${task.status === "Completed" ? "bg-success" : "bg-warning"} fs-6`} 
          style={{ padding: "0.5rem 1rem" }}
        >
          {task.status}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
