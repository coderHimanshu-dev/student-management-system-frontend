/**
 * StudentDetailPage.jsx
 * Page wrapper that fetches a student by URL param and renders StudentDetail.
 */
import { useParams, useNavigate } from "react-router-dom";
import { useStudents } from "../../context/StudentContext";
import { useToast } from "../UI/Toast";
import StudentDetail from "./StudentDetail";
import NotFound from "../UI/NotFound";

export default function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, deleteStudent } = useStudents();
  const { addToast } = useToast();

  const student = getStudentById(id);

  if (!student) {
    return (
      <NotFound
        message={`No student found with ID "${id}".`}
        onBack={() => navigate("/students")}
        backLabel="Back to Students"
      />
    );
  }

  const handleDelete = (studentId) => {
    deleteStudent(studentId);
    addToast("Student record deleted successfully", "success");
    navigate("/students");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <StudentDetail
        student={student}
        onEdit={(studentId) => navigate(`/students/edit/${studentId}`)}
        onDelete={handleDelete}
        onBack={() => navigate("/students")}
      />
    </div>
  );
}
