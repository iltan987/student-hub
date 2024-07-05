import { Request, Response } from 'express';
import { Student } from '../models/Student';
import { Class } from '../models/Class';
import { Course } from '../models/Course';

class StudentController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const newStudent = await Student.create(req.body);
            res.status(201).json(await Student.findByPk(newStudent.id, { include: [Class, Course] }));
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const students = await Student.findAll({ include: [Class, Course] });
            res.status(200).json(students);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const student = await Student.findByPk(req.params.id, { include: [Class, Course] });
            if (student) {
                res.status(200).json(student);
            } else {
                res.status(404).json({ error: 'Student not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const [updated] = await Student.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedStudent = await Student.findByPk(req.params.id, { include: [Class, Course] });
                res.status(200).json(updatedStudent);
            } else {
                res.status(404).json({ error: 'Student not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await Student.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Student not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new StudentController();