import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { JWTPayload, AuthRequest } from '../types/auth.types';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthMiddleware {
  // Fixed verifyToken function with proper types
  static verifyToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> | void {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
      }

      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

      // Use Promise.resolve() to handle the async operation properly
      return Promise.resolve()
        .then(async () => {
          const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: {
              UserRole: {
                include: {
                  role: true
                }
              }
            }
          });

          if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
          }

          if (user.status !== 1) {
            res.status(401).json({ message: 'User account is inactive' });
            return;
          }

          const roles = user.UserRole.map(ur => ur.role.name);
          //const permissions = user.UserRole.flatMap(ur => JSON.parse(ur.role.permissions) as string[]);
          const permissions = user.UserRole.flatMap(ur => {
            const parsedPermissions = ur.role.permissions ? JSON.parse(ur.role.permissions as string) : null;
            return Array.isArray(parsedPermissions) ? parsedPermissions : [];
          }) as string[];

          req.user = {
            userId: user.id,
            email: user.email,
            companyId: user.companyId ?? 0,
            roles,
            permissions
          };

          next();
        })
        .catch((error) => {
          console.error('Token verification error:', error);
          res.status(401).json({ message: 'Invalid token' });
        });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
  }

  // Fixed role check middleware
  static hasRole(roles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }

      const hasRequiredRole = req.user.roles.some(role => roles.includes(role));

      if (!hasRequiredRole) {
        res.status(403).json({
          message: 'Insufficient permissions',
          required: roles,
          current: req.user.roles
        });
        return;
      }

      next();
    };
  }

  // Fixed permission check middleware
  static hasPermission(permissions: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }

      const hasRequiredPermission = permissions.every(permission =>
        req.user!.permissions.includes(permission)
      );

      if (!hasRequiredPermission) {
        res.status(403).json({
          message: 'Insufficient permissions',
          required: permissions,
          current: req.user.permissions
        });
        return;
      }

      next();
    };
  }

  // Fixed any permission check middleware
  static hasAnyPermission(permissions: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }

      const hasAnyRequiredPermission = permissions.some(permission =>
        req.user!.permissions.includes(permission)
      );

      if (!hasAnyRequiredPermission) {
        res.status(403).json({
          message: 'Insufficient permissions',
          required: permissions,
          current: req.user.permissions
        });
        return;
      }

      next();
    };
  }
}