import { BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table, Unique } from "sequelize-typescript";
import { Class } from "./Class";
import { Course } from "./Course";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { StudentCourse } from "./StudentCourse";

@Table
export class Student extends Model<InferAttributes<Student>, InferCreationAttributes<Student>> {
    @Unique
    @Column
    public studentId!: string;

    @Column
    public name!: string;

    @Column
    public age!: number;

    @BelongsTo(() => Class)
    public class?: Class;

    @BelongsToMany(() => Course, () => StudentCourse)
    public courses: Array<Course & { BookAuthor: StudentCourse; }> = [];

    @ForeignKey(() => Class)
    @Column
    public classId?: number;
}