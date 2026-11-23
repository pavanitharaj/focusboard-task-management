import { LayoutDashboard, ListTodo, CalendarDays, BarChart3, Settings, Layers } from "lucide-react";
import "./Sidebar.css";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tasks", label: "Tasks", icon: ListTodo },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "settings", label: "Settings", icon: Settings },
];

function Sidebar({ activeNav, onNavChange, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          className="sidebar-scrim"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}
      <aside
        className={`sidebar${isOpen ? " sidebar--open" : ""}`}
        aria-label="Primary navigation"
      >
        <div className="sidebar__brand">
          <span className="sidebar__logo" aria-hidden="true">
            <Layers size={20} />
          </span>
          <span className="sidebar__name">FocusBoard</span>
        </div>

        <nav>
          <p className="sidebar__section-label">Menu</p>
          <ul className="sidebar__nav">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`sidebar__link${isActive ? " sidebar__link--active" : ""}`}
                    onClick={() => onNavChange(item.id)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon size={18} aria-hidden="true" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar__footer">
          <span className="sidebar__avatar" aria-hidden="true">AK</span>
          <span>
            <span className="sidebar__user-name" style={{ display: "block" }}>Alex Kim</span>
            <span className="sidebar__user-role">Trainee Engineer</span>
          </span>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
