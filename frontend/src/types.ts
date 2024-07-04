export class Class {
  name!: string;
  students: Student[] = [];

  id?: number | any;
  createdAt?: Date | any;
  updatedAt?: Date | any;

  constructor(name: string) {
    this.name = name;
  }
}

export class Student {
  studentId!: string;
  name!: string;
  age!: number;
  class?: Class;
  courses: Array<Course & { BookAuthor: StudentCourse; }> = [];
  classId?: number;

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