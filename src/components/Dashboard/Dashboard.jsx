/**
 * Dashboard.jsx
 * Main dashboard page with stats cards, recent students, course distribution,
 * quick actions, and a welcome message.
 */
import { useMemo } from "react";
import { useStudents } from "../../context/StudentContext";
import StatsCard from "./StatsCard";
import Button from "../UI/Button";

/* ── Inline SVG Icons for stats cards ─────────────────────────── */
const TotalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const ActiveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);
const GraduatedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-5" /></svg>
);
const GradeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
);

/* ── Status badge colors ──────────────────────────────────────── */
const statusBadge = {
  active: "bg-primary/15 text-primary",
  inactive: "bg-muted text-muted-foreground",
  graduated: "bg-chart-2/15 text-chart-2",
};

export default function Dashboard({ onNavigate }) {
  const { students, totalStudents, activeStudents, graduatedStudents, averageGrade } = useStudents();

  /* ── Course distribution ───────────────────────────────────── */
  const courseDistribution = useMemo(() => {
    const map = {};
    students.forEach((s) => {
      map[s.course] = (map[s.course] || 0) + 1;
    });
    const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
    const max = entries.length > 0 ? entries[0][1] : 1;
    return entries.map(([name, count]) => ({ name, count, pct: (count / max) * 100 }));
  }, [students]);

  /* ── Recent students (last 5 added) ────────────────────────── */
  const recentStudents = useMemo(() => students.slice(-5).reverse(), [students]);

  /* ── Today's date ──────────────────────────────────────────── */
  const today = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  /* ── Chart bar colors ──────────────────────────────────────── */
  const barColors = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5", "bg-primary"];

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome back, Admin! 👋</h2>
        <p className="text-muted-foreground mt-1">{today}</p>
      </div>

      {/* ── Stats Row ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Total Students" value={totalStudents} icon={<TotalIcon />} trend={12} color="bg-primary" />
        <StatsCard title="Active Students" value={activeStudents} icon={<ActiveIcon />} trend={8} color="bg-chart-2" />
        <StatsCard title="Graduated" value={graduatedStudents} icon={<GraduatedIcon />} trend={5} color="bg-chart-4" />
        <StatsCard title="Average GPA" value={averageGrade} icon={<GradeIcon />} trend={-2} color="bg-chart-3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Recent Students Table ──────────────────────────── */}
        <div className="lg:col-span-2 bg-card text-card-foreground border border-border rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="font-semibold">Recent Students</h3>
            <Button variant="ghost" size="sm" onClick={() => onNavigate?.("students")}>
              View All →
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left px-5 py-3 font-medium">Student</th>
                  <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Course</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                  <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Grade</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-accent/40 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ backgroundColor: s.avatar?.color || "#6366f1" }}
                        >
                          {s.avatar?.initials || "??"}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{s.firstName} {s.lastName}</p>
                          <p className="text-xs text-muted-foreground">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">{s.course}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${statusBadge[s.status] || ""}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-medium hidden sm:table-cell">{s.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Course Distribution ────────────────────────────── */}
        <div className="bg-card text-card-foreground border border-border rounded-lg">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-semibold">Course Distribution</h3>
          </div>
          <div className="p-5 space-y-4">
            {courseDistribution.map((c, i) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-foreground font-medium truncate mr-2">{c.name}</span>
                  <span className="text-muted-foreground shrink-0">{c.count} students</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColors[i % barColors.length]} transition-all duration-500`}
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Actions ────────────────────────────────────── */}
      <div className="bg-card text-card-foreground border border-border rounded-lg p-5">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => onNavigate?.("add-student")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add Student
          </Button>
          <Button variant="secondary" onClick={() => onNavigate?.("students")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            View All Students
          </Button>
          <Button variant="outline" onClick={() => onNavigate?.("reports")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
            View Reports
          </Button>
        </div>
      </div>
    </div>
  );
}
