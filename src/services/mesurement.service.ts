import { PrismaClient } from "@prisma/client";
import { measurmentSensorObject  } from "../types/measurement.types";
import { SensorMeasurementObjectCreateInput,
  SensorMeasurementObjectUpdateInput,
  sensorMeasurementObjectCreateSchema,
  sensorMeasurementObjectUpdateSchema } from "../schema/measurement.schema";

const prisma = new PrismaClient();

export class SensorMeasurementObjectService {
  async createMeasurementObject(data: measurmentSensorObject) {
    const validatedData = await sensorMeasurementObjectCreateSchema.parseAsync(data);
    const { measurementObject, sensorObject } = validatedData;
    const sensorMeasurementObject = await prisma.sensorMeasurementObject.create({ 
      data:

     });
    return measurementObject;
  }
}