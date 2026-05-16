import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { filterByStatus, sortByDueDate } from "../utils/taskUtils";
import SummaryBar from "../components/SummaryBar";
import TaskFilter from "../components/TaskFilter";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";


const AllTasksView = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);


  useEffect(() => {
    if (searchParams.get("add") === "1") {
      setTaskToEdit(null);
      setIsFormOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const displayedTasks = useMemo(
    () => sortByDueDate(filterByStatus(tasks, activeFilter), sortOrder),
    [tasks, activeFilter, sortOrder]
  );

  const handleOpenAdd = useCallback(() => { setTaskToEdit(null); setIsFormOpen(true); }, []);
  const handleOpenEdit = useCallback((task) => { setTaskToEdit(task); setIsFormOpen(true); }, []);
  const handleClose = useCallback(() => { setIsFormOpen(false); setTaskToEdit(null); }, []);

  const handleSubmit = useCallback((data) => {
    taskToEdit ? updateTask(taskToEdit.id, data) : addTask(data);
    setIsFormOpen(false);
    setTaskToEdit(null);
  }, [taskToEdit, addTask, updateTask]);

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
      <SummaryBar />


      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-textPri">All Tasks</h2>
        {/* Showing Add Button for Mobile View */}
        <button
          onClick={handleOpenAdd}
          className="md:hidden inline-flex items-center gap-1 bg-accent hover:bg-accentHov text-white text-sm font-semibold px-4 py-2 rounded transition-all"
        >
          + Add Task
        </button>
      </div>

      <TaskFilter
        activeFilter={activeFilter}
        sortOrder={sortOrder}
        onFilterChange={setActiveFilter}
        onSortChange={setSortOrder}
      />

      <TaskList tasks={displayedTasks} onEdit={handleOpenEdit} onDelete={deleteTask} />

      <TaskForm isOpen={isFormOpen} taskToEdit={taskToEdit} onSubmit={handleSubmit} onClose={handleClose} />
    </main>
  );
};

export default AllTasksView;
