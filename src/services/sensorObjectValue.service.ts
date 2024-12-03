import {sensorObjectValueInput} from '../schema/value.schema'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export class SensorObjectValueService {
  static create(data:sensorObjectValueInput){
    try{
      const newValue = await prisma.sensorObjectValue.create({
        data:{
          
        }
      })
    }
  }
} 