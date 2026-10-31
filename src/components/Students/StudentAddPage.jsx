/**
 * StudentAddPage.jsx
 * Page wrapper for creating a new student.
 */
import { useNavigate } from "react-router-dom";
import { useStudents } from "../../context/StudentContext";
import { useToast } from "../UI/Toast";
import StudentForm from "./StudentForm";
import BackLink from "../UI/BackLink";

export default function StudentAddPage() {
  const navigate = useNavigate();
  const { addStudent } = useStudents();
  const { addToast } = useToast();

  const handleSubmit = (formData) => {
    const created = addStudent(formData);
    addToast(`${created.firstName} ${created.lastName} has been enrolled!`, "success");
    navigate("/students");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <BackLink onClick={() => navigate("/students")} label="Back to Students" />
      <StudentForm onSubmit={handleSubmit} onCancel={() => navigate("/students")} />
    </div>
  );
}
