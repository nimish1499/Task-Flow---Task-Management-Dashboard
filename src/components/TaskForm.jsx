import React, { useState, useEffect, useCallback } from "react";
import { STATUS_LIST, STATUSES } from "../utils/taskUtils";

const EMPTY_FORM = { title: "", description: "", status: STATUSES.PENDING, dueDate: "" };

const validate = (f) => {
  const e = {};
  if (!f.title.trim()) {
    e.title = "Title is required.";
  }
  if (f.title.trim().length > 100) { e.title = "Title must be under 100 characters."; }
  if (!f.dueDate) { e.dueDate = "Due date is required."; }
  return e;
};

const TaskForm = ({ isOpen, taskToEdit, onSubmit, onClose }) => {
  const [fields, setFields] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFields(
      taskToEdit
        ? { title: taskToEdit.title, description: taskToEdit.description || "", status: taskToEdit.status, dueDate: taskToEdit.dueDate }
        : EMPTY_FORM
    );
    setErrors({});
  }, [taskToEdit, isOpen]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit({ ...fields, title: fields.title.trim() });
  };

  if (!isOpen) return null;

  const inputBase =
    "w-full bg-surface2 border rounded px-3 py-2 text-sm text-textPri placeholder-textMut outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl animate-slideUp">

        <header className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-bold text-lg text-textPri">
            {taskToEdit ? "Edit Task" : "New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-textMut hover:text-textPri hover:bg-surface2 rounded px-2 py-1 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 p-6">

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-textSec">
              Title <span className="text-danger">*</span>
            </label>
            <input
              name="title" type="text" maxLength={100}
              value={fields.title} onChange={handleChange}
              placeholder="Enter task title"
              className={`${inputBase} ${errors.title ? "border-danger" : "border-border"}`}
            />
            {errors.title && <span className="text-xs text-danger">{errors.title}</span>}
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-textSec">Description</label>
            <textarea
              name="description" rows={3}
              value={fields.description} onChange={handleChange}
              placeholder="Optional description"
              className={`${inputBase} border-border resize-none`}
            />
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-textSec">Status</label>
            <select
              name="status"
              value={fields.status} onChange={handleChange}
              className={`${inputBase} border-border cursor-pointer`}
            >
              {STATUS_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-textSec">
              Due Date <span className="text-danger">*</span>
            </label>
            <input
              name="dueDate" type="date"
              value={fields.dueDate} onChange={handleChange}
              className={`${inputBase} ${errors.dueDate ? "border-danger" : "border-border"}`}
            />
            {errors.dueDate && <span className="text-xs text-danger">{errors.dueDate}</span>}
          </div>


          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button" onClick={onClose}
              className="px-4 py-2 text-sm font-semibold rounded bg-surface2 text-textSec border border-border hover:border-borderHov hover:text-textPri transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold rounded bg-accent hover:bg-accentHov text-white transition-all hover:-translate-y-px active:translate-y-0"
            >
              {taskToEdit ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
