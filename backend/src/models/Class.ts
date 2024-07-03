import { Table, Column, Model, HasMany, Unique } from 'sequelize-typescript';
import { Student } from './Student';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table
export class Class extends Model<InferAttributes<Class>, InferCreationAttributes<Class>> {
    @Unique
    @Column
    name!: string;

    @HasMany(() => Student)
    students: Student[] = [];
}