export class Class {
  name!: string;
  students: Student[] = [];

  id?: number | any;
  createdAt?: Date | any;
  updatedAt?: Date | any;
}

export class Student {
  studentId!: string;
  name!: string;
  age!: number;
  class?: Class | null = null;
  courses: Array<Course & { BookAuthor: StudentCourse; }> = [];
  classId?: number | null = null;

  id?: number | any;
  createdAt?: Date | any;
  updatedAt?: Date | any;
}

export class Course {
    name!: string;

    students: Array<Student & { BookAuthor: StudentCourse; }> = [];

    id?: number | any;
    createdAt?: Date | any;
    updatedAt?: Date | any;
}

export class StudentCourse {
    studentId!: number;
    courseId!: number;
}