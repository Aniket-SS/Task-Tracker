import React, { useState, useEffect, useCallback } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Toast from './components/Toast';
import { getTasks, createTask, updateTask, updateTaskStatus, deleteTask } from './api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: '',
    sortBy: 'createdAt',
    order: 'desc',
  });

  const showToast = (message, type = 'success') => setToast({ message, type });

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTasks(filters);
      setTasks(res.data.data);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchTasks]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingTask) {
        const res = await updateTask(editingTask._id, formData);
        setTasks((prev) => prev.map((t) => (t._id === editingTask._id ? res.data.data : t)));
        showToast('Task updated successfully');
        setEditingTask(null);
      } else {
        const res = await createTask(formData);
        setTasks((prev) => [res.data.data, ...prev]);
        showToast('Task created successfully');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Something went wrong', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task? This cannot be undone.')) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      showToast('Task deleted');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete task', 'error');
    }
  };

  const handleStatusChange = async (id, status) => {
    const prevTasks = tasks;
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status } : t)));
    try {
      await updateTaskStatus(id, status);
    } catch (err) {
      setTasks(prevTasks);
      showToast('Failed to update status', 'error');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <div className="stats-bar">
          <span>Total: {stats.total}</span>
          <span>Pending: {stats.pending}</span>
          <span>In Progress: {stats.inProgress}</span>
          <span>Completed: {stats.completed}</span>
        </div>
      </header>

      <main className="app-main">
        <TaskForm
          onSubmit={handleCreateOrUpdate}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </main>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
}

export default App;
