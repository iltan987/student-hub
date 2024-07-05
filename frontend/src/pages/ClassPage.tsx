import React, { useEffect, useState } from "react";
import { Class } from "../types";
import ClassCard from "../components/ClassCard";
import Loading from "../components/Loading";
import {
  createClass,
  deleteClass,
  fetchClasses,
  updateClass,
} from "../services/classService";
import Modal from "../components/Modal/Modal";
import EditModal from "../components/Modal/Class/EditModal";
import DeleteModal from "../components/Modal/Class/DeleteModal";

const ClassPage: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setClasses(await fetchClasses());
      } catch (error) {
        console.error("Error fetching class data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    setSelectedClass({
      id: undefined,
      name: "",
      students: [],
    });
    setModalContent("add");
    setIsModalOpen(true);
  };

  const handleEdit = (classData: Class) => {
    setSelectedClass(classData);
    setModalContent("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (classData: Class) => {
    setSelectedClass(classData);
    setModalContent("delete");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
    setModalContent("");
    setServerError(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedClass) {
      try {
        await deleteClass(selectedClass.id);
        setClasses(
          classes.filter((classData) => classData.id !== selectedClass.id)
        );
        handleModalClose();
      } catch (error: any) {
        setServerError("Error deleting student: " + error.message);
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleEditSave = async () => {
    if (selectedClass) {
      try {
        const { id, name } = selectedClass;
        const updatedClass = await updateClass({ id, name });

        setClasses(
          classes.map((classData) =>
            classData.id === updatedClass.id ? updatedClass : classData
          )
        );
        handleModalClose();
      } catch (error: any) {
        setServerError("Error updating student: " + error.message);
        console.error("Error updating student:", error.message);
      }
    }
  };

  const handleAddSave = async () => {
    if (selectedClass) {
      try {
        const { name, students } = selectedClass;
        const newClass = await createClass({ name, students });
        setClasses([...classes, newClass]);
        handleModalClose();
      } catch (error: any) {
        setServerError("Error creating class: " + error.message);
        console.error("Error creating class:", error);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Classes</h1>
      <button
        onClick={handleAdd}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Class
      </button>
      <div className="flex flex-wrap">
        {classes.map((cls) => (
          <ClassCard
            key={cls.id}
            classData={cls}
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
            handleEditSave={handleEditSave}
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
          />
        ) : (
          <DeleteModal
            serverError={serverError}
            handleDeleteConfirm={handleDeleteConfirm}
            handleModalClose={handleModalClose}
            selectedClass={selectedClass}
          />
        )}
      </Modal>
    </div>
  );
};

export default ClassPage;
