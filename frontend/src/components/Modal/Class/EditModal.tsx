import { useState } from "react";
import { Class } from "../../../types";

interface EditModalProps {
  modalContent: string;
  selectedClass: Class | null;
  setSelectedClass: (classData: Class | null) => void;
  handleEditSave: () => void;
  handleAddSave: () => void;
  serverError: string | null;
}

const EditModal: React.FC<EditModalProps> = ({
  modalContent,
  selectedClass,
  setSelectedClass,
  handleEditSave,
  handleAddSave,
  serverError,
}) => {
  const [error, setError] = useState<string | null>(null);

  const validateAndSave = () => {
    if (!selectedClass || !selectedClass.name.trim()) {
      setError('Class name cannot be empty');
      return;
    }

    setError(null);
    modalContent === 'edit' ? handleEditSave() : handleAddSave();
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">{modalContent === 'edit' ? 'Edit' : 'Add'} Class</h2>
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
            value={selectedClass?.name || ""}
            onChange={(e) =>
              setSelectedClass(
                selectedClass
                  ? { ...selectedClass, name: e.target.value }
                  : null
              )
            }
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
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