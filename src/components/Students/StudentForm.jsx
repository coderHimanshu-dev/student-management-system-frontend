/**
 * StudentForm.jsx
 * Add / Edit student form with validation.
 * Receives optional `student` prop for edit mode.
 */
import { useState } from "react";
import Button from "../UI/Button";

const COURSES = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Biology",
  "English Literature",
  "Economics",
];
const STATUSES = ["active", "inactive", "graduated"];
const GENDERS = ["Male", "Female", "Other"];
const GRADES = ["A", "B", "C", "D", "F"];

/* ── Validation helpers ───────────────────────────────────────── */
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPhone = (v) => /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v);

export default function StudentForm({ student, onSubmit, onCancel }) {
  const isEdit = !!student;
  const [form, setForm] = useState(() => ({
    firstName: student?.firstName || "",
    lastName: student?.lastName || "",
    email: student?.email || "",
    phone: student?.phone || "",
    dateOfBirth: student?.dateOfBirth || "",
    gender: student?.gender || "",
    enrollmentDate: student?.enrollmentDate || "",
    course: student?.course || "",
    grade: student?.grade || "",
    status: student?.status || "active",
    address: student?.address || "",
  }));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  /* ── Handle field change ────────────────────────────────────── */
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  /* ── Validate ───────────────────────────────────────────────── */
  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!isValidEmail(form.email)) errs.email = "Invalid email format";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!isValidPhone(form.phone)) errs.phone = "Invalid phone format (e.g. (555) 123-4567)";
    if (!form.dateOfBirth) errs.dateOfBirth = "Date of birth is required";
    if (!form.gender) errs.gender = "Gender is required";
    if (!form.enrollmentDate) errs.enrollmentDate = "Enrollment date is required";
    if (!form.course) errs.course = "Course is required";
    if (!form.grade) errs.grade = "Grade is required";
    if (!form.address.trim()) errs.address = "Address is required";
    return errs;
  };

  /* ── Submit ─────────────────────────────────────────────────── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      onSubmit?.(form);
      setSubmitting(false);
    }, 250);
  };

  /* ── Field helper ───────────────────────────────────────────── */
  const inputCls = (field) =>
    `w-full px-3 py-2 bg-input border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow ${
      errors[field] ? "border-destructive" : "border-border"
    }`;

  return (
    <form onSubmit={handleSubmit} className="bg-card text-card-foreground border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-6">{isEdit ? "Edit Student" : "Add New Student"}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            First Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={handleChange("firstName")}
            className={inputCls("firstName")}
            placeholder="John"
          />
          {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Last Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={form.lastName}
            onChange={handleChange("lastName")}
            className={inputCls("lastName")}
            placeholder="Doe"
          />
          {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            className={inputCls("email")}
            placeholder="john.doe@university.edu"
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone <span className="text-destructive">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            className={inputCls("phone")}
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Date of Birth <span className="text-destructive">*</span>
          </label>
          <input
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange("dateOfBirth")}
            className={inputCls("dateOfBirth")}
          />
          {errors.dateOfBirth && <p className="text-xs text-destructive mt-1">{errors.dateOfBirth}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Gender <span className="text-destructive">*</span>
          </label>
          <select value={form.gender} onChange={handleChange("gender")} className={inputCls("gender")}>
            <option value="">Select gender…</option>
            {GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.gender && <p className="text-xs text-destructive mt-1">{errors.gender}</p>}
        </div>

        {/* Enrollment Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Enrollment Date <span className="text-destructive">*</span>
          </label>
          <input
            type="date"
            value={form.enrollmentDate}
            onChange={handleChange("enrollmentDate")}
            className={inputCls("enrollmentDate")}
          />
          {errors.enrollmentDate && <p className="text-xs text-destructive mt-1">{errors.enrollmentDate}</p>}
        </div>

        {/* Course */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Course <span className="text-destructive">*</span>
          </label>
          <select value={form.course} onChange={handleChange("course")} className={inputCls("course")}>
            <option value="">Select course…</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.course && <p className="text-xs text-destructive mt-1">{errors.course}</p>}
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Grade <span className="text-destructive">*</span>
          </label>
          <select value={form.grade} onChange={handleChange("grade")} className={inputCls("grade")}>
            <option value="">Select grade…</option>
            {GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.grade && <p className="text-xs text-destructive mt-1">{errors.grade}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select value={form.status} onChange={handleChange("status")} className={inputCls("status")}>
            {STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Address (full width) */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Address <span className="text-destructive">*</span>
          </label>
          <textarea
            rows="2"
            value={form.address}
            onChange={handleChange("address")}
            className={inputCls("address")}
            placeholder="123 Main St, City, Country"
          />
          {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
        </div>
      </div>

      {/* Form actions */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={submitting}>
          {isEdit ? "Save Changes" : "Add Student"}
        </Button>
      </div>
    </form>
  );
}
