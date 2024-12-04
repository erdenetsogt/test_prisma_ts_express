import {
  sensorObjectValueCreateSchema,
  SensorObjectValueInput
} from '../schema/value.schema'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export class SensorObjectValueService {
  async create(dataValue: SensorObjectValueInput) {
    try {
      const { sensorObject, ...value } = await sensorObjectValueCreateSchema.parseAsync(dataValue);
      const newValue = await prisma.sensorObjectValue.create({
        data: {
          value: value?.value,
          date: value.date,
          sensorObject: {
            connect: {
              id: sensorObject?.id
            }
          }
        }
      });
      return newValue
    } catch (error) {
      console.error('Error in people.create:', error);
      throw error
    }
  }
} 