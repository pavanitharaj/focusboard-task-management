import { Search, Plus, Bell, Menu } from "lucide-react";
import "./Header.css";

function Header({
  title,
  subtitle,
  search,
  onSearchChange,
  onCreateClick,
  onMenuClick,
}) {
  return (
    <header className="header">
      <div className="header__titles">
        <h1 className="header__title">{title}</h1>
        {subtitle && <p className="header__subtitle">{subtitle}</p>}
      </div>

      <div className="header__actions">
        <button
          type="button"
          className="btn btn-ghost btn-icon header__menu-btn"
          aria-label="Open navigation"
          onClick={onMenuClick}
        >
          <Menu size={18} />
        </button>

        <label className="header__search">
          <Search size={16} className="search-icon" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search tasks by title"
          />
        </label>

        <button
          type="button"
          className="btn btn-ghost btn-icon"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        <button type="button" className="btn btn-primary" onClick={onCreateClick}>
          <Plus size={16} aria-hidden="true" />
          New Task
        </button>
      </div>
    </header>
  );
}

export default Header;
