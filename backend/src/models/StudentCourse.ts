import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Course } from "./Course";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Student } from "./Student";

@Table( { timestamps: false } )
export class StudentCourse extends Model<InferAttributes<StudentCourse>, InferCreationAttributes<StudentCourse>> {
    @ForeignKey(() => Student)
    @Column
    public studentId!: number;

    @ForeignKey(() => Course)
    @Column
    public courseId!: number;
}