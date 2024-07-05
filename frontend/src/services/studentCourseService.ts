const endpoint = 'http://127.0.0.1:3000/api/student-course';

export const addStudentToCourse = async (studentId: number, courseId: number): Promise<void> => {
  const response = await fetch(`${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({studentId, courseId}),
  });
  if (!response.ok) {
    throw new Error('Failed to add student to course');
  }
};

export const removeStudentFromCourse = async (studentId: number, courseId: number): Promise<void> => {
    const response = await fetch(`${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({studentId, courseId}),
    });
    if (!response.ok) {
      throw new Error('Failed to add student to course');
    }
};