/**
 * StudentEditPage.jsx
 * Page wrapper for editing an existing student record.
 */
import { useParams, useNavigate } from "react-router-dom";
import { useStudents } from "../../context/StudentContext";
import { useToast } from "../UI/Toast";
import StudentForm from "./StudentForm";
import BackLink from "../UI/BackLink";
import NotFound from "../UI/NotFound";

export default function StudentEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, updateStudent } = useStudents();
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

  const handleSubmit = (formData) => {
    updateStudent(id, formData);
    addToast(`${formData.firstName} ${formData.lastName}'s information was updated`, "success");
    navigate(`/students/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <BackLink onClick={() => navigate(`/students/${id}`)} label="Back to Details" />
      <StudentForm
        student={student}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/students/${id}`)}
      />
    </div>
  );
}
