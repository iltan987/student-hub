import { Router } from 'express';
import StudentCourseController from '../controllers/StudentCourseController';

const router = Router();

router.post('/', StudentCourseController.addStudentToCourse);
router.delete('/', StudentCourseController.removeStudentFromCourse);

export default router;