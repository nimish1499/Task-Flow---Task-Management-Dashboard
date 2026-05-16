import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";

const AllTasksView = lazy(() => import("./views/AllTasksView"));
const CompletedTasksView = lazy(() => import("./views/CompletedTasksView"));

const App = () => (
  <BrowserRouter>
    <TaskProvider>
      <div className="min-h-screen bg-bg flex flex-col">
        <Navbar />
        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center text-textMut text-sm tracking-widest">
              Loading…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<AllTasksView />} />
            <Route path="/completed" element={<CompletedTasksView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </TaskProvider>
  </BrowserRouter>
);

export default App;
