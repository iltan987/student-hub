import { Router } from 'express';
import classRouter from './ClassRouter';
import courseRouter from './CourseRouter';
import studentRouter from './StudentRouter';
import studentCourseRouter from './StudentCourseRouter';

const router = Router();

router.use('/classes', classRouter);
router.use('/courses', courseRouter);
router.use('/students', studentRouter);
router.use('/student-course', studentCourseRouter)

export default router;