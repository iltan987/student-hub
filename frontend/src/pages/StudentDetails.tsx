import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Course, Student } from '../types';
import Loading from '../components/Loading';
import { fetchStudent } from '../services/studentService';
import { fetchCourses } from '../services/courseService';
import { addStudentToCourse, removeStudentFromCourse } from '../services/studentCourseService';

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}

const ClassDetails: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [studentDetails, setStudentDetails] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const data = await fetchStudent(id!);

        const courses = await fetchCourses();
        setStudentDetails(data);
        setCourses(data.courses);
        setAvailableCourses(
          courses.filter(
            (course) => !data.courses?.find((c) => c.id === course.id)
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
  

  const handleAddCourse = async (courseId: number) => {
    try {
      await addStudentToCourse(parseInt(id!), courseId);
      const updatedStudent = await fetchStudent(id!);
      setStudentDetails(updatedStudent);
      setCourses(updatedStudent.courses);
      setAvailableCourses(availableCourses.filter(course => course.id !== courseId));
    } catch (error:any) {
      setError('Error adding course to student: ' + error.message);
    }
  };

  const handleRemoveCourse = async (courseId: number) => {
    try {
      await removeStudentFromCourse(parseInt(id!), courseId);
      const updatedStudent = await fetchStudent(id!);
      
      setStudentDetails(updatedStudent);
      setCourses(updatedStudent.courses);
      setAvailableCourses([...availableCourses, courses.find(course => course.id === courseId)!]);
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
        <h2 className="text-2xl mb-4">{studentDetails?.name}</h2>
        <p>Students in this class:</p>
        <ul>
          {courses.map((course) => (
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
        <h2 className="text-2xl mb-4">Add Course to Student</h2>
        <select
          onChange={(e) => handleAddCourse(parseInt(e.target.value))}
          className="p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Select a course</option>
          {availableCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
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