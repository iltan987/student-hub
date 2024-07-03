import { Router } from 'express';
import CourseController from '../controllers/CourseController';

const router = Router();

router.post('/', CourseController.create);
router.get('/', CourseController.getAll);
router.get('/:id', CourseController.getById);
router.put('/:id', CourseController.update);
router.delete('/:id', CourseController.delete);

export default router;