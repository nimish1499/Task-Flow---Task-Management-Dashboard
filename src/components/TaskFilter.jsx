import React from "react";
import { STATUS_LIST } from "../utils/taskUtils";

const FILTER_OPTIONS = ["All", ...STATUS_LIST];

const TaskFilter = ({ activeFilter, sortOrder, onFilterChange, onSortChange }) => (
  <div className="flex flex-wrap items-center justify-between gap-3">

    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option}
          aria-pressed={activeFilter === option}
          onClick={() => onFilterChange(option)}
          className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${activeFilter === option
              ? "bg-accent/10 border-accent text-accent"
              : "bg-surface border-border text-textSec hover:border-borderHov hover:text-textPri"
            }`}
        >
          {option}
        </button>
      ))}
    </div>

    {/* Sorting Based upon DueDate */}
    <button
      onClick={() => onSortChange(sortOrder === "asc" ? "desc" : "asc")}
      className="px-3 py-1 rounded text-sm font-medium bg-surface border border-border text-textSec hover:border-borderHov hover:text-textPri transition-all"
      aria-label={`Sort by due date ${sortOrder === "asc" ? "descending" : "ascending"}`}
    >
      Due Date {sortOrder === "asc" ? "↑" : "↓"}
    </button>
  </div>
);

export default TaskFilter;
