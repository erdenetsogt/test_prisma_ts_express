import experss from 'express';
import {EmployeeController} from '../controllers/employee.controller';
import {AuthMiddleware} from '../middleware/auth.middleware';

const router = experss.Router();

router.get('/employee',AuthMiddleware.verifyToken, EmployeeController.getAllEmployee);    
router.get('/employee/:id',AuthMiddleware.verifyToken, EmployeeController.getByIdEmployee);    
router.post('/employee',AuthMiddleware.verifyToken, EmployeeController.createEmployee);    
router.put('/employee/:id',AuthMiddleware.verifyToken, EmployeeController.updateEmployee);

router.get('/company',AuthMiddleware.verifyToken, EmployeeController.getAllCompany);    
router.get('/company/:id',AuthMiddleware.verifyToken, EmployeeController.getByIdCompany);    
router.post('/company',AuthMiddleware.verifyToken, EmployeeController.createCompany);    
router.put('/company/:id',AuthMiddleware.verifyToken, EmployeeController.updateCompany);

router.get('/department',AuthMiddleware.verifyToken, EmployeeController.getAllDepartment);    
router.get('/department/:id',AuthMiddleware.verifyToken, EmployeeController.getByIdDepartment);    
router.post('/department',AuthMiddleware.verifyToken, EmployeeController.createDepartment);    
router.put('/department/:id',AuthMiddleware.verifyToken, EmployeeController.updateDepartment);

router.get('/position',AuthMiddleware.verifyToken, EmployeeController.getAllPosition);    
router.get('/position/:id',AuthMiddleware.verifyToken, EmployeeController.getByIdPosition);    
router.post('/position',AuthMiddleware.verifyToken, EmployeeController.createPosition);    
router.put('/position/:id',AuthMiddleware.verifyToken, EmployeeController.updatePosition);

export const employeeRouter = router;