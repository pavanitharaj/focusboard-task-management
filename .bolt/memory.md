# Project memory

## Product intent & audience

- FocusBoard is a task management dashboard built as a coding assessment deliverable.
- Audience: evaluators checking functionality, code quality, Figma fidelity, responsive behavior, and accessibility.
- Core features: task CRUD, live statistics, combined filtering, notes carousel, localStorage persistence.

## Brand personality & voice

- Utility-focused productivity tool; clarity and efficiency over personality.
- Documentation tone is straightforward and professional (README.md, AI_USAGE.md).

## Visual design & UX direction

- Matches a Figma reference (not available in env; visual fidelity needs manual browser verification).
- Responsive breakpoints: 1440px (desktop), 768px (tablet), 390px (mobile); no horizontal overflow.
- Sidebar navigation with active states; collapsible drawer on mobile.
- Header: dashboard title, live search, notifications, New Task button.
- Stats cards: Total, In Progress, Completed, Completion rate with a progress bar; all live-calculated from tasks.
- FocusNotes carousel: exactly 3 slides, prev/next buttons, clickable indicators, arrow-key support.
- Task list rows: title, description, category, status, priority, due date; inline status change, edit, delete.
- Create/Edit modal: title validation, all task fields, Cancel/Create actions; delete confirmation dialog.
- Combined filters: status tabs + priority dropdown + search (non-resetting); Reset filters button.
- Accessibility: semantic HTML, labelled inputs, ARIA on modal/carousel/tabs, visible focus indicators, keyboard support.

## Decisions, constraints & rationale

- JavaScript (not TypeScript) per brief; PropTypes boilerplate not required.
- `react/prop-types` ESLint rule disabled to keep lint clean; build and lint both pass with zero errors.
- Styles centralized in `src/index.css` (design system); `App.css` emptied; component-level CSS where appropriate.
- localStorage saves on every change, restores on refresh; sample data seeds only on first visit.
- Eight reusable components in `src/components/`: Sidebar, Header, StatsCards, FocusNotes, Filters, TaskList, TaskItem, TaskForm, ConfirmDialog.
- Sample data in `src/data/`; shared constants in `src/constants.js`; all state/filtering/stats/persistence wired in `src/App.jsx`.

## Open questions & assumptions

- Figma reference file not accessible in this environment; visual fidelity assumed from inferred specs and needs manual verification.
- No browser preview available; carousel clicks, responsive layouts, and persistence across refresh need manual testing.
- Priority levels and category enumerations inferred from sample data; exact values should be confirmed against Figma if available.