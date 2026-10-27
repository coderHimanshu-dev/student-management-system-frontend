import { useParams, useNavigate } from "react-router-dom";
import { useStudents } from "../../context/StudentContext";
import { useToast } from "../UI/Toast";
import StudentDetail from "./StudentDetail";

export default function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, deleteStudent } = useStudents();
  const { addToast } = useToast();

  const student = getStudentById(id);

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
