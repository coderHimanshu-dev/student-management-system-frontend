/**
 * Reports.jsx
 * Visual report cards derived from student data:
 *  - Enrollment by semester (horizontal bars)
 *  - Grade distribution (A-F horizontal bars)
 *  - Status breakdown (CSS bar chart)
 *  - Course popularity ranking
 * Uses chart color tokens (chart-1 through chart-5).
 */
import { useMemo } from "react";
import { useStudents } from "../../context/StudentContext";

/* ── Shared bar component ─────────────────────────────────────── */
function HBar({ label, value, max, color, suffix = "" }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground w-28 shrink-0 truncate">{label}</span>
      <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700 flex items-center justify-end pr-2`}
          style={{ width: `${Math.max(pct, 6)}%` }}
        >
          <span className="text-[10px] font-bold text-white">{value}{suffix}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Report card wrapper ──────────────────────────────────────── */
function ReportCard({ title, children }) {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function Reports() {
  const { students } = useStudents();

  /* ── 1. Enrollment by semester (derived from enrollmentDate year-half) ── */
  const enrollmentData = useMemo(() => {
    const map = {};
    students.forEach((s) => {
      if (!s.enrollmentDate) return;
      const d = new Date(s.enrollmentDate);
      const half = d.getMonth() < 6 ? "Spring" : "Fall";
      const key = `${half} ${d.getFullYear()}`;
      map[key] = (map[key] || 0) + 1;
    });
    const entries = Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
    const max = Math.max(...entries.map((e) => e[1]), 1);
    return { entries, max };
  }, [students]);

  /* ── 2. Grade distribution ──────────────────────────────────── */
  const gradeData = useMemo(() => {
    const map = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    students.forEach((s) => {
      if (map[s.grade] !== undefined) map[s.grade]++;
    });
    const max = Math.max(...Object.values(map), 1);
    return { map, max };
  }, [students]);

  /* ── 3. Status breakdown ────────────────────────────────────── */
  const statusData = useMemo(() => {
    const map = { active: 0, inactive: 0, graduated: 0 };
    students.forEach((s) => {
      if (map[s.status] !== undefined) map[s.status]++;
    });
    const total = students.length || 1;
    return Object.entries(map).map(([status, count]) => ({
      status,
      count,
      pct: ((count / total) * 100).toFixed(1),
    }));
  }, [students]);

  /* ── 4. Course popularity ───────────────────────────────────── */
  const courseRanking = useMemo(() => {
    const map = {};
    students.forEach((s) => {
      map[s.course] = (map[s.course] || 0) + 1;
    });
    const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
    const max = entries.length > 0 ? entries[0][1] : 1;
    return { entries, max };
  }, [students]);

  /* ── Color assignments ──────────────────────────────────────── */
  const gradeColors = { A: "bg-chart-2", B: "bg-chart-1", C: "bg-chart-5", D: "bg-chart-4", F: "bg-destructive" };
  const statusColors = { active: "bg-chart-1", inactive: "bg-chart-4", graduated: "bg-chart-2" };
  const enrollmentColors = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"];
  const courseColors = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5", "bg-primary"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Reports</h2>
        <p className="text-muted-foreground mt-1">Analytics and insights from student data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Enrollment Over Time ────────────────────────────── */}
        <ReportCard title="Enrollment Over Time">
          <div className="space-y-3">
            {enrollmentData.entries.map(([label, count], i) => (
              <HBar
                key={label}
                label={label}
                value={count}
                max={enrollmentData.max}
                color={enrollmentColors[i % enrollmentColors.length]}
              />
            ))}
            {enrollmentData.entries.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No enrollment data</p>
            )}
          </div>
        </ReportCard>

        {/* ── Grade Distribution ──────────────────────────────── */}
        <ReportCard title="Grade Distribution">
          <div className="space-y-3">
            {Object.entries(gradeData.map).map(([grade, count]) => (
              <HBar
                key={grade}
                label={`Grade ${grade}`}
                value={count}
                max={gradeData.max}
                color={gradeColors[grade]}
              />
            ))}
          </div>
        </ReportCard>

        {/* ── Status Breakdown ────────────────────────────────── */}
        <ReportCard title="Status Breakdown">
          {/* CSS bar chart */}
          <div className="space-y-4">
            {/* Stacked bar */}
            <div className="h-8 flex rounded-full overflow-hidden bg-muted">
              {statusData.map((s) => (
                <div
                  key={s.status}
                  className={`${statusColors[s.status]} transition-all duration-500`}
                  style={{ width: `${s.pct}%` }}
                  title={`${s.status}: ${s.count} (${s.pct}%)`}
                />
              ))}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-4">
              {statusData.map((s) => (
                <div key={s.status} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${statusColors[s.status]}`} />
                  <span className="text-sm capitalize text-foreground">{s.status}</span>
                  <span className="text-xs text-muted-foreground">({s.count} · {s.pct}%)</span>
                </div>
              ))}
            </div>
          </div>
        </ReportCard>

        {/* ── Course Popularity ────────────────────────────────── */}
        <ReportCard title="Course Popularity Ranking">
          <div className="space-y-3">
            {courseRanking.entries.map(([name, count], i) => (
              <HBar
                key={name}
                label={name}
                value={count}
                max={courseRanking.max}
                color={courseColors[i % courseColors.length]}
              />
            ))}
            {courseRanking.entries.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No course data</p>
            )}
          </div>
        </ReportCard>
      </div>
    </div>
  );
}
