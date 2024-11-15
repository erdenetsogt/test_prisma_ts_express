// types.ts

  export type UserCredentials = {
    email: string;
    password: string;
    peopleId?: number;
    companyId?: number;
  };
  
  export type JWTPayload = {
    userId: number;
    email: string;
    companyId?: number;
    roles?: string[];
  };
  
  export interface UserResponse {
    id: number;
    email: string;
    status?: number;
    companyId?: number;
    peopleId?: number;
    company?: any;
    people?: any;
    UserRole?: any[];
  }
  export interface AuthRequest extends Request {
    user?: JWTPayload;
  }
  
  // Example usage in routes:
  