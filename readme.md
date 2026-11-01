# Class Zero (Class0)

Class Zero is a simple, modern class-management portal for teachers and school administrators.

## Features

- Overview dashboard for classes, students, assignments, and teaching hours
- Class management with active course cards
- Calendar with event creation and an optional weekend view (Monday to Friday by default)
- Student directory with search and class filtering
- Student enrollment by individual form or batch upload
- Batch upload dialog accepting CSV, XLS, and XLSX files
- Downloadable CSV roster template with optional email support
- Cambodia-friendly contact channels: Telegram, phone, and email (at least one required)
- Attendance management with search, status filters, summaries, bulk updates, and name pronunciation
- Score and grade entry
- Exam creation
- Leave request review
- Student notes and classroom alerts
- Parent communication workflows
- Insights and workspace settings pages
- Role selector in Settings: School top management, Teacher, Student, Admin
- Responsive sticky sidebar with mobile navigation

## Roles

The Settings page includes a role selector with four roles:

- School top management
- Teacher
- Student
- Admin

The selected role updates the profile card. This is a UI preview only. It does not yet sign users in or restrict pages and actions by role.

## Attendance name pronunciation

Each student row in Attendance has a speaker button that reads the student's name aloud using the browser's built-in speech synthesis. This works only in browsers that support the Web Speech API.

## Batch enrollment template

The roster template uses these columns:

```csv
first_name,last_name,email,phone,telegram,class,parent_contact
Maya,Chen,,+85512345678,@mayachen,Product Design Studio,+85598765432
```

Email is optional. Each student needs at least one contact method (email, phone, or Telegram).

Note: XLS and XLSX files can be selected for upload, but spreadsheet parsing is not implemented yet. Only the CSV template is currently processed.

## Tech stack

- Angular 20
- TypeScript
- Tailwind CSS 3
- Angular CLI with Vite
- Jasmine and Karma for unit testing

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Run unit tests:

```bash
npm test
```

## Deployment

The production build outputs to `dist/fusion-angular-tailwind-starter/browser`. Netlify must use this as its publish directory.

## Project structure

- `src/app/app.ts` — application state and interactions
- `src/app/app.html` — Class Zero dashboard and page views
- `src/styles.css` — global styles and Tailwind layers
- `tailwind.config.js` — Class Zero design tokens and typography

## Known limitations

- Data (classes, students, events, attendance, grades) is sample data held in memory and is not saved to a backend.
- Role selection does not enforce authentication or permissions.
- XLS and XLSX parsing is not implemented.
