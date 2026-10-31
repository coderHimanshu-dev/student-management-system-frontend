/**
 * StudentTable.jsx
 * Sortable, paginated table of students.
 * Columns: Avatar+Name, Email, Course, Status, Grade, Actions.
 */
import { useState, useMemo } from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { STATUS_STYLES } from "../../constants";

const PAGE_SIZE = 10;

const SORT_KEYS = {
  name:   (s) => `${s.firstName} ${s.lastName}`.toLowerCase(),
  email:  (s) => s.email.toLowerCase(),
  course: (s) => s.course.toLowerCase(),
  status: (s) => s.status,
  grade:  (s) => s.grade,
};

/* ── Icons ────────────────────────────────────────────────────── */
const SortArrow = ({ dir }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className={`inline ml-1 transition-transform ${dir === "desc" ? "rotate-180" : ""}`}
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const ViewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

/* ── Column header ────────────────────────────────────────────── */
function TH({ label, sortId, sortKey, sortDir, onSort, className = "" }) {
  return (
    <th
      onClick={() => onSort(sortId)}
      className={`text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground
                  cursor-pointer select-none hover:text-foreground transition-colors ${className}`}
    >
      {label}
      {sortKey === sortId && <SortArrow dir={sortDir} />}
    </th>
  );
}

/* ── Avatar circle ────────────────────────────────────────────── */
function Avatar({ student }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
      style={{ backgroundColor: student.avatar?.color || "#6366f1" }}
    >
      {student.avatar?.initials || "??"}
    </div>
  );
}

export default function StudentTable({ students = [], onView, onEdit, onDelete }) {
  const [sortKey, setSortKey]       = useState(null);
  const [sortDir, setSortDir]       = useState("asc");
  const [page, setPage]             = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ── Sorted list ──────────────────────────────────────────────── */
  const sorted = useMemo(() => {
    if (!sortKey) return students;
    const fn   = SORT_KEYS[sortKey];
    const copy = [...students];
    copy.sort((a, b) => {
      const va = fn(a), vb = fn(b);
      if (va < vb) return sortDir === "asc" ? -1 :  1;
      if (va > vb) return sortDir === "asc" ?  1 : -1;
      return 0;
    });
    return copy;
  }, [students, sortKey, sortDir]);

  const totalPages  = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const paginated   = sorted.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  const handleSort = (key) => {
    setSortKey((prev) => {
      if (prev === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      else setSortDir("asc");
      return key;
    });
    setPage(0);
  };

  /* ── Empty state ──────────────────────────────────────────────── */
  if (students.length === 0) {
    return (
      <div className="bg-card text-card-foreground border border-border rounded-lg p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          className="mx-auto text-muted-foreground mb-4">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="11" x2="23" y2="11" />
        </svg>
        <h3 className="text-base font-semibold text-foreground">No students found</h3>
        <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>
      </div>
    );
  }

  const thProps = { sortKey, sortDir, onSort: handleSort };

  return (
    <>
      <div className="bg-card text-card-foreground border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <TH label="Name"   sortId="name"   {...thProps} />
                <TH label="Email"  sortId="email"  {...thProps} className="hidden md:table-cell" />
                <TH label="Course" sortId="course" {...thProps} className="hidden lg:table-cell" />
                <TH label="Status" sortId="status" {...thProps} />
                <TH label="Grade"  sortId="grade"  {...thProps} className="hidden sm:table-cell" />
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((s) => (
                <tr key={s.id}
                  className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                  {/* Name + Avatar */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar student={s} />
                      <span className="font-medium text-foreground whitespace-nowrap">
                        {s.firstName} {s.lastName}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{s.email}</td>

                  {/* Course */}
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{s.course}</td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize
                                      ${STATUS_STYLES[s.status] || ""}`}>
                      {s.status}
                    </span>
                  </td>

                  {/* Grade */}
                  <td className="px-4 py-3 font-semibold hidden sm:table-cell">{s.grade}</td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => onView?.(s.id)} title="View"
                        className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        <ViewIcon />
                      </button>
                      <button onClick={() => onEdit?.(s.id)} title="Edit"
                        className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        <EditIcon />
                      </button>
                      <button onClick={() => setDeleteTarget(s)} title="Delete"
                        className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer">
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Page {currentPage + 1} of {totalPages} &middot; {sorted.length} total
            </p>
            <div className="flex gap-1">
              <Button variant="outline" size="sm"
                disabled={currentPage === 0}
                onClick={() => setPage((p) => p - 1)}>
                ← Prev
              </Button>
              <Button variant="outline" size="sm"
                disabled={currentPage >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}>
                Next →
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Student"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm"
              onClick={() => { onDelete?.(deleteTarget.id); setDeleteTarget(null); }}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-card-foreground">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{deleteTarget?.firstName} {deleteTarget?.lastName}</span>?{" "}
          This action cannot be undone.
        </p>
      </Modal>
    </>
  );
}
