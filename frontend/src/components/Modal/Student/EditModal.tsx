import { useState } from "react";
import { Class, Student } from "../../../types";

interface EditModalProps {
  modalContent: string;
  classes: Class[];
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  handleEditSave: () => void;
  handleAddSave: () => void;
  serverError: string | null;
}

const EditModal: React.FC<EditModalProps> = ({
  modalContent,
  classes,
  selectedStudent,
  setSelectedStudent,
  handleEditSave,
  handleAddSave,
  serverError,
}) => {
  const [error, setError] = useState<string | null>(null);

  const validateAndSave = () => {
    if (!selectedStudent || !selectedStudent.name.trim()) {
      setError('Student name cannot be empty');
      return;
    }
    if (!selectedStudent.studentId.trim()) {
      setError('Student Id cannot be empty');
      return;
    }
    if (!selectedStudent.age) {
      setError('Age cannot be empty');
      return;
    }

    setError(null);
    modalContent === 'edit' ? handleEditSave() : handleAddSave();
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">{modalContent === 'edit' ? 'Edit' : 'Add'} Student</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          validateAndSave();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={selectedStudent?.name || ""}
            onChange={(e) =>
              setSelectedStudent(
                selectedStudent
                  ? { ...selectedStudent, name: e.target.value }
                  : null
              )
            }
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Student Id</label>
          <input
            type="text"
            maxLength={8}
            value={selectedStudent?.studentId || ""}
            onChange={(e) =>
              setSelectedStudent(
                selectedStudent
                  ? { ...selectedStudent, studentId: e.target.value }
                  : null
              )
            }
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            value={selectedStudent?.age || 0}
            min={0}
            onChange={(e) =>
              setSelectedStudent(
                selectedStudent
                  ? { ...selectedStudent, age: parseInt(e.target.value) }
                  : null
              )
            }
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Class</label>
          <select
            value={selectedStudent?.classId || ""}
            onChange={(e) =>
              setSelectedStudent(
                selectedStudent
                  ? {
                      ...selectedStudent,
                      classId: parseInt(e.target.value),
                    }
                  : null
              )
            }
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          {serverError && <p className="text-red-500 text-sm mt-1">{serverError}</p>}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
