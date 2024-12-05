import { PrismaClient } from '@prisma/client'
import e, { Request, Response } from 'express'
import { AuthRequest } from '../types/auth.types'
import { 
    SensorMeasurementObjectService,
    SensorService,
    MeasurementObjectService,
    SensorObjectService,
 } from '../services/mesurement.service'

const measurementSensorObjectService = new SensorMeasurementObjectService()
const sensorService = new SensorService()
const sensorObjectService = new SensorObjectService()
const measurementObjectService = new MeasurementObjectService()
export class MeasurementController {

    ///////MeasurementSensorObject start//
    static async createMeasurementSensorObject(req: AuthRequest, res: Response) {
        try {
            //console.log(req.body)
            const created = await measurementSensorObjectService.create(req.body)
            res.status(201).send(created)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }
    }
    static async updateMeasurementSensorObject(req: AuthRequest, res: Response) {
        try {
            //const defunt: PeopleCreateInput = req.body

            const updatedPerson = await measurementSensorObjectService.update(Number(req.params.id), req.body)
            res.status(201).send(updatedPerson)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }

    }
    static async getByIdMeasurementSensorObject(req: AuthRequest, res: Response) {
        try {
            const person = await measurementSensorObjectService.getById(Number(req.params.id))
            res.status(201).json(person)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }

    }
    static async getAllMeasurementSensorObject(req: AuthRequest, res: Response) {
        try {
            const people = await measurementSensorObjectService.getAll(Number(req.user?.companyId))
            res.status(201).json(people)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }

    }
    ///end MeasurementSensorObject // 

    static async getByIdMeasurementObject(req: AuthRequest, res: Response) {
        try {
            const people = await measurementObjectService.getAll(Number(req.params.id))
            res.status(201).json(people)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }
    }
    static async getAllMeasurementObject(req: AuthRequest, res: Response) {
        try {
            const getall = await measurementObjectService.getAll(Number(req.user?.companyId))
            res.status(201).json(getall)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }
    }
    static async createMeasurementObject(req: AuthRequest, res: Response) {
        try {
            const created = await measurementObjectService.create(req.body)
            res.status(201).send(created)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }
    }
    static async updateMeasurementObject(req: AuthRequest, res: Response) {
        try {
            //const defunt: PeopleCreateInput = req.body

            const updated = await measurementObjectService.update(Number(req.params.id), req.body)
            res.status(201).send(updated)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })        }

    }
    static async getByIdSensorObject(req: AuthRequest, res: Response) {
        try {
            const getbyid = await sensorObjectService.getById(Number(req.params.id))
            res.status(201).json(getbyid)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }
    }
    static async getAllSensorObject(req: AuthRequest, res: Response) {
        try {
            const getall = await sensorObjectService.getAll(Number(req.user?.companyId))
            res.status(201).json(getall)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }
    }
    static async createSensorObject(req: AuthRequest, res: Response) {
        try {
            const created = await sensorObjectService.create(req.body)
            res.status(201).send(created)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }
    }
    static async updateSensorObject(req: AuthRequest, res: Response) {
        try {
            //const defunt: PeopleCreateInput = req.body

            const updated = await sensorObjectService.update(Number(req.params.id), req.body)
            res.status(201).send(updated)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }

    }


    static async getByIdSensor(req: AuthRequest, res: Response) {
        try {
            const getbyid = await sensorService.getById(Number(req.params.id))
            res.status(201).json(getbyid)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }
    }  
    static async getAllSensor(req: AuthRequest, res: Response) {
        try {
            const getall = await sensorService.getAll(Number(req.params.companyId))
            res.status(201).json(getall)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }
    }
    static async createSensor(req: AuthRequest, res: Response) {
        try {
            const created = await sensorService.create(req.body)
            res.status(201).send(created)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }
    }
    static async updateSensor(req: AuthRequest, res: Response) {
        try {
            //const defunt: PeopleCreateInput = req.body

            const updated = await sensorService.update(Number(req.params.id), req.body)
            res.status(201).send(updated)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }

    }
}