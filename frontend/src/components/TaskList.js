import React from 'react';
import TaskItem from './TaskItem';

function TaskList({
  tasks,
  loading,
  onEdit,
  onDelete,
  onStatusChange,
  filters,
  onFilterChange,
}) {
  return (
    <div className="task-list-section">
      <div className="filters-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="search-input"
        />

        <select value={filters.status} onChange={(e) => onFilterChange('status', e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select value={filters.priority} onChange={(e) => onFilterChange('priority', e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={`${filters.sortBy}-${filters.order}`}
          onChange={(e) => {
            const [sortBy, order] = e.target.value.split('-');
            onFilterChange('sortBy', sortBy);
            onFilterChange('order', order);
          }}
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="dueDate-asc">Due Date (Soonest)</option>
          <option value="dueDate-desc">Due Date (Latest)</option>
          <option value="priority-desc">Priority</option>
          <option value="title-asc">Title (A-Z)</option>
        </select>
      </div>

      {loading ? (
        <p className="status-message">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="status-message">No tasks found. Add one above!</p>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
