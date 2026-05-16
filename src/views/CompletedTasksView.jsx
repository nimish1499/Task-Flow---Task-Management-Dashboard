import React, { useState, useMemo, useCallback } from "react";
import { useTasks } from "../context/TaskContext";
import { sortByDueDate, STATUSES } from "../utils/taskUtils";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const CompletedTasksView = () => {
  const { tasks, updateTask, deleteTask } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const completedTasks = useMemo(
    () => sortByDueDate(tasks.filter((t) => t.status === STATUSES.COMPLETED), "asc"),
    [tasks]
  );

  const handleOpenEdit = useCallback((task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsFormOpen(false);
    setTaskToEdit(null);
  }, []);

  const handleSubmit = useCallback((data) => {
    updateTask(taskToEdit.id, data);
    setIsFormOpen(false);
    setTaskToEdit(null);
  }, [taskToEdit, updateTask]);

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-textPri">✅ Completed Tasks</h2>
        <span className="text-xs text-textSec bg-surface2 border border-border px-3 py-1 rounded-full">
          {completedTasks.length} task{completedTasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      <TaskList tasks={completedTasks} onEdit={handleOpenEdit} onDelete={deleteTask} />

      <TaskForm
        isOpen={isFormOpen}
        taskToEdit={taskToEdit}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </main>
  );
};

export default CompletedTasksView;