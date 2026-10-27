/**
 * StudentContext.jsx
 * Manages all student data with CRUD operations, search/filter, statistics.
 * Persists data to localStorage. Pre-populates with 12 sample students on first load.
 */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const StudentContext = createContext(null);

/* ── helper: generate a uuid-v4 ──────────────────────────────── */
const uuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });

/* ── avatar color from name ──────────────────────────────────── */
const avatarColors = [
  "#6366f1", "#ec4899", "#f59e0b", "#10b981",
  "#3b82f6", "#8b5cf6", "#ef4444", "#14b8a6",
  "#f97316", "#06b6d4", "#84cc16", "#e11d48",
];
const pickColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
};

/* ── 12 realistic sample students ─────────────────────────────── */
const sampleStudents = [
  { firstName: "Aarav", lastName: "Sharma", email: "aarav.sharma@university.edu", phone: "(555) 101-2001", dateOfBirth: "2002-03-15", gender: "Male", enrollmentDate: "2023-08-20", course: "Computer Science", grade: "A", status: "active", address: "12 Maple Street, Springfield" },
  { firstName: "Sophia", lastName: "Martinez", email: "sophia.martinez@university.edu", phone: "(555) 101-2002", dateOfBirth: "2001-07-22", gender: "Female", enrollmentDate: "2022-08-18", course: "Mathematics", grade: "A", status: "active", address: "45 Oak Avenue, Riverside" },
  { firstName: "Liam", lastName: "Johnson", email: "liam.johnson@university.edu", phone: "(555) 101-2003", dateOfBirth: "2000-11-05", gender: "Male", enrollmentDate: "2021-08-22", course: "Physics", grade: "B", status: "graduated", address: "78 Pine Road, Lakewood" },
  { firstName: "Amara", lastName: "Okafor", email: "amara.okafor@university.edu", phone: "(555) 101-2004", dateOfBirth: "2003-01-30", gender: "Female", enrollmentDate: "2023-08-20", course: "Biology", grade: "B", status: "active", address: "23 Elm Court, Greenville" },
  { firstName: "Ethan", lastName: "Williams", email: "ethan.williams@university.edu", phone: "(555) 101-2005", dateOfBirth: "2001-09-12", gender: "Male", enrollmentDate: "2022-08-18", course: "English Literature", grade: "C", status: "inactive", address: "56 Birch Lane, Fairview" },
  { firstName: "Mei", lastName: "Chen", email: "mei.chen@university.edu", phone: "(555) 101-2006", dateOfBirth: "2002-05-08", gender: "Female", enrollmentDate: "2023-01-10", course: "Economics", grade: "A", status: "active", address: "89 Cedar Blvd, Brookside" },
  { firstName: "Noah", lastName: "Brown", email: "noah.brown@university.edu", phone: "(555) 101-2007", dateOfBirth: "2000-12-19", gender: "Male", enrollmentDate: "2021-08-22", course: "Computer Science", grade: "B", status: "graduated", address: "34 Walnut Drive, Hillcrest" },
  { firstName: "Priya", lastName: "Patel", email: "priya.patel@university.edu", phone: "(555) 101-2008", dateOfBirth: "2003-04-25", gender: "Female", enrollmentDate: "2023-08-20", course: "Mathematics", grade: "A", status: "active", address: "67 Spruce Way, Meadowbrook" },
  { firstName: "Carlos", lastName: "Rivera", email: "carlos.rivera@university.edu", phone: "(555) 101-2009", dateOfBirth: "2001-06-14", gender: "Male", enrollmentDate: "2022-01-12", course: "Physics", grade: "C", status: "active", address: "90 Ash Street, Sunnyvale" },
  { firstName: "Fatima", lastName: "Al-Hassan", email: "fatima.alhassan@university.edu", phone: "(555) 101-2010", dateOfBirth: "2002-08-03", gender: "Female", enrollmentDate: "2023-01-10", course: "Biology", grade: "B", status: "active", address: "12 Willow Terrace, Oakmont" },
  { firstName: "James", lastName: "O'Brien", email: "james.obrien@university.edu", phone: "(555) 101-2011", dateOfBirth: "2000-10-28", gender: "Male", enrollmentDate: "2021-08-22", course: "English Literature", grade: "A", status: "graduated", address: "45 Poplar Circle, Westfield" },
  { firstName: "Yuki", lastName: "Tanaka", email: "yuki.tanaka@university.edu", phone: "(555) 101-2012", dateOfBirth: "2003-02-17", gender: "Female", enrollmentDate: "2023-08-20", course: "Economics", grade: "B", status: "active", address: "78 Chestnut Place, Eastwood" },
].map((s) => ({
  ...s,
  id: uuid(),
  avatar: { initials: `${s.firstName[0]}${s.lastName[0]}`, color: pickColor(s.firstName + s.lastName) },
}));

