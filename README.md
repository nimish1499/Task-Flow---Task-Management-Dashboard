# TaskFlow — Task Management Dashboard

A clean, responsive Task Management Dashboard built as a frontend assignment. Manage tasks with full CRUD, filter and sort them, and navigate between views which are persisted to localStorage.

🔗 **Live Demo:** https://task-flow-dash-board.netlify.app/

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI library |
| React Router DOM v6 | Client-side routing |
| Tailwind CSS | Utility-first styling |
| Context API | Global state management |
| localStorage | Task persistence |
| Vite | Build tool and dev server |

---

## Features

- **Summary Bar** — live count of tasks per status at the top of the dashboard
- **Add Tasks** — modal form with validation (title and due date required)
- **Edit Tasks** — pre-filled modal, works from any view
- **Delete Tasks** — confirmation prompt before removal
- **Filter by Status** — All, Pending, In Progress, Completed
- **Sort by Due Date** — toggle ascending / descending
- **Overdue Indicators** — cards highlight tasks past their due date
- **Client-side Routing** — `/` for All Tasks, `/completed` for Completed Tasks
- **Persistent State** — tasks survive page refresh via localStorage
- **Fully Responsive** — mobile, tablet, and desktop layouts

---

## Getting Started

### Installation

```bash
# Clone the repository

git clone <repo_url>

# Enter the project folder
cd [Project Name]

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
Task-Flow---Task-Management-Dashboard/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
└── src/
    ├── index.jsx                  # Entry point
    ├── index.css                  # Tailwind directives + base reset
    ├── App.jsx                    # Root component — router, lazy views, Suspense
    │
    ├── context/
    │   └── TaskContext.jsx        # Global state via Context API
    │
    ├── hooks/
    │   └── useLocalStorage.js     # Custom hook — persists state to localStorage
    │
    ├── utils/
    │   └── taskUtils.js           # Pure helpers: filter, sort, format, validate
    │
    ├── components/
    │   ├── Navbar.jsx             # Sticky top bar with NavLink routing
    │   ├── SummaryBar.jsx         # Three status count cards
    │   ├── TaskFilter.jsx         # Filter pills + sort toggle
    │   ├── TaskCard.jsx           # Single task card (React.memo)
    │   ├── TaskList.jsx           # Responsive grid + empty state
    │   └── TaskForm.jsx           # Add / edit modal with validation
    │
    └── views/
        ├── AllTasksView.jsx       # Route: /
        └── CompletedTasksView.jsx # Route: /completed
```

---

## Component Architecture

```
App
├── Navbar
└── (Suspense)
    ├── AllTasksView
    │   ├── SummaryBar
    │   ├── TaskFilter
    │   ├── TaskList → TaskCard[]
    │   └── TaskForm (modal)
    └── CompletedTasksView
        ├── TaskList → TaskCard[]
        └── TaskForm (modal)
```

---

## State Management

Global task state lives in `TaskContext` and exposes four values:

```
tasks       — array of all task objects
addTask     — adds a new task
updateTask  — updates an existing task by id
deleteTask  — removes a task by id
```

---

## Key Technical Decisions

**Lazy Loading**
Both views are loaded with `React.lazy()` wrapped in `<Suspense>`. Vite automatically splits them into separate JS chunks, keeping the initial bundle small.

---

## Form Validation

| Field | Rule |
|---|---|
| Title | Required · Max 100 characters |
| Due Date | Required |
| Description | Optional |
| Status | Optional · Defaults to `Pending` |

Errors appear inline below the relevant field and clear as soon as the user corrects the input.

---
