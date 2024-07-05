import { Course } from '../types';

const endpoint = 'http://127.0.0.1:3000/api/courses';

export const createCourse = async (course: Partial<Course>): Promise<Course> => {
  const response = await fetch(`${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });
  if (!response.ok) {
    throw new Error('Failed to create course');
  }
  return response.json();
};

export const fetchCourses = async (): Promise<Course[]> => {
  const response = await fetch(`${endpoint}`);
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return response.json();
};

export const fetchCourse = async (id: string): Promise<Course> => {
  const response = await fetch(`${endpoint}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch course');
  }
  return response.json();
}

export const deleteCourse = async (id: string): Promise<void> => {
  const response = await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete course');
  }
};

export const updateCourse = async (course: Partial<Course>): Promise<Course> => {
  const response = await fetch(`${endpoint}/${course.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });
  if (!response.ok) {
    throw new Error('Failed to update course');
  }
  return response.json();
};