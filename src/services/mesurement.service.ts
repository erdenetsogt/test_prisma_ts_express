import { PrismaClient } from "@prisma/client";
import { measurmentSensorObject } from "../types/measurement.types";
import {
  MeasurementObjectCreateInput,
  MeasurementObjectUpdateInput,
  measurementObjectCreateSchema,
  measurementObjectUpdateSchema,

  sensorCreateSchema,
  sensorUpdateSchema,
  SensorCreateInput,
  SensorUpdateInput,
  sensorMeasurementObjectCreateSchema,
  sensorMeasurementObjectUpdateSchema,
  SensorMeasurementObjectCreateInput,
  SensorMeasurementObjectUpdateInput,

  sensorObjectCreateSchema,
  sensorObjectUpdateSchema,
  SensorObjectCreateInput,
  SensorObjectUpdateInput,
  

} from "../schema/measurement.schema";
import { connect } from "http2";

const prisma = new PrismaClient();

export class SensorMeasurementObjectService {
  async create(measurmentSensorObjectData: SensorMeasurementObjectCreateInput) {
    try {
      
      const validatedData = await sensorMeasurementObjectCreateSchema.parseAsync(measurmentSensorObjectData);
      const {
        sensorObjectId,
        measurementObjectId,
        companyId
      } = validatedData;
      const newMeasurementObject = await prisma.measurementSensorObject.create({
        data: {
          sensorObjectId: sensorObjectId,
          measurementObjectId: measurementObjectId,
          companyId: companyId
        },
      });
      return await newMeasurementObject;
    }catch (error) {
      console.error('Error in people.create:', error);
      throw error;
    }
  }

  async getAll(companyId: number) {
    return prisma.measurementSensorObject.findMany(
    //   {
    //   where: {
    //     measurementObject: {
    //       companyId: companyId
    //     },
    //     sensorObject: {
    //       companyId: companyId
    //     }
    //   },
    //   include: {
    //     sensorObject: true,
    //     measurementObject: true
    //   }
    // }
  )
  }
  async getById(id: number) {
    return prisma.measurementSensorObject.findUnique({
      where: { id },
      include: {
        sensorObject: true,
        measurementObject: true
      }
    });
  }
  async update(id: number, measurmentSensorObjectData: SensorMeasurementObjectUpdateInput) {
    try {
      const validatedData = await sensorMeasurementObjectUpdateSchema.parseAsync(measurmentSensorObjectData);
      const {
        sensorObjectId,
        measurementObjectId
      } = validatedData;
      const updatedMeasurementObject = await prisma.measurementSensorObject.update({
        where: { id },
        data: {
          sensorObjectId: sensorObjectId,
          measurementObjectId: measurementObjectId
        },
      });
      return await updatedMeasurementObject;
    }catch (error) {
      console.error('Error in people.update:', error);
      throw error;
    }
  }
}
export class SensorService{
  async create(sensorData: SensorCreateInput) {
    try {
      console.log(sensorData)
      const validatedData = await sensorCreateSchema.parseAsync(sensorData);
      const { sensorType,...sensor } = validatedData;
      console.log(sensor)
      const newSensor = await prisma.sensor.create({
        data: {          
          model: sensor?.model,
          brand: sensor?.brand,          
          range: sensor?.range,
          companyId: sensor?.companyId,
          sensorType: sensorType?{
            connect: {
              id: sensorType.id
            }
          }:undefined
        },
      });
      return await newSensor;
    }catch (error) {
      console.error('Error in people.create:', error);
      throw error;
    }
  }
  async update(id: number, sensorData: SensorUpdateInput) {
    try {
      const validatedData = await sensorUpdateSchema.parseAsync(sensorData);
      const { sensorType,...sensor } = validatedData;
      const updatedSensor = await prisma.sensor.update({
        where: { id },
        data: {
          model: sensor?.model,
          brand: sensor?.brand,          
          range: sensor?.range,
          companyId: sensor?.companyId,
          sensorType: sensorType?{
            connect: {
              id: sensorType.id
            }
          }:undefined
        },
      });
      return await updatedSensor;
    }catch (error) {
      console.error('Error in people.update:', error);
      throw error;
    }
  }
  async getAll(companyId: number) {
    return prisma.sensor.findMany({
      where: {
        companyId: companyId
      },
      include: {
        sensorType: true
      }
    });
  }
  async getById(id: number) {
    return prisma.sensor.findUnique({
      where: { id },
      include: {
        sensorType: true
      }
    });
  }
}
export class MeasurementObjectService{
  async create(measurementObjectData: MeasurementObjectCreateInput) {
    try {
      const validatedData = await measurementObjectCreateSchema.parseAsync(measurementObjectData);
      //const { ...measurementObject } = validatedData;
      const newMeasurementObject = await prisma.measurementObject.create({
        data: {          
          name: validatedData?.name,  
          companyId: validatedData?.companyId,       
          }        
      });
      return await newMeasurementObject;
    }catch (error) {
      console.error('Error in people.create:', error);
      throw error;
    }
  }
  async update(id: number, measurementObjectData: MeasurementObjectUpdateInput) {
    try {
      const validatedData = await measurementObjectUpdateSchema.parseAsync(measurementObjectData);
      //const { measurementType,...measurementObject } = validatedData;
      const updatedMeasurementObject = await prisma.measurementObject.update({
        where: { id },
        data: {
          name: validatedData?.name,
          companyId: validatedData?.companyId          
        },
      });
      return await updatedMeasurementObject;
    }catch (error) {
      console.error('Error in people.update:', error);
      throw error;
    }   

  }
  async getAll(companyId: number) {
    return prisma.measurementObject.findMany({
      where: {
        companyId: companyId
      },      
    });
  }
  async getById(id: number) {
    return prisma.measurementObject.findUnique({
      where: { id }      
    });
  }
}
export class SensorObjectService{
  async create(sensorObjectData: SensorObjectCreateInput) {
    try {
      const validatedData = await sensorObjectCreateSchema.parseAsync(sensorObjectData);
      const { sensor,...sensorObject } = validatedData;
      const newSensorObject = await prisma.sensorObject.create({
        data: {          
          name: sensorObject?.name,
          description: sensorObject?.description,
          companyId: sensorObject?.companyId,
          sensor: sensor?{
            connect: {
              id: sensor.id
            }
          }:undefined
        },
      });
      return await newSensorObject;
    }catch (error) {
      console.error('Error in people.create:', error);
      throw error;
    }
  }
  async update(id: number, sensorObjectData: SensorObjectUpdateInput) {
    try {
      const validatedData = await sensorObjectUpdateSchema.parseAsync(sensorObjectData);
      const { sensor,...sensorObject } = validatedData;
      const updatedSensorObject = await prisma.sensorObject.update({
        where: { id },
        data: {
          name: sensorObject?.name,
          description: sensorObject?.description,
          companyId: sensorObject?.companyId,
          sensor: sensor?{
            connect: {
              id: sensor.id
            }
          }:undefined
        },
      });
      return await updatedSensorObject;
    }catch (error) {
      console.error('Error in people.update:', error);
      throw error;
    }  

  }
  async getAll(companyId: number) {
    return prisma.sensorObject.findMany({
      where: {
        companyId: companyId
      },
      include: {
        sensor: true
      }
    });
  }
  async getById(id: number) {
    return prisma.sensorObject.findUnique({
      where: { id },
      include: {
        sensor: true
      }
    }); 
  }
}