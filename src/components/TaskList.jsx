import { Pencil, Trash2, CalendarDays, Tag } from "lucide-react";
import { STATUS_LABELS, STATUS_ORDER, PRIORITY_LABELS } from "../constants";
import "./TaskList.css";
import "./TaskItem.css";

function formatDate(iso) {
  if (!iso) return "No due date";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <li className="task">
      <span className={`task__accent task__accent--${task.priority}`} aria-hidden="true" />
      <div className="task__main">
        <div className="task__title-row">
          <h3 className={`task__title${task.status === "completed" ? " task__title--done" : ""}`}>
            {task.title}
          </h3>
          <span className={`badge badge-${task.status}`}>
            <span className="badge-dot" aria-hidden="true" />
            {STATUS_LABELS[task.status]}
          </span>
          <span className={`badge badge-${task.priority}`}>{PRIORITY_LABELS[task.priority]}</span>
        </div>
        <div className="task__meta">
          <span className="task__meta-item task__category">
            <Tag size={12} aria-hidden="true" />
            {task.category}
          </span>
          <span className="task__meta-item">
            <CalendarDays size={12} aria-hidden="true" />
            {formatDate(task.dueDate)}
          </span>
        </div>
        {task.description && <p className="task__desc">{task.description}</p>}
      </div>

      <div className="task__actions">
        <label htmlFor={`status-${task.id}`} className="sr-only">
          Change status for {task.title}
        </label>
        <select
          id={`status-${task.id}`}
          className="task__status-select"
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          {STATUS_ORDER.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-ghost btn-icon"
          aria-label={`Edit ${task.title}`}
          onClick={() => onEdit(task)}
        >
          <Pencil size={16} />
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-icon"
          aria-label={`Delete ${task.title}`}
          onClick={() => onDelete(task)}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
}

function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <div className="task-list__empty-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3 8-8" />
            <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
          </svg>
        </div>
        <p className="task-list__empty-title">No tasks match your filters</p>
        <p className="task-list__empty-text">
          Try adjusting your search or filters, or create a new task to get started.
        </p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  );
}

export default TaskList;
