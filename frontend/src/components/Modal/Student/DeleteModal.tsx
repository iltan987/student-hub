import { Student } from "../../../types";

interface DeleteModalProps {
  selectedStudent: Student | null;
  handleDeleteConfirm: () => void;
  handleModalClose: () => void;
  serverError: string | null;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  selectedStudent,
  handleDeleteConfirm,
  handleModalClose,
  serverError,
}) => {
  return (
    <div>
      <h2 className="text-2xl mb-4">Delete Student</h2>
      <p>Are you sure you want to delete {selectedStudent?.name}?</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleDeleteConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Confirm
        </button>
        <button
          onClick={handleModalClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        
        {serverError && <p className="text-red-500 text-sm mt-1">{serverError}</p>}
      </div>
    </div>
  );
};

export default DeleteModal;