import { PrismaClient } from "@prisma/client";
import { measurmentSensorObject } from "../types/measurement.types";
import {
  MeasurementObjectCreateInput,
  MeasurementObjectUpdateInput,
  measurementObjectCreateSchema,
  measurementObjectUpdateSchema,

  sensorMeasurementObjectCreateSchema,
  sensorMeasurementObjectUpdateSchema,
  SensorMeasurementObjectCreateInput,
  SensorMeasurementObjectUpdateInput
} from "../schema/measurement.schema";

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