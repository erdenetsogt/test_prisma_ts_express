import { PrismaClient } from '@prisma/client'
import {
  companyCreateSchema,
  companyUpdateSchema,
  CompanyCreateInput,
  CompanyUpdateInput,
  departmentCreateSchema,
  departmentUpdateSchema,
  DepartmentCreateInput,
  DepartmentUpdateInput,
  positionCreateSchema,
  positionUpdateSchema,
  PositionCreateInput,
  PositionUpdateInput,
  employeeCreateSchema,
  employeeUpdateSchema,
  EmployeeCreateInput,
  EmployeeUpdateInput
} from '../schema/employee.schema';

const prisma = new PrismaClient();

export class CompanyService {
  async create(company: CompanyCreateInput) {
    try {
      const validatedData = await companyCreateSchema.parseAsync(company);
      const newCompany = await prisma.company.create({
        data: validatedData,
      });
      return await newCompany;
    } catch (error) {
      console.error('Error in people.create:', error);
      throw error;
    }
  }
  async getById(id: number) {
    try {
      const company = await prisma.company.findUnique({
        where: { id },
      });
      return company;
    } catch (error) {
      console.error('Error in people.getById:', error);
      throw error

    }
  }
  async update(id: number, company: CompanyUpdateInput) {
    try {
      const validatedData = await companyUpdateSchema.parseAsync(company);
      const updatedCompany = await prisma.company.update({
        where: { id },
        data: validatedData,
      });
      return await updatedCompany;
    } catch (error) {
      console.error('Error in people.update:', error);
      throw error;
    }
  }
  async getAll() {
    try {
      const companies = await prisma.company.findMany();
      return companies;
    } catch (error) {
      console.error('Error in people.getAll:', error);
      throw error;
    }
  }
}

export class DepartmentService {
  async create(department: DepartmentCreateInput) {
    try {
      const { company, ...validatedData } = await departmentCreateSchema.parseAsync(department);
      const newDepartment = await prisma.department.create({
        data: {
          parentId: validatedData.parentId ? validatedData.parentId : 0,
          name: validatedData?.name,
          status: validatedData?.status,
          companyId: company?.connect.id??0
        },
      });
      return await newDepartment;
    } catch (error) {
      console.error('Error in people.create:', error);
      throw error;
    }
  }
  async update(id: number, department: DepartmentUpdateInput) {
    try {
      const { company, ...validatedData } = await departmentUpdateSchema.parseAsync(department);
      const updatedDepartment = await prisma.department.update({
        where: { id },
        data: {
          parentId: validatedData.parentId ? validatedData.parentId : 0,
          name: validatedData?.name,
          status: validatedData?.status,
          companyId: company?.connect.id??0
        },
      });
      return await updatedDepartment;
    } catch (error) {
      console.error('Error in people.update:', error);
      throw error;
    }
  }
  async getAll() {
    try {
      const departments = await prisma.department.findMany();
      return departments;
    } catch (error) {
      console.error('Error in people.getAll:', error);
      throw error;
    }
  }
  async getById(id: number) {
    try {
      const department = await prisma.department.findUnique({
        where: { id },
      });
      return department;
    } catch (error) {
      console.error('Error in people.getById:', error);
      throw error
    }
  }
}

export class PositionService {
  async create(position: PositionCreateInput) {
    try {
      const { department, ...validatedData } = await positionCreateSchema.parseAsync(position);
      const newPosition = await prisma.position.create({
        data: {
          name: validatedData?.name,
          status: validatedData?.status,
          department: {
            connect: {
              id: department?.id
            }
          }
        },
      });
      return await newPosition;
    } catch (error) {
      console.error('Error in people.create:', error);
      throw error;
    }
  }
  async update(id: number, position: PositionUpdateInput) {
    try {
      const { department, ...validatedData } = await positionUpdateSchema.parseAsync(position);
      const updatedPosition = await prisma.position.update({
        where: { id },
        data: {
          name: validatedData?.name,
          status: validatedData?.status,
          department: {
            connect: {
              id: department?.id
            }
          },
        },
      });
      return await updatedPosition;
    } catch (error) {
      console.error('Error in people.update:', error);
      throw error;
    }
  }
  async getAll() {
    try {
      const positions = await prisma.position.findMany();
      return positions;
    } catch (error) {
      console.error('Error in people.getAll:', error);
      throw error;
    }
  }
  async getById(id: number) {
    try {
      const position = await prisma.position.findUnique({
        where: { id },
      });
      return position;
    } catch (error) {
      console.error('Error in people.getById:', error);
      throw error
    }
  }
}

export class EmployeeService {
  async create(employee: EmployeeCreateInput) {
    try {
      const { ...validatedData } = await employeeCreateSchema.parseAsync(employee);
      const newEmployee = await prisma.employee.create({
        data: {
          id: validatedData?.id as undefined | number,
          positionId: validatedData?.positionId??0,           
          peopleId: validatedData?.peopleId??0,
          status: validatedData?.status??0,
        },
      });
      return await newEmployee;
    } catch (error) {
      console.error('Error in people.create:', error);
      throw error;
    }
  }
  async update(id: number, employee: EmployeeUpdateInput) {
    try {
      const { ...validatedData } = await employeeUpdateSchema.parseAsync(employee);
      const updatedEmployee = await prisma.employee.update({
        where: { id },
        data:
        {
          positionId: validatedData?.positionId??undefined,           
          peopleId: validatedData?.peopleId??undefined,
          status: validatedData?.status??undefined,
        },
      });
      return await updatedEmployee;
    } catch (error) {
      console.error('Error in people.update:', error);
      throw error;
    }
  }
  async getAll() {
    try {
      const employees = await prisma.employee.findMany();
      return employees;
    } catch (error) {
      console.error('Error in people.getAll:', error);
      throw error;
    }
  }
  async getById(id: number) {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id },
      });
      return employee;
    } catch (error) {
      console.error('Error in people.getById:', error);
      throw error
    }
  }
}