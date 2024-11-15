import { JsonObject, JsonValue } from '@prisma/client/runtime/library';
import { Request } from 'express';

export interface UserRole {
  id: number;
  roleId: number;
  userId: number;
  role: Role;

}
export interface UserCredentials  {
  email: string;
  password: string;
  
}
export interface Permission {
  name:string,
  description:string
}
export interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export interface JWTPayload {
  userId: number;
  email: string;
  roles: string[];
  companyId: number;
  permissions: string[];
}

// Extend Express Request type properly
export interface AuthRequest extends Request {
  user?: JWTPayload;
}