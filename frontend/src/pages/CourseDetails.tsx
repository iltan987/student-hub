import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Course, Student } from '../types';
import Loading from '../components/Loading';
import { fetchStudents } from '../services/studentService';
import { fetchCourse } from '../services/courseService';
import { addStudentToCourse, removeStudentFromCourse } from '../services/studentCourseService';

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}

const ClassDetails: React.FC = () => {
  const { id} = useParams<RouteParams>();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const data = await fetchCourse(id!);

        const students = await fetchStudents();
        setCourseDetails(data);
        setStudents(data.students);
        setAvailableStudents(
          students.filter(
            (student) => !data.students?.find((s) => s.id === student.id)
          )
        );
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching class details:', error);
        setIsLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);
  

  const handleAddStudent = async (studentId: number) => {
    try {
      await addStudentToCourse(studentId, parseInt(id!));
      const updatedCourse = await fetchCourse(id!);
      setCourseDetails(updatedCourse);
      setStudents(updatedCourse.students);
      setAvailableStudents(availableStudents.filter(student => student.id !== studentId));
    } catch (error:any) {
      setError('Error adding student to course: ' + error.message);
    }
  };

  const handleRemoveCourse = async (studentId: number) => {
    try {
      await removeStudentFromCourse(studentId, parseInt(id!));
      const updatedCourse = await fetchCourse(id!);
      
      setCourseDetails(updatedCourse);
      setStudents(updatedCourse.students);
      setAvailableStudents([...availableStudents, students.find(student => student.id === id)!]);
    } catch (error:any) {
      setError('Error removing course from student: ' + error.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Student Details</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <h2 className="text-2xl mb-4">{courseDetails?.name}</h2>
        <p>Students in this class:</p>
        <ul>
          {students.map((course) => (
            <li key={course.id} className="flex justify-between items-center">
              {course.name}
              <button
                onClick={() => handleRemoveCourse(course.id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md ml-4"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl mb-4">Add Student to Course</h2>
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