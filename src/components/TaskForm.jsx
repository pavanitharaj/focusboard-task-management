import { useEffect, useRef, useState } from "react";
import { X, AlertCircle } from "lucide-react";
import {
  STATUS_ORDER,
  STATUS_LABELS,
  PRIORITY_ORDER,
  PRIORITY_LABELS,
  CATEGORY_OPTIONS,
  CATEGORY_LABELS,
} from "../constants";
import "./TaskForm.css";

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "development",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

function TaskForm({ open, initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...EMPTY_FORM, ...initial } : EMPTY_FORM);
      setError("");
      const t = setTimeout(() => titleRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open, initial]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "title" && error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Please enter a task title.");
      titleRef.current?.focus();
      return;
    }
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        <div className="modal__header">
          <h2 id="task-form-title" className="modal__title">
            {initial ? "Edit task" : "Create a new task"}
          </h2>
          <button type="button" className="modal__close" aria-label="Close form" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal__body">
            <div className={`form-field${error ? " form-field--error" : ""}`}>
              <label htmlFor="task-title" className="form-field__label">
                Task title<span className="req" aria-hidden="true">*</span>
              </label>
              <input
                id="task-title"
                ref={titleRef}
                type="text"
                className="form-field__input"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Design new landing page hero"
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? "title-error" : undefined}
              />
              {error && (
                <p id="title-error" className="form-field__error" role="alert">
                  <AlertCircle size={13} aria-hidden="true" />
                  {error}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="task-desc" className="form-field__label">
                Description
              </label>
              <textarea
                id="task-desc"
                className="form-field__textarea"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Add details about this task..."
              />
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="task-category" className="form-field__label">
                  Category
                </label>
                <select
                  id="task-category"
                  className="form-field__select"
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="task-priority" className="form-field__label">
                  Priority
                </label>
                <select
                  id="task-priority"
                  className="form-field__select"
                  value={form.priority}
                  onChange={(e) => update("priority", e.target.value)}
                >
                  {PRIORITY_ORDER.map((p) => (
                    <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="task-status" className="form-field__label">
                  Status
                </label>
                <select
                  id="task-status"
                  className="form-field__select"
                  value={form.status}
                  onChange={(e) => update("status", e.target.value)}
                >
                  {STATUS_ORDER.map((s) => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="task-due" className="form-field__label">
                  Due date
                </label>
                <input
                  id="task-due"
                  type="date"
                  className="form-field__input"
                  value={form.dueDate}
                  onChange={(e) => update("dueDate", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal__footer">
            <button type="button" className="btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initial ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
