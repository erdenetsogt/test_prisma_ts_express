import express,{Response} from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { AuthRequest } from '../types/auth.types';


const router = express.Router();

// Use the middleware with proper typing
router.post('/register', AuthMiddleware.verifyToken, (req: AuthRequest, res: Response) => {
  
})

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

export const userRouter = router;