import express,{Response} from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { AuthRequest } from '../types/auth.types';
import {MeasurementController} from '../controllers/measurement.controller'

const router = express.Router();
const measurementController = new MeasurementController();
// Use the middleware with proper typing

router.post('/login', measurementController.login);
router.post('/register', measurementController.register);
router.post('/logout', measurementController.logout);
router.post('/refresh', AuthMiddleware.verifyToken, measurementController.refresh);


router.get(
  '/protected',
  AuthMiddleware.verifyToken,
  (req: AuthRequest, res: Response) => {
    res.json({ user: req.user });
  }
);

router.get(
  '/admin',
  AuthMiddleware.verifyToken,
  AuthMiddleware.hasRole(['ADMIN']),
  (req: AuthRequest, res: Response) => {
    res.json({ message: 'Admin access granted', user: req.user });
  }
);

export const authRouter = router;