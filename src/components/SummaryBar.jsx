import React, { useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import { getStatusCounts, STATUSES } from "../utils/taskUtils";

const STATUS_META = [
  {
    key: STATUSES.PENDING,
    label: "Pending",
    icon: "⏳",
    border: "border-pending",
    countColor: "text-pending",
  },
  {
    key: STATUSES.IN_PROGRESS,
    label: "In Progress",
    icon: "🔄",
    border: "border-inprog",
    countColor: "text-inprog",
  },
  {
    key: STATUSES.COMPLETED,
    label: "Completed",
    icon: "✅",
    border: "border-done",
    countColor: "text-done",
  },
];

const SummaryBar = () => {
  const { tasks } = useTasks();
  const counts = useMemo(() => getStatusCounts(tasks), [tasks]);

  return (
    <section className="grid grid-cols-3 gap-3 md:gap-4" aria-label="Task summary">
      {STATUS_META.map(({ key, label, icon, border, countColor }) => (
        <div
          key={key}
          className={`flex flex-col items-center gap-1 py-4 px-2 bg-surface rounded-xl border ${border} hover:-translate-y-0.5 transition-transform`}
        >
          <span className="text-2xl">{icon}</span>
          <span className={`text-3xl font-extrabold leading-none tracking-tighter ${countColor}`}>
            {counts[key]}
          </span>
          <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-textSec">
            {label}
          </span>
        </div>
      ))}
    </section>
  );
};

export default SummaryBar;
