import express,{Response} from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { AuthRequest } from '../types/auth.types';
import {AuthController} from '../controllers/auth.controller'

const router = express.Router();
const authService = new AuthController();
// Use the middleware with proper typing

router.post('/login', authService.login);
router.get('/user',AuthMiddleware.verifyToken, authService.me);
router.post('/register', authService.register);
router.post('/logout', authService.logout);
router.post('/refresh', AuthMiddleware.verifyToken, authService.refresh);


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