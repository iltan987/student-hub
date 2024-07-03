import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { Student } from './Student';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { StudentCourse } from './StudentCourse';

@Table
export class Course extends Model<InferAttributes<Course>, InferCreationAttributes<Course>> {
    @Column
    name!: string;

    @BelongsToMany(() => Student, () => StudentCourse)
    students: Array<Student & {BookAuthor: StudentCourse}>[] = [];
}