import { useCallback, useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskItem from "./components/TaskItem.jsx";
import {
  fetchTasks, createTask, updateTask, updateTaskStatus, deleteTask, getErrorMessage,
} from "./api/tasks.js";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Debounce search so we don't hit the API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setTasks(await fetchTasks({ search: search || undefined, status: statusFilter || undefined }));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  // Returns true on success so the form knows whether to reset
  const handleSubmit = async (data) => {
    setSaving(true);
    setError("");
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask._id, data);
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
        setEditingTask(null);
      } else {
        const created = await createTask(data);
        setTasks((prev) => [created, ...prev]);
      }
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    setError("");
    try {
      const updated = await updateTaskStatus(id, status);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    setError("");
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      if (editingTask?._id === id) setEditingTask(null);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <main className="container">
      <h1>To-Do List</h1>

      <TaskForm editingTask={editingTask} onSubmit={handleSubmit} onCancel={() => setEditingTask(null)} saving={saving} />

      <div className="row filters">
        <input
          placeholder="Search tasks..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {error && (
        <div className="error" role="alert">
          <span>{error}</span>
          <button className="ghost" onClick={loadTasks}>Retry</button>
        </div>
      )}

      {loading ? (
        <p className="muted">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="muted">No tasks found.</p>
      ) : (
        <ul className="list">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onStatusChange={handleStatusChange}
              onEdit={setEditingTask}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
