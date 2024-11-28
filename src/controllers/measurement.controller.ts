import { PrismaClient } from '@prisma/client'
import e, { Request, Response } from 'express'
import { SensorMeasurementObjectService } from '../services/mesurement.service'

const measurementService = new SensorMeasurementObjectService()
export class MeasurementController {
    static async create(req: Request, res: Response) {
        try {
            const created = await measurementService.create(req.body)
            res.status(201).send(created)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }
    }
    static async update(req: Request, res: Response) {
        try {
            //const defunt: PeopleCreateInput = req.body

            const updatedPerson = await measurementService.update(Number(req.params.id), req.body)
            res.status(201).send(updatedPerson)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }

    }
    static async getById(req: Request, res: Response) {
        try {
            const person = await measurementService.getById(Number(req.params.id))
            res.status(201).json(person)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }

    }
    static async getAll(req: Request, res: Response) {
        try {
            const people = await measurementService.getAll(Number(req.params.companyId))
            res.status(201).json(people)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }

    }
   
}