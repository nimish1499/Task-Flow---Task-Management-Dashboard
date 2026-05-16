import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-24 text-center">
        <span className="text-5xl opacity-40">📋</span>
        <p className="text-textSec font-semibold text-lg">No tasks found.</p>
        <p className="text-textMut text-sm">Add a new task or change your filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
