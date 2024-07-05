import React, { useEffect, useState } from "react";
import { Class, Student } from "../types";
import StudentCard from "../components/StudentCard";
import Modal from "../components/Modal/Modal";
import Loading from "../components/Loading";
import {
  createStudent,
  deleteStudent,
  fetchStudents,
  updateStudent,
} from "../services/studentService";
import EditModal from "../components/Modal/Student/EditModal";
import DeleteModal from "../components/Modal/Student/DeleteModal";
import { fetchClasses } from "../services/classService";

const StudentPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, classesData] = await Promise.all([
          fetchStudents(),
          fetchClasses(),
        ]);
        setStudents(studentsData);
        setClasses(classesData);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError("Error fetching data: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAdd = () => {
    setSelectedStudent({
      id: undefined,
      studentId: "",
      name: "",
      age: 0,
      classId: undefined,
      class: undefined,
      courses: [],
    });
    setModalContent("add");
    setIsModalOpen(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setModalContent("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setModalContent("delete");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setModalContent("");
    setServerError(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedStudent) {
      try {
        await deleteStudent(selectedStudent.id);
        setStudents(
          students.filter((student) => student.id !== selectedStudent.id)
        );
        handleModalClose();
      } catch (error: any) {
        setServerError("Error deleting student: " + error.message);
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleEditSave = async () => {
    if (selectedStudent) {
      try {
        const { id, name, studentId, age, classId } = selectedStudent;
        const updatedStudent = await updateStudent({
          id,
          name,
          studentId,
          age,
          classId,
        });

        setStudents(
          students.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student
          )
        );
        handleModalClose();
      } catch (error: any) {
        setServerError("Error updating student: " + error.message);
        console.error("Error updating student:", error);
      }
    }
  };

  const handleAddSave = async () => {
    if (selectedStudent) {
      try {
        const { name, studentId, age, classId } = selectedStudent;
        const addedStudent = await createStudent({
          name,
          studentId,
          age,
          classId,
        });

        setStudents([...students, addedStudent]);
        handleModalClose();
      } catch (error: any) {
        setServerError("Error adding student: " + error.message);
        console.error("Error adding student:", error);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Students</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <button
        onClick={handleAdd}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Student
      </button>
      <div className="flex flex-wrap">
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            std={student}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        {modalContent === "edit" || modalContent === "add" ? (
          <EditModal
            serverError={serverError}
            handleAddSave={handleAddSave}
            modalContent={modalContent}
            classes={classes}
            handleEditSave={handleEditSave}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
        ) : (
          <DeleteModal
            serverError={serverError}
            handleDeleteConfirm={handleDeleteConfirm}
            handleModalClose={handleModalClose}
            selectedStudent={selectedStudent}
          />
        )}
      </Modal>
    </div>
  );
};

export default StudentPage;
