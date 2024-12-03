import { Request, Response } from "express";
import {
  CompanyService,
  DepartmentService,
  PositionService,
  EmployeeService,

} from "../services/employee.services";
const companyService = new CompanyService();
const departmentService = new DepartmentService();
const positionService = new PositionService();
const employeeService = new EmployeeService();
export class EmployeeController {
  static async createCompany(req: Request, res: Response) {
    try {
      const company = await companyService.create(req.body);
      return res.status(201).json(company);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async updateCompany(req: Request, res: Response) {
    try {
      const company = await companyService.update(Number(req.params.id), req.body);
      return res.status(201).json(company);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async getByIdCompany(req: Request, res: Response) {
    try {
      const company = await companyService.getById(Number(req.params.id));
      return res.status(201).json(company);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async getAllCompany(req: Request, res: Response) {
    try {
      const company = await companyService.getAll();
      return res.status(201).json(company);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async createDepartment(req: Request, res: Response) {
    try {
      const department = await departmentService.create(req.body);
      return res.status(201).json(department);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async updateDepartment(req: Request, res: Response) {
    try {
      const department = await departmentService.update(Number(req.params.id), req.body);
      return res.status(201).json(department);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async getByIdDepartment(req: Request, res: Response) {
    try {
      const department = await departmentService.getById(Number(req.params.id));
      return res.status(201).json(department);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async getAllDepartment(req: Request, res: Response) {
    try {
      const department = await departmentService.getAll();
      return res.status(201).json(department);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async createPosition(req: Request, res: Response) {
    try {
      const position = await positionService.create(req.body);
      return res.status(201).json(position);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async updatePosition(req: Request, res: Response) {
    try {
      const position = await positionService.update(Number(req.params.id), req.body);
      return res.status(201).json(position);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async getByIdPosition(req: Request, res: Response) {
    try {
      const position = await positionService.getById(Number(req.params.id));
      return res.status(201).json(position);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async getAllPosition(req: Request, res: Response) {
    try {
      const position = await positionService.getAll();
      return res.status(201).json(position);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async createEmployee(req: Request, res: Response) {
    try {
      const employee = await employeeService.create(req.body);
      return res.status(201).json(employee);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async updateEmployee(req: Request, res: Response) {
    try {
      const employee = await employeeService.update(Number(req.params.id), req.body);
      return res.status(201).json(employee);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async getByIdEmployee(req: Request, res: Response) {
    try {
      const employee = await employeeService.getById(Number(req.params.id));
      return res.status(201).json(employee);
    } catch (error) {
      return res.status(500).json(error);
    }
  }    
  static async getAllEmployee(req: Request, res: Response) {
    try {
      const employee = await employeeService.getAll();
      return res.status(201).json(employee);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}