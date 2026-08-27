# Class Zero (Class0)

Class Zero is a simple, modern class-management portal for teachers and administrators.

## Features

- Overview dashboard for classes, students, assignments, and teaching hours
- Class management with active course cards
- Weekly teaching calendar
- Student directory with search and class filtering
- Student enrollment by individual form or batch upload
- CSV, XLS, and XLSX roster support
- Downloadable roster template with optional email support
- Cambodia-friendly contact channels: Telegram, phone, and email
- Attendance management with search, status filters, summaries, and bulk updates
- Score and grade entry
- Exam creation
- Leave request review
- Student notes and classroom alerts
- Parent communication workflows
- Insights and workspace settings pages
- Responsive sticky sidebar with mobile navigation

## Batch enrollment template

The roster template uses these columns:

```csv
first_name,last_name,email,phone,telegram,class,parent_contact
Maya,Chen,,+85512345678,@mayachen,Product Design Studio,+85598765432
```

Email is optional. At least one contact method should be provided for each student.

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

## Project structure

- `src/app/app.ts` — application state and interactions
- `src/app/app.html` — Class Zero dashboard and page views
- `src/styles.css` — global styles and Tailwind layers
- `tailwind.config.js` — Class Zero design tokens and typography
