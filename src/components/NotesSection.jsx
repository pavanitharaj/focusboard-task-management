import { useMemo } from "react";
import { Plus, StickyNote, Pencil, Trash2, Clock } from "lucide-react";
import "./NotesSection.css";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function NotesSection({ notes, onCreate, onEdit, onDelete }) {
  const sorted = useMemo(
    () => [...notes].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)),
    [notes]
  );

  return (
    <section className="notes-section" aria-label="Focus Notes">
      <div className="notes-section__header">
        <div className="notes-section__heading">
          <h2 className="notes-section__title">Focus Notes</h2>
          <p className="notes-section__subtitle">
            Capture reminders, ideas and quick notes.
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={onCreate}>
          <Plus size={16} aria-hidden="true" />
          Add note
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="notes-empty">
          <div className="notes-empty__icon" aria-hidden="true">
            <StickyNote size={26} />
          </div>
          <p className="notes-empty__title">No notes yet</p>
          <p className="notes-empty__text">
            Create your first focus note to keep reminders and ideas close at hand.
          </p>
        </div>
      ) : (
        <div className="notes-grid">
          {sorted.map((note) => (
            <article key={note.id} className="note-card">
              <span className="note-card__accent" aria-hidden="true" />
              <div className="note-card__header">
                <h3 className="note-card__title">{note.title}</h3>
                <div className="note-card__actions">
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon"
                    aria-label={`Edit ${note.title}`}
                    onClick={() => onEdit(note)}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon"
                    aria-label={`Delete ${note.title}`}
                    onClick={() => onDelete(note)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              {note.body && <p className="note-card__body">{note.body}</p>}
              <div className="note-card__footer">
                <Clock size={12} aria-hidden="true" />
                Updated {formatDate(note.updatedAt)}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default NotesSection;
