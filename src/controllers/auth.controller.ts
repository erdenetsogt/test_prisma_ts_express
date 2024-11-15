
  
  // auth.controller.ts
  import { Request, Response } from 'express';
  import { AuthService } from '../services/auth.service';
  import { AuthRequest } from '../middleware/auth.middleware';
  
  const authService = new AuthService();
  
  export class AuthController {
    async register(req: Request, res: Response) {
      try {
        const result = await authService.register(req.body);
        res.json(result);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
    }
  
    async login(req: Request, res: Response) {
      try {
        const result = await authService.login(req.body);
        res.json(result);
      } catch (error: any) {
        res.status(401).json({ message: error.message });
      }
    }
  
    async refresh(req: Request, res: Response) {
      try {
        const { refreshToken } = req.body;
        const result = await authService.refreshAccessToken(refreshToken);
        res.json(result);
      } catch (error: any) {
        res.status(401).json({ message: error.message });
      }
    }
  
    async logout(req: AuthRequest, res: Response) {
      try {
        if (!req.user?.userId) {
          throw new Error('User not authenticated');
        }
        await authService.logout(req.user.userId);
        res.json({ message: 'Logged out successfully' });
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
    }
  }