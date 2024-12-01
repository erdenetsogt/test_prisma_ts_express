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
  id: number;
  username: string;
  email: string;
  roles: string[];
  companyId: number;
  peopleId: number;
  // companyName: company.name;
  // first_name: people.firstName;
  // last_name: people.lastName;
  // fullname: people.firstName;
  permissions: string[];
}
export interface company {
  id: number;
  name: string;
}
export interface people {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
}

// Extend Express Request type properly
export interface AuthRequest extends Request {
  user?: JWTPayload;
}