/**
 * constants.js
 * Shared constants used across multiple components.
 * Single source of truth — no duplication.
 */

export const COURSES = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Biology",
  "English Literature",
  "Economics",
];

export const STATUSES = ["active", "inactive", "graduated"];
export const GENDERS  = ["Male", "Female", "Other"];
export const GRADES   = ["A", "B", "C", "D", "F"];

/** Maps status string → Tailwind CSS classes for badge styling */
export const STATUS_STYLES = {
  active:    "bg-primary/15 text-primary",
  inactive:  "bg-muted text-muted-foreground",
  graduated: "bg-chart-2/15 text-chart-2",
};

/** Grade letter → GPA points */
export const GRADE_POINTS = { A: 4, B: 3, C: 2, D: 1, F: 0 };
