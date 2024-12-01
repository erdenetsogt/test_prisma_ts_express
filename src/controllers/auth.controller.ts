
  
  // auth.controller.ts
  import { Request, Response } from 'express';
  import { AuthService } from '../services/auth.service';
  import  { AuthRequest } from '../types/auth.types';
  const authService = new AuthService();
 
export class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async login(req: Request, res: Response) {
    
    try {
      
      const result = await authService.login(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  public async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshAccessToken(refreshToken);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  public async logout(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        throw new Error('User not authenticated');
      }
      await authService.logout(req.user.id);
      res.json({ message: 'Logged out successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  public async me(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      const user = await authService.me(req.user.id);

      res.json(
        {
          id: user?.id,
          username: user?.email,
          email: user?.email,
          companyName: user?.company?.name,
          first_name: user?.people?.firstName,
          last_name: user?.people?.lastName,
          roles: user?.UserRole.map(role => role.role.name),
          permissions: user?.UserRole.flatMap(role => Array.isArray(role.role.permissions) ? role.role.permissions.map(permission => permission?? '') : [])
        }
      );
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}