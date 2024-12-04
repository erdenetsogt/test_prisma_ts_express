import { Request, Response } from 'express';
import { SensorObjectValueService } from '../services/value.service';
const valueService = new SensorObjectValueService();    

export class ValueController {
    static async createValue(req: Request, res: Response) {
        try {
            const value = await valueService.create(req.body);
            return res.status(201).json(value);
        } catch (error) {
            return res.status(500).json(error);
        } 
    }
    static async getAllValue(req: Request, res: Response) {
        try {
            const value = await valueService.getAll(Number(req.params.id));
            return res.status(201).json(value);
        } catch (error) {
            return res.status(500).json(error);
        } 
    }
}