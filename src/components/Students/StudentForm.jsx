/**
 * StudentForm.jsx
 * Add / Edit student form with validation.
 * Receives optional `student` prop for edit mode.
 */
import { useState } from "react";
import Button from "../UI/Button";
import { COURSES, STATUSES, GENDERS, GRADES } from "../../constants";

/* ── Validation helpers ───────────────────────────────────────── */
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPhone = (v) => /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v);

const buildInitialForm = (student) => ({
  firstName:      student?.firstName      || "",
  lastName:       student?.lastName       || "",
  email:          student?.email          || "",
  phone:          student?.phone          || "",
  dateOfBirth:    student?.dateOfBirth    || "",
  gender:         student?.gender         || "",
  enrollmentDate: student?.enrollmentDate || "",
  course:         student?.course         || "",
  grade:          student?.grade          || "",
  status:         student?.status         || "active",
  address:        student?.address        || "",
});

/* ── Reusable field wrapper ───────────────────────────────────── */
function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}{required && <span className="text-destructive ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}

export default function StudentForm({ student, onSubmit, onCancel }) {
  const isEdit = !!student;
  const [form, setForm]           = useState(() => buildInitialForm(student));
  const [errors, setErrors]       = useState({});
  const [submitting, setSubmitting] = useState(false);

  /* ── Field change handler ─────────────────────────────────────── */
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  /* ── Validation ───────────────────────────────────────────────── */
  const validate = () => {
    const errs = {};
    if (!form.firstName.trim())      errs.firstName      = "First name is required";
    if (!form.lastName.trim())       errs.lastName       = "Last name is required";
    if (!form.email.trim())          errs.email          = "Email is required";
    else if (!isValidEmail(form.email)) errs.email       = "Invalid email format";
    if (!form.phone.trim())          errs.phone          = "Phone is required";
    else if (!isValidPhone(form.phone)) errs.phone       = "Invalid phone (e.g. (555) 123-4567)";
    if (!form.dateOfBirth)           errs.dateOfBirth    = "Date of birth is required";
    if (!form.gender)                errs.gender         = "Gender is required";
    if (!form.enrollmentDate)        errs.enrollmentDate = "Enrollment date is required";
    if (!form.course)                errs.course         = "Course is required";
    if (!form.grade)                 errs.grade          = "Grade is required";
    if (!form.address.trim())        errs.address        = "Address is required";
    return errs;
  };

  /* ── Submit ───────────────────────────────────────────────────── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    setTimeout(() => { onSubmit?.(form); setSubmitting(false); }, 250);
  };

  /* ── Input class helper ───────────────────────────────────────── */
  const cls = (field) =>
    `w-full px-3 py-2 bg-input border rounded-md text-sm text-foreground
     placeholder:text-muted-foreground focus:outline-none focus:ring-2
     focus:ring-ring transition-shadow ${errors[field] ? "border-destructive" : "border-border"}`;

  return (
    <form onSubmit={handleSubmit} className="bg-card text-card-foreground border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-6">
        {isEdit ? "Edit Student" : "Add New Student"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <Field label="First Name" required error={errors.firstName}>
          <input type="text" value={form.firstName} onChange={handleChange("firstName")}
            className={cls("firstName")} placeholder="John" />
        </Field>

        <Field label="Last Name" required error={errors.lastName}>
          <input type="text" value={form.lastName} onChange={handleChange("lastName")}
            className={cls("lastName")} placeholder="Doe" />
        </Field>

        <Field label="Email" required error={errors.email}>
          <input type="email" value={form.email} onChange={handleChange("email")}
            className={cls("email")} placeholder="john.doe@university.edu" />
        </Field>

        <Field label="Phone" required error={errors.phone}>
          <input type="tel" value={form.phone} onChange={handleChange("phone")}
            className={cls("phone")} placeholder="(555) 123-4567" />
        </Field>

        <Field label="Date of Birth" required error={errors.dateOfBirth}>
          <input type="date" value={form.dateOfBirth} onChange={handleChange("dateOfBirth")}
            className={cls("dateOfBirth")} />
        </Field>

        <Field label="Gender" required error={errors.gender}>
          <select value={form.gender} onChange={handleChange("gender")} className={cls("gender")}>
            <option value="">Select gender…</option>
            {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </Field>

        <Field label="Enrollment Date" required error={errors.enrollmentDate}>
          <input type="date" value={form.enrollmentDate} onChange={handleChange("enrollmentDate")}
            className={cls("enrollmentDate")} />
        </Field>

        <Field label="Course" required error={errors.course}>
          <select value={form.course} onChange={handleChange("course")} className={cls("course")}>
            <option value="">Select course…</option>
            {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Grade" required error={errors.grade}>
          <select value={form.grade} onChange={handleChange("grade")} className={cls("grade")}>
            <option value="">Select grade…</option>
            {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </Field>

        <Field label="Status">
          <select value={form.status} onChange={handleChange("status")} className={cls("status")}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Address" required error={errors.address} className="sm:col-span-2">
          <div className="sm:col-span-2">
            <textarea
              rows="2"
              value={form.address}
              onChange={handleChange("address")}
              className={cls("address")}
              placeholder="123 Main St, City, Country"
            />
            {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
          </div>
        </Field>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        )}
        <Button type="submit" loading={submitting}>
          {isEdit ? "Save Changes" : "Add Student"}
        </Button>
      </div>
    </form>
  );
}
