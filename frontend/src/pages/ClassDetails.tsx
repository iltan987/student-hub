import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Class, Student } from "../types";
import Loading from "../components/Loading";
import { fetchClass } from "../services/classService";
import { fetchStudents, updateStudent } from "../services/studentService";

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}

const ClassDetails: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [classDetails, setClassDetails] = useState<Class | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const classInfo = await fetchClass(id!);
        
        const studentsData = await fetchStudents();
        setClassDetails(classInfo);
        setStudents(classInfo.students);
        setAvailableStudents(
          studentsData.filter(
            (student) => !classInfo.students?.find((s) => s.id === student.id)
          )
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching class details:", error);
        setIsLoading(false);
      }
    };

    fetchClassDetails();
  }, [id]);

  const handleAddStudent = async (studentId: number) => {
    try {
      await updateStudent({id: studentId, classId: parseInt(id!)})
      const updatedClass = await fetchClass(id!);
      setClassDetails(updatedClass);
      setStudents(updatedClass.students);
      setAvailableStudents(availableStudents.filter(student => student.id !== studentId));
    } catch (error:any) {
      setError('Error adding student to class: ' + error.message);
    }
  };

  const handleRemoveStudent = async (studentId: number) => {
    try {
      await updateStudent({id: studentId, class: null})
      const updatedClass = await fetchClass(id!);
      
      setClassDetails(updatedClass);
      setStudents(updatedClass.students);
      setAvailableStudents([...availableStudents, students.find(student => student.id === studentId)!]);
    } catch (error:any) {
      setError('Error removing student from class: ' + error.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Class Details</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <h2 className="text-2xl mb-4">{classDetails?.name}</h2>
        <p>Students in this class:</p>
        <ul>
          {students.map((student) => (
            <li key={student.id} className="flex justify-between items-center">
              {student.name}
              <button
                onClick={() => handleRemoveStudent(student.id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md ml-4"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl mb-4">Add Students to Class</h2>
        <select
          onChange={(e) => handleAddStudent(parseInt(e.target.value))}
          className="p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Select a student</option>
          {availableStudents.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md"
      >
        Back
      </button>
    </div>
  );
};

export default ClassDetails;
