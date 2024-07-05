import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ClassPage from "./pages/ClassPage";
import ClassDetails from "./pages/ClassDetails";
import StudentPage from "./pages/StudentPage";
import StudentDetails from "./pages/StudentDetails";
import Navbar from "./components/Navbar";
import CoursePage from "./pages/CoursePage";
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<ClassPage />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/classes" element={<ClassPage />} />
          <Route path="/classes/:id" element={<ClassDetails />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
