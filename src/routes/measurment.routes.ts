import express, { Response } from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { AuthRequest } from '../types/auth.types';
import { MeasurementController } from '../controllers/measurement.controller'

const router = express.Router();

// Use the middleware with proper typing

router.post('/measurement-sensor-object', MeasurementController.createMeasurementSensorObject);
router.put('/measurement-sensor-object/:id', MeasurementController.updateMeasurementSensorObject);
router.get('/measurement-sensor-object/:id', MeasurementController.getByIdMeasurementSensorObject);
router.get('/measurement-sensor-object', MeasurementController.getAllMeasurementSensorObject);






export const measurementRouter = router;