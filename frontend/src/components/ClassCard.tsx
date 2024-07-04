import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Class } from "../types";
import { Link } from "react-router-dom";

interface ClassCardProps {
  cls: Class;
  onEdit: (classId: number) => void;
  onDelete: (classId: number) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({ cls, onEdit, onDelete }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6 m-4 w-64 transition-transform duration-200 ease-in-out transform hover:-translate-y-1 group/item">
      <Link to={`/classes/${cls.id}`} className="block">
        <div className="font-bold text-xl mb-2">{cls.name}</div>
        <div className="text-gray-700 text-base">
          Total Students: {cls.students.length}
        </div>
      </Link>
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 ease-in-out">
        <button
          onClick={() => onEdit(cls.id)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faEdit} size="lg" title="Edit" />
        </button>
        <button
          onClick={() => onDelete(cls.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FontAwesomeIcon icon={faTrash} size="lg" title="Delete" />
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
