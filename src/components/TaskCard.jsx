import React, { memo } from "react";
import { formatDate, isOverdue, STATUSES } from "../utils/taskUtils";

const BADGE = {
  [STATUSES.PENDING]: "bg-pending/10 text-pending",
  [STATUSES.IN_PROGRESS]: "bg-inprog/10 text-inprog",
  [STATUSES.COMPLETED]: "bg-done/10 text-done",
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const overdue = isOverdue(task.dueDate, task.status);

  const handleDelete = () => {
    if (window.confirm(`Delete "${task.title}"?`)) onDelete(task.id);
  };

  return (
    <article
      className={`flex flex-col gap-3 p-5 bg-surface rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 ${overdue ? "border-overdue/40" : "border-border hover:border-borderHov"
        }`}
    >
      <header className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-textPri leading-snug flex-1">{task?.title}</h3>
        <span className={`shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full ${BADGE[task?.status]}`}>
          {task?.status}
        </span>
      </header>

      {task?.description && (
        <p className="text-sm text-textSec leading-relaxed line-clamp-3">
          {task.description}
        </p>
      )}

      <footer className="flex items-center justify-between gap-2 flex-wrap mt-auto">
        <span className={`text-xs font-mono ${overdue ? "text-overdue" : "text-textMut"}`}>
          {overdue && "⚠ "}Due: {formatDate(task?.dueDate)}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            className="text-xs font-semibold px-3 py-1 rounded bg-surface2 text-textSec border border-border hover:border-borderHov hover:text-textPri transition-all"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            aria-label={`Delete ${task.title}`}
            className="text-xs font-semibold px-3 py-1 rounded bg-danger/10 text-danger border border-transparent hover:bg-danger hover:text-white transition-all"
          >
            Delete
          </button>
        </div>
      </footer>
    </article>
  );
};

export default memo(TaskCard);
