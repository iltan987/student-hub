import { Request, Response } from 'express';
import { Class } from '../models/Class';
import { Student } from '../models/Student';

class ClassController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const newClass = await Class.create(req.body);
            res.status(201).json(newClass);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const classes = await Class.findAll({ include: [Student] });
            res.status(200).json(classes);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const classInstance = await Class.findByPk(req.params.id, { include: [Student] });
            if (classInstance) {
                res.status(200).json(classInstance);
            } else {
                res.status(404).json({ error: 'Class not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const [updated] = await Class.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedClass = await Class.findByPk(req.params.id);
                res.status(200).json(updatedClass);
            } else {
                res.status(404).json({ error: 'Class not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await Class.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Class not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new ClassController();