import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Student } from "../types";
import { Link } from "react-router-dom";

interface StudentCardProps {
  std: Student;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ std, onEdit, onDelete }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6 m-4 w-64 transition-transform duration-200 ease-in-out transform hover:-translate-y-1 group/item">
      <Link to={`/students/${std.id}`} className="block">
        <div className="font-bold text-xl mb-2">{std.name}</div>
        <div className="text-gray-700 text-base">Student Id: {std.studentId}</div>
        <div className="text-gray-700 text-base">Age: {std.age}</div>
        <div className="text-gray-700 text-base">Class: {std.class?.name ?? "Not assigned"}</div>
        <div className="text-gray-700 text-base">
          Total Courses: {std.courses.length}
        </div>
      </Link>
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 ease-in-out">
        <button
          onClick={() => onEdit(std)}
          className="text-blue-500 hover:text-blue-700"
          title="Edit"
        >
          <FontAwesomeIcon icon={faEdit} size="lg" />
        </button>
        <button
          onClick={() => onDelete(std)}
          className="text-red-500 hover:text-red-700"
          title="Delete"
        >
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default StudentCard;