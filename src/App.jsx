import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import StudentsPage from "./components/Students/StudentsPage.jsx";
import StudentAddPage from "./components/Students/StudentAddPage.jsx";
import StudentEditPage from "./components/Students/StudentEditPage.jsx";
import StudentDetailPage from "./components/Students/StudentDetailPage.jsx";
import CourseList from "./components/Courses/CourseList.jsx";
import Reports from "./components/Reports/Reports.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current page key for Sidebar/Header active states and titles
  const getPageKey = (pathname) => {
    if (pathname.startsWith("/dashboard")) return "dashboard";
    if (pathname === "/students/add") return "add-student";
    if (pathname.startsWith("/students/edit")) return "edit-student";
    if (pathname.startsWith("/students/") && pathname.length > 10) return "student-detail";
    if (pathname.startsWith("/students")) return "students";
    if (pathname.startsWith("/courses")) return "courses";
    if (pathname.startsWith("/reports")) return "reports";
    return "dashboard";
  };

  const currentPage = getPageKey(location.pathname);

  const handleNavigate = (key) => {
    switch (key) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "students":
        navigate("/students");
        break;
      case "add-student":
        navigate("/students/add");
        break;
      case "courses":
        navigate("/courses");
        break;
      case "reports":
        navigate("/reports");
        break;
      default:
        navigate("/dashboard");
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard onNavigate={handleNavigate} />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/add" element={<StudentAddPage />} />
        <Route path="/students/edit/:id" element={<StudentEditPage />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
