import { Router } from 'express';
import classRouter from './ClassRouter';
import courseRouter from './CourseRouter';
import studentRouter from './StudentRouter';

const router = Router();

router.use('/classes', classRouter);
router.use('/courses', courseRouter);
router.use('/students', studentRouter);

export default router;