import {
  sensorObjectValueCreateSchema,
  SensorObjectValueInput
} from '../schema/value.schema'
import { measurementObject, measurementSensorObject } from '../types/measurement.types'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export class SensorObjectValueService {
  // async create(dataValue: SensorObjectValueInput) {
  //   try {
  //     const { sensorObject, ...value } = await sensorObjectValueCreateSchema.parseAsync(dataValue);
  //     const newValue = await prisma.sensorObjectValue.create({
  //       data: {
  //         value: value?.value,
  //         date: value.date,
  //         sensorObject: {
  //           connect: {
  //             id: sensorObject?.id
  //           }
  //         }
  //       }
  //     });
  //     return newValue
  //   } catch (error) {
  //     console.error('Error in people.create:', error);
  //     throw error
  //   }
  // }
  // async getAll(id:number) {
  //   try {
  //     const values = await prisma.measurementSensorObject.findMany({
  //       where: {
  //         measurementObjectId:id
  //       },
  //       include: {
  //         measurementObject: true,
  //         sensorObject: true,          
  //       }
  //     });
  //     return values;
  //   } catch (error) {
  //     console.error('Error in people.getAll:', error);
  //     throw error;
  //   }
  // }
  async createValue(data: measurementObject) {
    console.log(data)
    try {
      const { sensorObjects, ...measurementObject } = data
      console.log(sensorObjects.length)
      const date = new Date()
      for (const value of sensorObjects) {
        const newValue = await prisma.sensorObjectValue.create({
          data: {
            sensorObjectId: value?.sensorObjectId,
            value: value?.value,
            date: date
          }
        });
      }
      return { "ok": true }
    } catch (error) {
      console.error('Error in people.create:', error);
      throw error
    }

  }
  async getByIdMeasurementObjectValue(id: number) {
    try {
      const values = await prisma.measurementSensorObject.findMany({
        select: {
          id: true,
          measurementObjectId: true,
          sensorObjectId: true,  
                  
          measurementObject: {
            select: {
              id: true,
              name: true,
            }
          },
          sensorObject: {
            select: {
              id: true,
              name: true,
             
              sensorObjectValue: {
                select: {
                  id: true,
                  value: true,
                  date: true
                }
              }
            } 
          }
        },
      
      })
      return values
    }catch (error) {
      console.error('Error in people.getAll:', error);
      throw error;
    }

}
}


