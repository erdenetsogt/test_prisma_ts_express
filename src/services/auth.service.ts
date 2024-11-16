
  // auth.service.ts
  import { PrismaClient } from '@prisma/client';
  import * as bcrypt from 'bcrypt';
  import * as jwt from 'jsonwebtoken';
  import { randomBytes } from 'crypto';
  import {  JWTPayload,UserCredentials } from '../types/auth.types';
  const prisma = new PrismaClient()
  const JWT_SECRET = process.env.JWT_SECRET || 'ohDAlZ6VQvsntVD5Gc1P';
  const REFRESH_SECRET = process.env.REFRESH_SECRET || 'QGTjmbqu0duJgigKZsIV';
  const ACCESS_EXPIRESIN = process.env.ACCESS_EXPIRESIN || '30m';
  const REFRESH_EXPIRESIN = process.env.REFRESH_EXPIRESIN || '7d';
  export class AuthService {
    async register(credentials: UserCredentials) {
      const { email, password} = credentials;
  
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        throw new Error('User already exists');
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Generate refresh token
      const refreshToken = randomBytes(40).toString('hex');
  
      // Create new user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          refreshToken,
          status: 1, // Active status          
        },
        include: {
          company: true,
          people: true,
          UserRole: {
            include: {
              role: true
            }
          }
        }
      });
  
      // Generate tokens
      const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(user);
  
      return {
        //user: this.sanitizeUser(user),
        accessToken,
        refreshToken: newRefreshToken
      };
    }
  
    async login(credentials: UserCredentials) {
      const { email, password } = credentials;
  
      // Find user with relationships
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          company: true,
          people: true,
          UserRole: {
            include: {
              role: true
            }
          }
        }
      });
  
      if (!user || !user.password) {
        throw new Error('Invalid credentials');
      }
  
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }
  
      // Check if user is active
      if (user.status !== 1) {
        throw new Error('Account is inactive');
      }
  
      // Generate new tokens
      const { accessToken, refreshToken } = await this.generateTokens(user);
  
      // Update refresh token in database
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken }
      });
  
      return {
        //user: this.sanitizeUser(user),
        accessToken,
        refreshToken
      };
    }
  
    async refreshAccessToken(refreshToken: string) {
      // Find user by refresh token
      const user = await prisma.user.findFirst({
        where: { refreshToken },
        include: {
          company: true,
          people: true,
          UserRole: {
            include: {
              role: true
            }
          }
        }
      });
  
      if (!user) {
        throw new Error('Invalid refresh token');
      }
  
      // Generate new tokens
      const tokens = await this.generateTokens(user);
  
      // Update refresh token in database
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken }
      });
  
      return {
        //user: this.sanitizeUser(user),
        ...tokens
      };
    }
  
    private async generateTokens(user: any) {
      const roles = user.UserRole?.map((ur: any) => ur.role.name) || [];
      
      const payload: JWTPayload = {
        userId: user.id,
        email: user.email,
        companyId: user.companyId,
        roles: roles,
        permissions: user.permissions
      };
  
      const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRESIN });
      const refreshToken = randomBytes(40).toString('hex');
  
      return { accessToken, refreshToken };
    }
  
    verifyToken(token: string): JWTPayload {
      try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
      } catch (error) {
        throw new Error('Invalid token');
      }
    }
  
    // private sanitizeUser(user: any): UserResponse {
    //   const { password, refreshToken, ...sanitizedUser } = user;
    //   return sanitizedUser;
    // }
  
    async logout(userId: number) {
      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null }
      });
    }
  }