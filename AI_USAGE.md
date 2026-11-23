# AI Usage

This project was built with assistance from AI tools. This document records the tools used, representative prompts, the areas AI helped with, and one AI-generated suggestion that was checked, corrected or rejected.

## AI tools used

- **Bolt (Anthropic Claude)** — an AI-powered development assistant used inside the Bolt.new environment. Claude acted as a senior frontend engineer and UI/UX designer for the build, writing the component code, styles and documentation, and verifying the build.

## Representative prompts

1. > Act as a senior frontend engineer and UI/UX designer. Build a complete, professional, responsive and fully functional task management dashboard named FocusBoard using React with Vite, JavaScript, functional components and hooks, CSS, localStorage persistence, and Lucide React icons. Include a sidebar, header with search, overview statistics, a Focus Notes carousel with three slides, a task list with create/edit/delete and status updates, combined search and filters, and responsive design for 1440px, 768px and 390px.

2. > Create reusable components for the dashboard: Sidebar, Header, StatsCards, FocusNotes, Filters, TaskList, TaskItem, TaskForm and a confirmation dialog. Organize them under src/components with a shared constants file and data files for the sample tasks and focus notes.

3. > Implement localStorage persistence so that tasks are saved on every change, restored on startup, seeded with sample data only when no saved data exists, and never overwrite existing saved data. Handle invalid or unavailable localStorage safely.

4. > Make sure search, status tabs and priority filters work together without resetting each other, and add a reset filters control. Calculate all statistics dynamically from the task array and handle the zero-task case.

5. > Add accessibility: semantic HTML, labels for inputs, ARIA attributes for the modal and carousel, visible keyboard focus indicators, and keyboard support for the form and carousel.

## AI-assisted areas

- Project scaffolding and component architecture.
- The CSS design system: color ramps, spacing scale, typography, status and priority badges, and responsive media queries for the three required breakpoints.
- Implementing the Focus Notes carousel with synchronized indicators and keyboard arrow-key navigation.
- Designing the immutable state updates for create, edit, delete and status changes, and the `useMemo`-based statistics and filtering.
- Writing the README and this AI usage document.

## An AI-generated suggestion that was checked, corrected or rejected

- **Suggestion:** During planning, the AI environment offered an automated Supabase database for persistence and recommended using it for task storage.
- **Action taken:** Rejected. The assessment brief explicitly forbids backends, authentication, cloud databases and external task APIs, and requires browser `localStorage` persistence. The implementation uses `localStorage` as specified, and the Supabase option was not used. This was the correct call for the requirements, even though a database would otherwise be a reasonable default for persistent data.
