/**
 * CourseList.jsx
 * Grid of course cards showing course name, student count, average grade,
 * and a visual enrollment bar.
 */
import { useMemo } from "react";
import { useStudents } from "../../context/StudentContext";

/* ── Card accent colors ───────────────────────────────────────── */
const cardColors = [
  { bar: "bg-chart-1", accent: "bg-chart-1/15 text-chart-1" },
  { bar: "bg-chart-2", accent: "bg-chart-2/15 text-chart-2" },
  { bar: "bg-chart-3", accent: "bg-chart-3/15 text-chart-3" },
  { bar: "bg-chart-4", accent: "bg-chart-4/15 text-chart-4" },
  { bar: "bg-chart-5", accent: "bg-chart-5/15 text-chart-5" },
  { bar: "bg-primary", accent: "bg-primary/15 text-primary" },
];

/* ── Course icon (book) ───────────────────────────────────────── */
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export default function CourseList() {
  const { students } = useStudents();

  /* ── Derive course data ─────────────────────────────────────── */
  const courses = useMemo(() => {
    const gradePoints = { A: 4, B: 3, C: 2, D: 1, F: 0 };
    const map = {};

    students.forEach((s) => {
      if (!map[s.course]) map[s.course] = { count: 0, gradeSum: 0 };
      map[s.course].count++;
      map[s.course].gradeSum += gradePoints[s.grade] ?? 0;
    });

    const entries = Object.entries(map)
      .map(([name, { count, gradeSum }]) => ({
        name,
        count,
        avgGpa: count > 0 ? (gradeSum / count).toFixed(2) : "0.00",
      }))
      .sort((a, b) => b.count - a.count);

    const maxCount = entries.length > 0 ? entries[0].count : 1;
    return entries.map((c) => ({ ...c, pct: (c.count / maxCount) * 100 }));
  }, [students]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Courses</h2>
        <p className="text-muted-foreground mt-1">Overview of all courses and enrollment statistics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {courses.map((course, i) => {
          const color = cardColors[i % cardColors.length];
          return (
            <div
              key={course.name}
              className="bg-card text-card-foreground border border-border rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              {/* Icon + name */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-md ${color.accent}`}>
                  <BookIcon />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{course.count} students</span>
              </div>

              <h3 className="font-semibold text-foreground text-lg mb-1">{course.name}</h3>

              {/* Average GPA */}
              <p className="text-sm text-muted-foreground mb-4">
                Average GPA: <span className="font-semibold text-foreground">{course.avgGpa}</span>
              </p>

              {/* Enrollment bar */}
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Relative Enrollment</span>
                  <span>{Math.round(course.pct)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color.bar} transition-all duration-500`}
                    style={{ width: `${course.pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {courses.length === 0 && (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">No course data available.</p>
        </div>
      )}
    </div>
  );
}
