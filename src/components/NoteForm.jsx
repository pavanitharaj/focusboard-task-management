import { useEffect, useRef, useState } from "react";
import { X, AlertCircle } from "lucide-react";
import "./TaskForm.css";

const EMPTY_FORM = { title: "", body: "" };

function NoteForm({ open, initial, onSubmit, onCancel }) {
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
      setError("Please enter a note title.");
      titleRef.current?.focus();
      return;
    }
    onSubmit({
      title: form.title.trim(),
      body: form.body.trim(),
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
        aria-labelledby="note-form-title"
      >
        <div className="modal__header">
          <h2 id="note-form-title" className="modal__title">
            {initial ? "Edit note" : "Create a note"}
          </h2>
          <button
            type="button"
            className="modal__close"
            aria-label="Close form"
            onClick={onCancel}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal__body">
            <div className={`form-field${error ? " form-field--error" : ""}`}>
              <label htmlFor="note-title" className="form-field__label">
                Note title<span className="req" aria-hidden="true">*</span>
              </label>
              <input
                id="note-title"
                ref={titleRef}
                type="text"
                className="form-field__input"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Reminder for the design review"
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? "note-title-error" : undefined}
              />
              {error && (
                <p id="note-title-error" className="form-field__error" role="alert">
                  <AlertCircle size={13} aria-hidden="true" />
                  {error}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="note-body" className="form-field__label">
                Note content
              </label>
              <textarea
                id="note-body"
                className="form-field__textarea"
                value={form.body}
                onChange={(e) => update("body", e.target.value)}
                placeholder="Write your focus note here..."
                rows={5}
              />
            </div>
          </div>

          <div className="modal__footer">
            <button type="button" className="btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initial ? "Save changes" : "Create note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;
