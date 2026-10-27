import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../../context/StudentContext";
import { useToast } from "../UI/Toast";
import StudentSearch from "./StudentSearch";
import StudentTable from "./StudentTable";
import Button from "../UI/Button";

export default function StudentsPage() {
  const navigate = useNavigate();
  const { students, deleteStudent } = useStudents();
  const { addToast } = useToast();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase();
        const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
        const matchesQuery =
          fullName.includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.course.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Status filter
      if (statusFilter && s.status !== statusFilter) {
        return false;
      }

      // Course filter
      if (courseFilter && s.course !== courseFilter) {
        return false;
      }

      return true;
    });
  }, [students, query, statusFilter, courseFilter]);

  const handleClearFilters = () => {
    setQuery("");
    setStatusFilter("");
    setCourseFilter("");
  };

  const handleDelete = (id) => {
    deleteStudent(id);
    addToast("Student record deleted successfully", "success");
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Students</h2>
          <p className="text-muted-foreground mt-1">
            Manage, search, and view all enrolled students ({students.length} total)
          </p>
        </div>
        <Button onClick={() => navigate("/students/add")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Student
        </Button>
      </div>

      {/* Search and Filters */}
      <StudentSearch
        query={query}
        onQueryChange={setQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        courseFilter={courseFilter}
        onCourseChange={setCourseFilter}
        resultCount={filteredStudents.length}
        onClear={handleClearFilters}
      />

      {/* Table */}
      <StudentTable
        students={filteredStudents}
        onView={(id) => navigate(`/students/${id}`)}
        onEdit={(id) => navigate(`/students/edit/${id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
