import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `px-4 py-1.5 rounded text-sm font-medium transition-colors ${isActive
      ? "bg-accent/10 text-accent"
      : "text-textSec hover:text-textPri hover:bg-surface2"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border flex items-center gap-4 px-6 py-3 md:px-8">

      <div className="flex items-center gap-2 font-bold text-lg tracking-tight mr-auto">
        <NavLink to="/" end >
          <span className="text-textPri">TaskFlow</span></NavLink>

      </div>

      <div className="flex gap-1">
        <NavLink to="/" end className={navLinkClass}>
          All Tasks
        </NavLink>
        <NavLink to="/completed" className={navLinkClass}>
          Completed
        </NavLink>
      </div>

      <button
        onClick={() => navigate("/?add=1")}
        className="hidden md:inline-flex items-center gap-1 bg-accent hover:bg-accentHov text-white text-sm font-semibold px-4 py-2 rounded transition-all hover:-translate-y-px active:translate-y-0"
      >
        + Add Task
      </button>
    </nav>
  );
};

export default Navbar;
