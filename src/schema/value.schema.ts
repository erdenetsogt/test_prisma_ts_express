
import { sensorObjectCreateSchema } from "./measurement.schema"
import { sensorMeasurementObjectCreateSchema } from "./measurement.schema";

import {z} from "zod"
export const sensorObjectValueCreateSchema = z.object({
  value: z.number().optional(),
  date: z.string().min(1, 'Date is required'),  
  sensorObject: sensorObjectCreateSchema.optional(),
})

export const sensorMeasurementObjectValueViewSchema = z.object({
  
  id: z.number().optional(),  
  sensorObject: sensorMeasurementObjectCreateSchema.optional().nullable(),
  sensorObjectValue: z.array(sensorObjectValueCreateSchema).optional().nullable(),
  measurementObject: z.array(sensorMeasurementObjectCreateSchema).optional().nullable(),
  })

export const sensorObjectValueUpdateSchema = sensorObjectValueCreateSchema.partial();
export type SensorObjectValueInput = z.infer<typeof sensorObjectValueCreateSchema>  
export type SensorObjectValueUpdate = z.infer<typeof sensorObjectValueUpdateSchema>



