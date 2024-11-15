import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import {AuthMiddleware} from '../middleware/auth.middleware';

const authRouter  = express.Router();
const authController = new AuthController();
//const auth = new AuthMiddeware();



authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', AuthMiddleware.verifyToken, authController.logout);

// Protected route example with role check
authRouter.get('/admin', 
  AuthMiddleware.verifyToken, 
  AuthMiddleware.hasRole(['ADMIN']), 
  (req, res) => {
    res.json({ message: 'Admin access granted', user: 'hi' });
    
  }
);



export default authRouter;