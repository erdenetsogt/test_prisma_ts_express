import exp from 'constants';
import { peopleCreateSchema } from './people.schema';
import {z} from 'zod';
import e from 'express';
import { stat } from 'fs';
export const companyCreateSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
})
export const departmentCreateSchema = z.object({
  id: z.number().optional(),
  parentId: z.number().optional(),
  name: z.string().min(1, 'Name is required'), 
  status: z.number().optional(),
  company: z.object({
    connect: z.object({
      id: z.number().optional(),
    })
  }), 
})
export const positionCreateSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  department: departmentCreateSchema.optional(),
  status: z.number().optional(),
})
export const employeeCreateSchema = z.object({
  id: z.number().optional(),
  peopleId: z.number().optional(),
  positionId: z.number().optional(),
  status: z.number().optional(),
})

export const companyUpdateSchema = companyCreateSchema.partial();
export type CompanyCreateInput = z.infer<typeof companyCreateSchema>;
export type CompanyUpdateInput = z.infer<typeof companyUpdateSchema>;

export const departmentUpdateSchema = departmentCreateSchema.partial();
export type DepartmentCreateInput = z.infer<typeof departmentCreateSchema>;
export type DepartmentUpdateInput = z.infer<typeof departmentUpdateSchema>;

export const positionUpdateSchema = positionCreateSchema.partial();
export type PositionCreateInput = z.infer<typeof positionCreateSchema>;
export type PositionUpdateInput = z.infer<typeof positionUpdateSchema>;

export const employeeUpdateSchema = employeeCreateSchema.partial();
export type EmployeeUpdateInput = z.infer<typeof employeeUpdateSchema>;
export type EmployeeCreateInput = z.infer<typeof employeeCreateSchema>;
