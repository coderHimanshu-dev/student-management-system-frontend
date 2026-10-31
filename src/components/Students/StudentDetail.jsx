/**
 * StudentDetail.jsx
 * Full student profile card: banner, avatar, info grid, Edit/Delete actions.
 */
import { useState } from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import BackLink from "../UI/BackLink";
import { STATUS_STYLES } from "../../constants";

/* ── Info item ────────────────────────────────────────────────── */
function InfoItem({ label, value, icon }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-muted-foreground shrink-0 mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground break-words">{value || "—"}</p>
      </div>
    </div>
  );
}

/* ── Pencil icon ──────────────────────────────────────────────── */
const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="mr-1.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="mr-1.5">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export default function StudentDetail({ student, onEdit, onDelete, onBack }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!student) {
    return (
      <div className="bg-card text-card-foreground border border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground mb-4">Student not found.</p>
        <Button variant="outline" onClick={onBack}>← Back to List</Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <BackLink onClick={onBack} label="Back to Students" />

        {/* Profile card */}
        <div className="bg-card text-card-foreground border border-border rounded-lg overflow-hidden">

          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-primary via-chart-1 to-chart-3" />

          {/* Avatar + header */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">
              {/* Avatar */}
              <div
                className="w-20 h-20 rounded-full border-4 border-card flex items-center justify-center
                            text-2xl font-bold text-white shrink-0"
                style={{ backgroundColor: student.avatar?.color || "#6366f1" }}
              >
                {student.avatar?.initials || "??"}
              </div>

              {/* Actions — moved to top-right on desktop */}
              <div className="flex gap-2 sm:pb-1">
                <Button variant="outline" size="sm" onClick={() => onEdit(student.id)}>
                  <PencilIcon /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setShowDeleteModal(true)}>
                  <TrashIcon /> Delete
                </Button>
              </div>
            </div>

            {/* Name, email, status */}
            <div className="mt-3">
              <h2 className="text-xl font-bold text-foreground">
                {student.firstName} {student.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">{student.email}</p>
              <span className={`inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-semibold capitalize
                               ${STATUS_STYLES[student.status] || ""}`}>
                {student.status}
              </span>
            </div>
          </div>

          {/* Info grid */}
          <div className="border-t border-border px-6 py-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-5">
              Student Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoItem label="Phone" value={student.phone} icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              } />
              <InfoItem label="Date of Birth" value={student.dateOfBirth} icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              } />
              <InfoItem label="Gender" value={student.gender} icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" />
                </svg>
              } />
              <InfoItem label="Course" value={student.course} icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              } />
              <InfoItem label="Grade" value={student.grade} icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              } />
              <InfoItem label="Enrollment Date" value={student.enrollmentDate} icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              } />
              <InfoItem label="Address" value={student.address} icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              } />
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirm modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Student"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="destructive" size="sm"
              onClick={() => { onDelete(student.id); setShowDeleteModal(false); }}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-card-foreground">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{student.firstName} {student.lastName}</span>?{" "}
          This action cannot be undone.
        </p>
      </Modal>
    </>
  );
}
