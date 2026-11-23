# FocusBoard

A polished, responsive task management dashboard built as a frontend trainee assessment project. FocusBoard helps you track tasks across statuses and priorities, review key statistics, and stay focused with curated productivity notes.

## Project overview

FocusBoard is a single-page productivity dashboard where users can create, edit, delete and update tasks, filter and search them, and review live statistics computed from the actual task data. It ships with sample tasks, persists everything to the browser, and is designed to look and feel like a professional SaaS dashboard.

## Features

- **Dashboard overview** with dynamically calculated statistics: total tasks, in-progress tasks, completed tasks, and completion percentage.
- **Focus Notes carousel** with three slides, previous/next navigation, clickable indicators, and synchronized active state.
- **Task management**: create, edit and delete tasks. Deletion requires confirmation to prevent accidental data loss.
- **Task fields**: title, description, category, status, priority and due date.
- **Status management**: change a task between To do, In progress and Completed directly from the task row.
- **Search**: case-insensitive search by task title that updates as you type.
- **Filters**: status tabs (All / To do / In progress / Completed) and a priority filter. Search, status and priority combine together and never reset one another. A "Reset filters" control clears all active filters.
- **Empty states** and inline form validation (title is required).
- **localStorage persistence**: tasks survive page refresh. Sample data is only seeded when no saved data exists.
- **Responsive design** tuned for 1440px (desktop), 768px (tablet) and 390px (mobile), including a collapsible mobile navigation drawer.
- **Accessibility**: semantic HTML, labelled inputs, ARIA attributes for the modal, carousel and tabs, visible focus indicators, keyboard support for the modal and carousel, and a logical heading hierarchy.

## Technology stack

- React 18 with Vite
- JavaScript (JSX), functional components and Hooks (`useState`, `useEffect`, `useMemo`)
- Plain CSS (one global design-system stylesheet plus per-component CSS files)
- Lucide React for icons
- Browser `localStorage` for persistence
- No backend, authentication, cloud database or external task API

## Installation

```bash
npm install
```

## How to run locally

```bash
npm run dev
```

This starts the Vite dev server. Open the printed local URL in your browser.

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## State management

All application state lives in the top-level `App` component and is managed with React hooks:

- `tasks` holds the full task array and is the single source of truth.
- `filters` holds the search term, status tab and priority filter in one object so that changing one filter never resets the others.
- `useMemo` derives statistics (total, in-progress, completed, completion percentage), per-status counts for the tabs, and the filtered task list directly from `tasks` and `filters`. This guarantees statistics are always consistent with the data and update automatically after any create, edit, delete or status change.
- State updates are immutable: new tasks are prepended, edits use `map`, deletions use `filter`, and status changes use `map` with a spread of the updated field.

## localStorage

- Tasks are saved under the storage key `focusboard.tasks.v1` inside `src/constants.js`.
- On every `tasks` change, a `useEffect` serializes the array to `localStorage`.
- On startup, the loader reads saved data. If no data exists (first visit), it seeds the sample tasks from `src/data/initialTasks.js`. If data already exists, the saved tasks are restored and are never overwritten by sample data.
- The loader safely handles invalid or unavailable `localStorage` (for example, disabled storage or corrupted JSON) by falling back to sample data without throwing.

## Deployment

This project is a static Vite build and can be deployed on Vercel or Netlify.

- Build command: `npm run build`
- Output directory: `dist`

Deployment URL: _<to be added after deployment>_

## Known limitations

- Data is stored per-browser in `localStorage`; it does not sync across devices or browsers.
- There is no backend, authentication or collaboration support (by design, per the assessment brief).
- The Focus Notes content is static curated text rather than user-editable notes.
- No automated rotation for the carousel (manual navigation only, as specified).

## Project structure

```
src/
  components/
    Sidebar.jsx        Sidebar navigation + responsive drawer
    Header.jsx         Title, search and action buttons
    StatsCards.jsx     Overview statistics cards
    FocusNotes.jsx     Three-slide Focus Notes carousel
    Filters.jsx        Status tabs + priority filter + reset
    TaskList.jsx       Task list + empty state
    TaskItem.jsx       Single task row with status/edit/delete
    TaskForm.jsx       Create/edit modal with validation
    ConfirmDialog.jsx  Delete confirmation modal
  data/
    initialTasks.js    Eight sample tasks
    focusNotes.js      Three carousel slides
  constants.js         Statuses, priorities, categories, storage key
  App.jsx              State, filters, stats, persistence, layout
  main.jsx             React entry point
  index.css            Global design tokens + shared utilities
```
