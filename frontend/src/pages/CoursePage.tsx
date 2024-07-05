import { useEffect, useState } from "react";
import { Course } from "../types";
import { createCourse, deleteCourse, fetchCourses, updateCourse } from "../services/courseService";
import Loading from "../components/Loading";
import Modal from "../components/Modal/Modal";
import DeleteModal from "../components/Modal/Course/DeleteModal";
import EditModal from "../components/Modal/Course/EditModal";
import CourseCard from "../components/CourseCard";

const CoursePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCourses((await fetchCourses()));
      } catch (error) {
        console.error("Error fetching class data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    setSelectedCourse({
      id: undefined,
      name: "",
      students: [],
    });
    setModalContent("add");
    setIsModalOpen(true);
  };

  const handleEdit = (classData: Course) => {
    setSelectedCourse(classData);
    setModalContent("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (classData: Course) => {
    setSelectedCourse(classData);
    setModalContent("delete");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setModalContent("");
    setServerError(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCourse) {
      try {
        await deleteCourse(selectedCourse.id);
        setCourses(
          courses.filter((classData) => classData.id !== selectedCourse.id)
        );
        handleModalClose();
      } catch (error: any) {
        setServerError("Error deleting course: " + error.message);
        console.error("Error deleting course:", error);
      }
    }
  };

  const handleEditSave = async () => {
    if (selectedCourse) {
      try {
        const { id, name } = selectedCourse;
        const updatedCourse = await updateCourse({ id, name });

        setCourses(
          courses.map((course) =>
            course.id === updatedCourse.id ? updatedCourse : course
          )
        );
        handleModalClose();
      } catch (error:any) {
        setServerError("Error updating course: " + error.message);
        console.error("Error updating course:", error.message);
      }
    }
  };

  const handleAddSave = async () => {
    if (selectedCourse) {
      try {
        const { name, students } = selectedCourse;
        const newCourse = await createCourse({ name, students });
        
        setCourses([...courses, newCourse]);
        handleModalClose();
      } catch (error:any) {
        setServerError("Error creating course: " + error.message);
        console.error("Error creating course:", error);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Courses</h1>
      <button
        onClick={handleAdd}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Course
      </button>
      <div className="flex flex-wrap">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        {modalContent === "edit" || modalContent === "add" ? (
          <EditModal serverError={serverError} handleAddSave={handleAddSave} modalContent={modalContent} handleEditSave={handleEditSave} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}  />
        ) : (
          <DeleteModal serverError={serverError} handleDeleteConfirm={handleDeleteConfirm} handleModalClose={handleModalClose} selectedCourse={selectedCourse} />
        )}
      </Modal>
    </div>
  );
};

export default CoursePage;