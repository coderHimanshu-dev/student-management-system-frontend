/**
 * StudentTable.jsx
 * Responsive table listing students with sorting, pagination, status badges,
 * and action buttons (View, Edit, Delete with confirm).
 */
import { useState, useMemo } from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

/* ── Status → badge variant ───────────────────────────────────── */
const statusStyles = {
  active: "bg-primary/15 text-primary",
  inactive: "bg-muted text-muted-foreground",
  graduated: "bg-chart-2/15 text-chart-2",
};

/* ── Sortable columns ─────────────────────────────────────────── */
const SORT_KEYS = {
  name: (s) => `${s.firstName} ${s.lastName}`.toLowerCase(),
  email: (s) => s.email.toLowerCase(),
  course: (s) => s.course.toLowerCase(),
  status: (s) => s.status,
  grade: (s) => s.grade,
};

const PAGE_SIZE = 10;

/* ── Sort arrow icon ──────────────────────────────────────────── */
const SortArrow = ({ dir }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline ml-1 transition-transform ${dir === "desc" ? "rotate-180" : ""}`}
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

/* ── Column header component declared outside render ─────────── */
function TableHeader({ label, sortId, sortKey, sortDir, onSort, className = "" }) {
  return (
    <th
      onClick={() => onSort(sortId)}
      className={`text-left px-5 py-3 font-medium cursor-pointer select-none hover:text-foreground transition-colors ${className}`}
    >
      {label}
      {sortKey === sortId && <SortArrow dir={sortDir} />}
    </th>
  );
}

export default function StudentTable({ students = [], onView, onEdit, onDelete }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ── Sorting ────────────────────────────────────────────────── */
  const sorted = useMemo(() => {
    if (!sortKey) return students;
    const fn = SORT_KEYS[sortKey];
    if (!fn) return students;
    const copy = [...students];
    copy.sort((a, b) => {
      const va = fn(a);
      const vb = fn(b);
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [students, sortKey, sortDir]);

  /* ── Pagination ─────────────────────────────────────────────── */
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const paginated = sorted.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
  };

  /* ── Empty state ────────────────────────────────────────────── */
  if (students.length === 0) {
    return (
      <div className="bg-card text-card-foreground border border-border rounded-lg p-12 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto text-muted-foreground mb-4"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="11" x2="23" y2="11" />
        </svg>
        <h3 className="text-lg font-semibold text-foreground">No students found</h3>
        <p className="text-muted-foreground mt-1">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card text-card-foreground border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <TableHeader label="Name" sortId="name" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                <TableHeader label="Email" sortId="email" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className="hidden md:table-cell" />
                <TableHeader label="Course" sortId="course" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className="hidden lg:table-cell" />
                <TableHeader label="Status" sortId="status" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                <TableHeader label="Grade" sortId="grade" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className="hidden sm:table-cell" />
                <th className="text-left px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-accent/40 transition-colors">
                  {/* Name + avatar */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ backgroundColor: s.avatar?.color || "#6366f1" }}
                      >
                        {s.avatar?.initials || "??"}
                      </div>
                      <span className="font-medium text-foreground whitespace-nowrap">
                        {s.firstName} {s.lastName}
                      </span>
                    </div>
                  </td>
                  {/* Email */}
                  <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">{s.email}</td>
                  {/* Course */}
                  <td className="px-5 py-3 text-muted-foreground hidden lg:table-cell">{s.course}</td>
                  {/* Status */}
                  <td className="px-5 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyles[s.status] || ""}`}>
                      {s.status}
                    </span>
                  </td>
                  {/* Grade */}
                  <td className="px-5 py-3 font-medium hidden sm:table-cell">{s.grade}</td>
                  {/* Actions */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => onView?.(s.id)} title="View" className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      </button>
                      <button onClick={() => onEdit?.(s.id)} title="Edit" className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      </button>
                      <button onClick={() => setDeleteTarget(s)} title="Delete" className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Page {safePage + 1} of {totalPages} · {sorted.length} total
            </p>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled={safePage === 0} onClick={() => setPage((p) => p - 1)}>
                ← Prev
              </Button>
              <Button variant="outline" size="sm" disabled={safePage >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
                Next →
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Student"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                onDelete?.(deleteTarget.id);
                setDeleteTarget(null);
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-card-foreground">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {deleteTarget?.firstName} {deleteTarget?.lastName}
          </span>
          ? This action cannot be undone.
        </p>
      </Modal>
    </>
  );
}
