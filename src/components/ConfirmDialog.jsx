import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import "./TaskForm.css";

function ConfirmDialog({ open, title, message, confirmLabel, onConfirm, onCancel }) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => confirmRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        className="modal"
        style={{ maxWidth: 420 }}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
      >
        <div className="modal__header">
          <h2 id="confirm-title" className="modal__title">
            {title}
          </h2>
        </div>
        <div className="modal__body">
          <p id="confirm-desc" className="confirm-text">
            <AlertTriangle
              size={18}
              style={{ color: "var(--warning-500)", verticalAlign: "-3px", marginRight: 6 }}
              aria-hidden="true"
            />
            {message}
          </p>
        </div>
        <div className="modal__footer">
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            ref={confirmRef}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
