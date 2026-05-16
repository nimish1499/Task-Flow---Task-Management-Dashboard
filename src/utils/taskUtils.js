export const generateId = () =>
  `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const STATUSES = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

export const STATUS_LIST = Object.values(STATUSES);

export const filterByStatus = (tasks, status) =>
  !status || status === "All"
    ? tasks
    : tasks.filter((t) => t.status === status);

export const sortByDueDate = (tasks, order = "asc") =>
  [...tasks].sort((a, b) => {
    const diff = new Date(a.dueDate) - new Date(b.dueDate);
    return order === "asc" ? diff : -diff;
  });

export const getStatusCounts = (tasks) =>
  STATUS_LIST.reduce((acc, s) => {
    acc[s] = tasks.filter((t) => t.status === s).length;
    return acc;
  }, {});

export const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const isOverdue = (dueDate, status) => {
  if (!dueDate || status === STATUSES.COMPLETED) return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
};
