import { useParams, useNavigate } from "react-router-dom";
import { useStudents } from "../../context/StudentContext";
import { useToast } from "../UI/Toast";
import StudentForm from "./StudentForm";
import Button from "../UI/Button";

export default function StudentEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, updateStudent } = useStudents();
  const { addToast } = useToast();

  const student = getStudentById(id);

  if (!student) {
    return (
      <div className="bg-card text-card-foreground border border-border rounded-lg p-12 text-center max-w-lg mx-auto">
        <h3 className="text-lg font-semibold text-foreground">Student Not Found</h3>
        <p className="text-muted-foreground mt-1 mb-4">
          No student found with ID {id}.
        </p>
        <Button variant="outline" onClick={() => navigate("/students")}>
          Back to Students
        </Button>
      </div>
    );
  }

  const handleSubmit = (formData) => {
    updateStudent(id, formData);
    addToast(`${formData.firstName} ${formData.lastName}'s information was updated`, "success");
    navigate(`/students/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <button
        onClick={() => navigate(`/students/${id}`)}
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
        Back to Details
      </button>

      <StudentForm
        student={student}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/students/${id}`)}
      />
    </div>
  );
}
