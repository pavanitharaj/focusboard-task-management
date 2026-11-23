import { STATUS_LABELS, STATUS_ORDER, PRIORITY_LABELS, PRIORITY_ORDER } from "../constants";
import "./Filters.css";

function Filters({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  counts,
  hasActiveFilters,
  onReset,
}) {
  const tabs = [{ id: "all", label: "All" }, ...STATUS_ORDER.map((s) => ({ id: s, label: STATUS_LABELS[s] }))];

  return (
    <div className="filters">
      <div className="filters__tabs" role="tablist" aria-label="Filter tasks by status">
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          const count = counts[tab.id] ?? 0;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`filters__tab${isActive ? " filters__tab--active" : ""}`}
              onClick={() => onStatusChange(tab.id)}
            >
              {tab.label}
              <span className="filters__tab-count" aria-hidden="true">{count}</span>
              <span className="sr-only">{count} tasks</span>
            </button>
          );
        })}
      </div>

      <div className="filters__right">
        <label htmlFor="priority-filter" className="sr-only">
          Filter by priority
        </label>
        <select
          id="priority-filter"
          className="filters__select"
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
        >
          <option value="all">All priorities</option>
          {PRIORITY_ORDER.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABELS[p]} priority
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn btn-ghost"
          onClick={onReset}
          disabled={!hasActiveFilters}
          aria-disabled={!hasActiveFilters}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}

export default Filters;
