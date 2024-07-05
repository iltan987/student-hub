import { Class } from '../types';

const endpoint = 'http://127.0.0.1:3000/api/classes';

export const createClass = async (classData: Partial<Class>): Promise<Class> => {
  const response = await fetch(`${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(classData),
  });
  if (!response.ok) {
    throw new Error('Failed to create class');
  }
  return response.json();
};

export const fetchClasses = async (): Promise<Class[]> => {
  const response = await fetch(`${endpoint}`);
  if (!response.ok) {
    throw new Error('Failed to fetch classes');
  }
  return response.json();
};

export const fetchClass = async (id: string): Promise<Class> => {
  const response = await fetch(`${endpoint}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch class');
  }
  return response.json();
}

export const deleteClass = async (id: string): Promise<void> => {
  const response = await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete class');
  }
};

export const updateClass = async (classData: Partial<Class>): Promise<Class> => {
  const response = await fetch(`${endpoint}/${classData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(classData),
  });
  if (!response.ok) {
    throw new Error('Failed to update class');
  }
  return response.json();
};