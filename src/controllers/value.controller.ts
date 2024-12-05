import { Request, Response } from 'express';

import { SensorObjectValueService } from '../services/value.service';
const valueService = new SensorObjectValueService();    

export class ValueController {
    static async createValue(req: Request, res: Response) {
        try {
            const value = await valueService.createValue(req.body);
            return res.status(201).json(value);
        } catch (error) {
            return res.status(500).json(error);
        } 
    }
    static async getByIdMeasurementObject(req: Request, res: Response) {
        
        try {
           
            const value = await valueService.getByIdMeasurementObjectValue(Number(req.params.id));
            return res.status(201).json(value);
        } catch (error) {
            return res.status(500).json(error);
        } 
    }
}