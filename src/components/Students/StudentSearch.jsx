/**
 * StudentSearch.jsx
 * Search input with icon, filter dropdowns (Status, Course), clear button, result count.
 */

const COURSES = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Biology",
  "English Literature",
  "Economics",
];
const STATUSES = ["active", "inactive", "graduated"];

export default function StudentSearch({
  query,
  onQueryChange,
  statusFilter,
  onStatusChange,
  courseFilter,
  onCourseChange,
  resultCount,
  onClear,
}) {
  const hasFilters = query || statusFilter || courseFilter;

  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, or course…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        {/* Course filter */}
        <select
          value={courseFilter}
          onChange={(e) => onCourseChange(e.target.value)}
          className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <option value="">All Courses</option>
          {COURSES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Clear filters */}
        {hasFilters && (
          <button
            onClick={onClear}
            className="px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="text-xs text-muted-foreground mt-3">
        Showing <span className="font-semibold text-foreground">{resultCount}</span> student{resultCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
