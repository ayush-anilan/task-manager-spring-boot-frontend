import axios from "axios";
import type { Task } from "../types/task";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";


const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = () => API.get<Task[]>("/tasks");

export const getTaskById = (id: number) => API.get<Task>(`/tasks/${id}`);

export const getTasksByStatus = (status: string) => API.get<Task[]>(`/tasks/status/${status}`);

export const getTasksByPriority = (priority: string) => API.get<Task[]>(`/tasks/priority/${priority}`);

export const createTask = (task: Task) => API.post("/tasks", task);

export const updateTask = (id: number, task: Task) => API.put(`/tasks/${id}`, task);

export const deleteTask = (id: number) => API.delete(`/tasks/${id}`);