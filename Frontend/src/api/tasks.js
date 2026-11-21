import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
});

// Turn any axios error into a readable message for the UI
export const getErrorMessage = (err) =>
  err.response?.data?.message ||
  (err.code === "ECONNABORTED" ? "Request timed out. Please try again." : null) ||
  (err.request ? "Cannot reach the server. Check your connection." : "Something went wrong.");

export const fetchTasks = (params = {}) => api.get("/tasks", { params }).then((r) => r.data.data);
export const createTask = (task) => api.post("/tasks", task).then((r) => r.data.data);
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task).then((r) => r.data.data);
export const updateTaskStatus = (id, status) => api.patch(`/tasks/${id}/status`, { status }).then((r) => r.data.data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`).then((r) => r.data);
