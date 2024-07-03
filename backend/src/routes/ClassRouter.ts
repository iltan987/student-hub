import { Router } from 'express';
import ClassController from '../controllers/ClassController';

const router = Router();

router.post('/', ClassController.create);
router.get('/', ClassController.getAll);
router.get('/:id', ClassController.getById);
router.put('/:id', ClassController.update);
router.delete('/:id', ClassController.delete);

export default router;