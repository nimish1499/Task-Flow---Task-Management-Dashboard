import React, { createContext, useContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { generateId, STATUSES } from "../utils/taskUtils";

const SEED_TASKS = [
  {
    id: generateId(),
    title: "Design system architecture",
    description: "Plan component hierarchy and data flow for the new platform.",
    status: STATUSES.COMPLETED,
    dueDate: "2025-05-10",
  },
  {
    id: generateId(),
    title: "Implement auth module",
    description: "JWT-based login and session management.",
    status: STATUSES.IN_PROGRESS,
    dueDate: "2025-05-20",
  },
  {
    id: generateId(),
    title: "Write unit tests",
    description: "Cover all utility functions and critical UI paths.",
    status: STATUSES.PENDING,
    dueDate: "2025-05-28",
  },
];

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("taskflow_tasks", SEED_TASKS);

  const addTask = useCallback((data) => {
    setTasks((prev) => [{ ...data, id: generateId() }, ...prev]);
  }, [setTasks]);

  const updateTask = useCallback((id, data) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, [setTasks]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside <TaskProvider>");
  return ctx;
};
