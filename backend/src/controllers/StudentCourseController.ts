import { Request, Response } from 'express';
import { StudentCourse } from '../models/StudentCourse';

class StudentCourseController {
  async addStudentToCourse(req: Request, res: Response) {
    try {
      const { studentId, courseId } = req.body;
      return res.status(201).json((await StudentCourse.create({ studentId, courseId })));
    } catch (error:any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async removeStudentFromCourse(req: Request, res: Response) {
    try {
      const { studentId, courseId } = req.body;
      const result = await StudentCourse.destroy({
        where: { studentId, courseId }
      });
      if (result === 0) {
        return res.status(404).json({ message: 'Association not found' });
      }
      return res.status(204).send();
    } catch (error:any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new StudentCourseController();