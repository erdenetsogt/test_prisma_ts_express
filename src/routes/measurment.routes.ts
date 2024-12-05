import express, { Response } from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { MeasurementController } from '../controllers/measurement.controller'
import { ValueController } from '../controllers/value.controller';
const router = express.Router();

// Use the middleware with proper typing

router.post('/measurement-sensor-object',AuthMiddleware.verifyToken, MeasurementController.createMeasurementSensorObject);
router.put('/measurement-sensor-object/:id',AuthMiddleware.verifyToken, MeasurementController.updateMeasurementSensorObject);
router.get('/measurement-sensor-object/:id',AuthMiddleware.verifyToken, MeasurementController.getByIdMeasurementSensorObject);
router.get('/measurement-sensor-object',AuthMiddleware.verifyToken, MeasurementController.getAllMeasurementSensorObject);

router.post('/measurement-object',AuthMiddleware.verifyToken, MeasurementController.createMeasurementObject);
router.put('/measurement-object/:id',AuthMiddleware.verifyToken, MeasurementController.updateMeasurementObject);
router.get('/measurement-object/:id',AuthMiddleware.verifyToken, MeasurementController.getByIdMeasurementObject);
router.get('/measurement-object',AuthMiddleware.verifyToken, MeasurementController.getAllMeasurementObject);

router.post('/sensor-object', MeasurementController.createSensorObject);
router.put('/sensor-object/:id',AuthMiddleware.verifyToken, MeasurementController.updateSensorObject);
router.get('/sensor-object/:id',AuthMiddleware.verifyToken, MeasurementController.getByIdSensorObject);
router.get('/sensor-object',AuthMiddleware.verifyToken, MeasurementController.getAllSensorObject);

router.post('/sensor',AuthMiddleware.verifyToken, MeasurementController.createSensor);
router.put('/sensor/:id',AuthMiddleware.verifyToken, MeasurementController.updateSensor);
router.get('/sensor/:id',AuthMiddleware.verifyToken, MeasurementController.getByIdSensor);
router.get('/sensor',AuthMiddleware.verifyToken, MeasurementController.getAllSensor);

router.post('/value', ValueController.createValue);
router.get('/value/:id', ValueController.getByIdMeasurementObject);





export const measurementRouter = router;