import { PrismaClient } from '@prisma/client'
import e, { Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { MeasurementService } from '../services/people.service'
import { z } from 'zod'
import { MeasurementCreateInput } from '../types/measurement.types'

const prisma = new PrismaClient()
const measureentService = new MeasurementService()
export class PeopleController {
    static async create(req: Request, res: Response) {
        try {
            const createdPerson = await measureentService.create(req.body)
            res.status(201).send(createdPerson)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }
    }
    static async update(req: Request, res: Response) {
        try {
            //const defunt: PeopleCreateInput = req.body

            const updatedPerson = await measureentService.update(Number(req.params.id), req.body)
            res.status(201).send(updatedPerson)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })

        }

    }
    static async getById(req: Request, res: Response) {
        try {
            const person = await measureentService.getById(Number(req.params.id))
            res.status(201).json(person)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }

    }
    static async getAll(req: Request, res: Response) {
        try {
            const people = await measureentService.getAll()
            res.status(201).json(people)
        } catch (error) {
            res.status(400).json({ error: 'error', details: error })
        }

    }
   
}