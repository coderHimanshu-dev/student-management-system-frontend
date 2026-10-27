import { useNavigate } from "react-router-dom";
import { useStudents } from "../../context/StudentContext";
import { useToast } from "../UI/Toast";
import StudentForm from "./StudentForm";

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
      <button
        onClick={() => navigate("/students")}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
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
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Students
      </button>

      <StudentForm onSubmit={handleSubmit} onCancel={() => navigate("/students")} />
    </div>
  );
}
