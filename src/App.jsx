import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import FocusNotes from "./components/FocusNotes";
import NotesSection from "./components/NotesSection";
import NoteForm from "./components/NoteForm";
import Filters from "./components/Filters";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ConfirmDialog from "./components/ConfirmDialog";
import { initialTasks } from "./data/initialTasks";
import { STORAGE_KEY, NOTES_STORAGE_KEY, STATUS_ORDER } from "./constants";

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null) return initialTasks;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return initialTasks;
    return parsed;
  } catch {
    return initialTasks;
  }
}

function loadNotes() {
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (raw == null) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

const DEFAULT_FILTERS = { search: "", status: "all", priority: "all" };

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [noteIndex, setNoteIndex] = useState(0);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [confirmTask, setConfirmTask] = useState(null);

  const [notes, setNotes] = useState(loadNotes);
  const [noteFormOpen, setNoteFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [confirmNote, setConfirmNote] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* storage unavailable: ignore silently */
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch {
      /* storage unavailable: ignore silently */
    }
  }, [notes]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === "in_progress").length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const completionPct =
      total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, inProgress, completed, completionPct };
  }, [tasks]);

  const counts = useMemo(() => {
    const base = { all: tasks.length };
    STATUS_ORDER.forEach((s) => {
      base[s] = tasks.filter((t) => t.status === s).length;
    });
    return base;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return tasks.filter((t) => {
      if (q && !t.title.toLowerCase().includes(q)) return false;
      if (filters.status !== "all" && t.status !== filters.status) return false;
      if (filters.priority !== "all" && t.priority !== filters.priority) return false;
      return true;
    });
  }, [tasks, filters]);

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.status !== "all" ||
    filters.priority !== "all";

  const openCreate = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = (data) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...data } : t))
      );
    } else {
      const newTask = { id: `t-${Date.now()}`, ...data };
      setTasks((prev) => [newTask, ...prev]);
    }
    closeForm();
  };

  const handleStatusChange = (id, status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const requestDelete = (task) => setConfirmTask(task);

  const confirmDelete = () => {
    if (confirmTask) {
      setTasks((prev) => prev.filter((t) => t.id !== confirmTask.id));
    }
    setConfirmTask(null);
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const openCreateNote = () => {
    setEditingNote(null);
    setNoteFormOpen(true);
  };

  const openEditNote = (note) => {
    setEditingNote(note);
    setNoteFormOpen(true);
  };

  const closeNoteForm = () => {
    setNoteFormOpen(false);
    setEditingNote(null);
  };

  const handleNoteSubmit = (data) => {
    const now = Date.now();
    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNote.id ? { ...n, ...data, updatedAt: now } : n
        )
      );
    } else {
      const newNote = { id: `n-${now}`, ...data, createdAt: now, updatedAt: now };
      setNotes((prev) => [newNote, ...prev]);
    }
    closeNoteForm();
  };

  const requestDeleteNote = (note) => setConfirmNote(note);

  const confirmDeleteNote = () => {
    if (confirmNote) {
      setNotes((prev) => prev.filter((n) => n.id !== confirmNote.id));
    }
    setConfirmNote(null);
  };

  return (
    <div className="app">
      <Sidebar
        activeNav={activeNav}
        onNavChange={(id) => {
          setActiveNav(id);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app__main">
        <Header
          title="Dashboard"
          subtitle="Track your tasks and stay focused"
          search={filters.search}
          onSearchChange={(value) => setFilters((f) => ({ ...f, search: value }))}
          onCreateClick={openCreate}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="app__content">
          <StatsCards stats={stats} />

          <FocusNotes index={noteIndex} onIndexChange={setNoteIndex} />

          <NotesSection
            notes={notes}
            onCreate={openCreateNote}
            onEdit={openEditNote}
            onDelete={requestDeleteNote}
          />

          <section aria-label="Tasks" style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            <Filters
              statusFilter={filters.status}
              onStatusChange={(value) => setFilters((f) => ({ ...f, status: value }))}
              priorityFilter={filters.priority}
              onPriorityChange={(value) => setFilters((f) => ({ ...f, priority: value }))}
              counts={counts}
              hasActiveFilters={hasActiveFilters}
              onReset={resetFilters}
            />

            <TaskList
              tasks={filteredTasks}
              onEdit={openEdit}
              onDelete={requestDelete}
              onStatusChange={handleStatusChange}
            />
          </section>
        </main>
      </div>

      <TaskForm
        open={formOpen}
        initial={editingTask}
        onSubmit={handleSubmit}
        onCancel={closeForm}
      />

      <ConfirmDialog
        open={confirmTask !== null}
        title="Delete this task?"
        message={
          confirmTask
            ? <>This will permanently remove <strong>{confirmTask.title}</strong>. This action cannot be undone.</>
            : ""
        }
        confirmLabel="Delete task"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmTask(null)}
      />

      <NoteForm
        open={noteFormOpen}
        initial={editingNote}
        onSubmit={handleNoteSubmit}
        onCancel={closeNoteForm}
      />

      <ConfirmDialog
        open={confirmNote !== null}
        title="Delete this note?"
        message={
          confirmNote
            ? <>This will permanently remove <strong>{confirmNote.title}</strong>. This action cannot be undone.</>
            : ""
        }
        confirmLabel="Delete note"
        onConfirm={confirmDeleteNote}
        onCancel={() => setConfirmNote(null)}
      />
    </div>
  );
}

export default App;
