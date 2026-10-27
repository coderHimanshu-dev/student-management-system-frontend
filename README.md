# StudentMS — Student Management System

StudentMS is a student management dashboard built with React, Tailwind CSS, and Vite. It lets you manage student records, view course information, track grades, and check enrollment statistics through a single interface.

The project runs entirely in the browser, so you don't need to set up a backend or database to try it out. Student data is stored in `localStorage`, which means your changes remain available when you reopen the app in the same browser.

## Features

- **Dashboard:** View student counts, active enrollments, graduated students, GPA statistics, and recent registrations.
- **Student management:** Add, view, edit, and delete student records.
- **Search and filters:** Find students by name, email, or course and filter records by status.
- **Sorting and pagination:** Sort student records by supported columns and browse the list in pages of 10.
- **Student profiles:** View details such as contact information, date of birth, course, grade, enrollment date, and address.
- **Course overview:** Compare enrollment numbers and average GPA across courses.
- **Reports:** Explore enrollment data, grade distribution, and course popularity.
- **Light and dark themes:** Switch between themes with the selected preference saved in the browser.
- **Form validation:** Validate student details before submitting the form.
- **Notifications and confirmations:** Get feedback after actions and confirm deletions before removing records.
- **Responsive layout:** Use the dashboard on desktop and smaller screens.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Building the user interface |
| Vite 8 | Development server and build tool |
| Tailwind CSS v4 | Styling and responsive layouts |
| React Router v7 | Navigation between pages |
| CSS custom properties | Theme colors and design tokens |
| Browser localStorage | Saving student records and theme preferences |
| Inline SVG | Icons without an additional icon library |

The UI uses OKLCH color values for its design tokens, including the primary color, card backgrounds, and chart colors.

## Project Structure

```text
STD/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Courses/
│   │   │   └── CourseList.jsx
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── StatsCard.jsx
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── Reports/
│   │   │   └── Reports.jsx
│   │   ├── Students/
│   │   │   ├── StudentAddPage.jsx
│   │   │   ├── StudentDetailPage.jsx
│   │   │   ├── StudentEditPage.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   ├── StudentSearch.jsx
│   │   │   ├── StudentsPage.jsx
│   │   │   └── StudentTable.jsx
│   │   └── UI/
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── Modal.jsx
│   │       └── Toast.jsx
│   ├── context/
│   │   ├── StudentContext.jsx
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Requirements

- Node.js compatible with your installed Vite version
- npm, yarn, or pnpm

### Installation

Clone the repository or open the project directory, then run:

```bash
cd STD
npm install
npm run dev
```

Open the local URL shown in your terminal. With the default Vite configuration, it is usually:

```text
http://localhost:5173/
```

### Production Build

Build the project with:

```bash
npm run build
```

To test the production build locally:

```bash
npm run preview
```

## Pages

### Dashboard

The dashboard provides an overview of student records, including total enrollment, active students, graduates, GPA statistics, recent registrations, and course distribution.

### Students

The student directory includes search, status and course filters, sortable columns, pagination, and actions for viewing, editing, or deleting a record.

### Student Profile

Each profile displays the student's personal and academic information, including contact details, course, grade, enrollment date, and address.

### Courses

The courses page compares enrollment numbers, average GPA, and student distribution across courses.

### Reports

The reports page presents enrollment trends, grade distribution from A to F, and course popularity.

## Data Storage

Student records are stored in browser `localStorage` under the key:

```javascript
studentms_students
```

The app starts with 12 sample student records so you can test the main features without entering everything manually.

Because the data is stored locally, it is specific to the browser and origin you're using. Clearing browser storage will remove the saved records. Data is not automatically shared between devices or users.

**Note:** This is a frontend project for learning and demonstration purposes. It does not include a server, user authentication, or a shared database.

## License

This project is intended for educational, demonstration, and personal portfolio use. Add a specific open-source license file if you plan to distribute it under a particular license.