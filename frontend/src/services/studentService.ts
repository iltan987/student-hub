import { Student } from '../types';

const endpoint = 'http://127.0.0.1:3000/api/students';

export const createStudent = async (student: Partial<Student>): Promise<Student> => {
  const response = await fetch(`${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error('Failed to create student');
  }
  return response.json();
};

export const fetchStudent = async (id: string): Promise<Student> => {
  const response = await fetch(`${endpoint}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch student');
  }
  return response.json();
};

export const fetchStudents = async (): Promise<Student[]> => {
  const response = await fetch(`${endpoint}`);
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  return response.json();
};

export const deleteStudent = async (id: number): Promise<void> => {
  const response = await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete student');
  }
};

export const updateStudent = async (student: Partial<Student>): Promise<Student> => {
  const response = await fetch(`${endpoint}/${student.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error('Failed to update student');
  }
  return response.json();
};