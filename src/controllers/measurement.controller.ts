import { PrismaClient } from '@prisma/client'
import e, { Request, Response } from 'express'
import { 
    SensorMeasurementObjectService,
    SensorService,
    MeasurementObjectService,
    SensorObjectService,
 } from '../services/mesurement.service'

const measurementService = new SensorMeasurementObjectService()
const sensorService = new SensorService()
const sensorObjectService = new SensorObjectService()
const measurementObjectService = new MeasurementObjectService()
export class MeasurementController {

    ///////MeasurementSensorObject start//
    static async createMeasurementSensorObject(req: Request, res: Response) {
        try {
            const created = await measurementObjectService.create(req.body)
            res.status(201).send(created)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }
    }
    static async updateMeasurementSensorObject(req: Request, res: Response) {
        try {
            //const defunt: PeopleCreateInput = req.body

            const updatedPerson = await measurementObjectService.update(Number(req.params.id), req.body)
            res.status(201).send(updatedPerson)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }

    }
    static async getByIdMeasurementSensorObject(req: Request, res: Response) {
        try {
            const person = await measurementObjectService.getById(Number(req.params.id))
            res.status(201).json(person)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }

    }
    static async getAllMeasurementSensorObject(req: Request, res: Response) {
        try {
            const people = await measurementObjectService.getAll(Number(req.params.companyId))
            res.status(201).json(people)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }

    }
    ///end MeasurementSensorObject // 

    static async getByIdMeasurementObject(req: Request, res: Response) {
        try {
            const people = await measurementObjectService.getAll(Number(req.params.companyId))
            res.status(201).json(people)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }
    }
    static async getAllMeasurementObject(req: Request, res: Response) {
        try {
            const getall = await measurementObjectService.getAll(Number(req.params.companyId))
            res.status(201).json(getall)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }
    }
    static async createMeasurementObject(req: Request, res: Response) {
        try {
            const created = await measurementObjectService.create(req.body)
            res.status(201).send(created)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }
    }
    static async updateMeasurementObject(req: Request, res: Response) {
        try {
            //const defunt: PeopleCreateInput = req.body

            const updated = await measurementObjectService.update(Number(req.params.id), req.body)
            res.status(201).send(updated)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })        }

    }
    static async getByIdSensorObject(req: Request, res: Response) {
        try {
            const getbyid = await sensorObjectService.getById(Number(req.params.id))
            res.status(201).json(getbyid)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }
    }
    static async getAllSensorObject(req: Request, res: Response) {
        try {
            const getall = await sensorObjectService.getAll(Number(req.params.companyId))
            res.status(201).json(getall)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }
    }
    static async createSensorObject(req: Request, res: Response) {
        try {
            const created = await sensorObjectService.create(req.body)
            res.status(201).send(created)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }
    }
    static async updateSensorObject(req: Request, res: Response) {
        try {
            //const defunt: PeopleCreateInput = req.body

            const updated = await sensorObjectService.update(Number(req.params.id), req.body)
            res.status(201).send(updated)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }

    }


    static async getByIdSensor(req: Request, res: Response) {
        try {
            const getbyid = await sensorService.getById(Number(req.params.id))
            res.status(201).json(getbyid)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }
    }  
    static async getAllSensor(req: Request, res: Response) {
        try {
            const getall = await sensorService.getAll(Number(req.params.companyId))
            res.status(201).json(getall)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }
    }
    static async createSensor(req: Request, res: Response) {
        try {
            const created = await sensorService.create(req.body)
            res.status(201).send(created)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }
    }
    static async updateSensor(req: Request, res: Response) {
        try {
            //const defunt: PeopleCreateInput = req.body

            const updated = await sensorService.update(Number(req.params.id), req.body)
            res.status(201).send(updated)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }

    }
}