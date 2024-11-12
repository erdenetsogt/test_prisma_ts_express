import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);

router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;