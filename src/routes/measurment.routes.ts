import express, { Response } from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { AuthRequest } from '../types/auth.types';
import { MeasurementController } from '../controllers/measurement.controller'

const router = express.Router();

// Use the middleware with proper typing

router.post('/login', MeasurementController.create);
router.put('/register', MeasurementController.update);
router.get('/logout', MeasurementController.getById);
router.get('/refresh', MeasurementController.getAll);



export const measurementRouter = router;