const STORAGE_KEY = "studentms_students";

/* ── Provider ─────────────────────────────────────────────────── */
export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch { /* ignore parse errors */ }
    return sampleStudents;
  });

  // Persist to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  /* ── CRUD ───────────────────────────────────────────────────── */
  const addStudent = useCallback((data) => {
    const newStudent = {
      ...data,
      id: uuid(),
      avatar: {
        initials: `${(data.firstName || "?")[0]}${(data.lastName || "?")[0]}`,
        color: pickColor((data.firstName || "") + (data.lastName || "")),
      },
    };
    setStudents((prev) => [...prev, newStudent]);
    return newStudent;
  }, []);

  const updateStudent = useCallback((id, data) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              ...data,
              avatar: {
                initials: `${(data.firstName || s.firstName)[0]}${(data.lastName || s.lastName)[0]}`,
                color: pickColor((data.firstName || s.firstName) + (data.lastName || s.lastName)),
              },
            }
          : s
      )
    );
  }, []);

  const deleteStudent = useCallback((id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const getStudentById = useCallback(
    (id) => students.find((s) => s.id === id) || null,
    [students]
  );

  /* ── Search / Filter ────────────────────────────────────────── */
  const searchStudents = useCallback(
    (query) => {
      if (!query) return students;
      const q = query.toLowerCase();
      return students.filter(
        (s) =>
          s.firstName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.course.toLowerCase().includes(q)
      );
    },
    [students]
  );

  const filterByStatus = useCallback(
    (status) => (status ? students.filter((s) => s.status === status) : students),
    [students]
  );

  const filterByCourse = useCallback(
    (course) => (course ? students.filter((s) => s.course === course) : students),
    [students]
  );

  /* ── Statistics ─────────────────────────────────────────────── */
  const stats = useMemo(() => {
    const gradePoints = { A: 4, B: 3, C: 2, D: 1, F: 0 };
    const totalStudents = students.length;
    const activeStudents = students.filter((s) => s.status === "active").length;
    const graduatedStudents = students.filter((s) => s.status === "graduated").length;
    const gradeSum = students.reduce((sum, s) => sum + (gradePoints[s.grade] ?? 0), 0);
    const averageGrade = totalStudents > 0 ? (gradeSum / totalStudents).toFixed(2) : "0.00";

    return { totalStudents, activeStudents, graduatedStudents, averageGrade };
  }, [students]);

  const value = useMemo(
    () => ({
      students,
      addStudent,
      updateStudent,
      deleteStudent,
      getStudentById,
      searchStudents,
      filterByStatus,
      filterByCourse,
      ...stats,
    }),
    [students, addStudent, updateStudent, deleteStudent, getStudentById, searchStudents, filterByStatus, filterByCourse, stats]
  );

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

/** Hook to consume student context */
export function useStudents() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudents must be used within a StudentProvider");
  return ctx;
}

export default StudentContext;
