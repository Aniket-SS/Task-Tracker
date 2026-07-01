import React from 'react';

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const isOverdue =
    task.dueDate && task.status !== 'completed' && new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0);

  return (
    <div className={`task-card priority-${task.priority} ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span className={`badge badge-${task.priority}`}>{task.priority}</span>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-meta">
        <select
          className={`status-select status-${task.status}`}
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {task.dueDate && (
          <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
            Due: {formatDate(task.dueDate)}
            {isOverdue && ' (Overdue)'}
          </span>
        )}
      </div>

      <div className="task-actions">
        <button className="btn btn-sm btn-outline" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
