import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { Student } from '../models/Student';

class CourseController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const newCourse = await Course.create(req.body);
            res.status(201).json(await Course.findByPk(newCourse.id, { include: [Student] }));
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const courses = await Course.findAll({ include: [Student] });
            res.status(200).json(courses);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const course = await Course.findByPk(req.params.id, { include: [Student] });
            if (course) {
                res.status(200).json(course);
            } else {
                res.status(404).json({ error: 'Course not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const [updated] = await Course.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedCourse = await Course.findByPk(req.params.id, { include: [Student] });
                res.status(200).json(updatedCourse);
            } else {
                res.status(404).json({ error: 'Course not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await Course.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Course not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new CourseController();