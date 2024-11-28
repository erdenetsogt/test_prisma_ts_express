import { z } from 'zod';

const sensorTypeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
});
const sensorSchema = z.object({
  id: z.number().optional(),
  model: z.string().min(1, 'Model is required'),
  brand: z.string().min(1, 'Brand is required'),
  range: z.string().min(1, 'Range is required'),
  sensorType: sensorTypeSchema.optional(),
});
 
const sensorObjectValueSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  value: z.string().min(1, 'Value is required'),
});
const sensorObjectSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  companyId: z.number().int().positive(),
  sensor: sensorSchema.optional(),
  sensorObjectValues: z.array(sensorObjectValueSchema).optional()
})
const measurementObjectSchema = z.object({
  id: z.number().optional(),
  name:z.string().min(1, 'Name is required'),
  sensorObject: sensorObjectSchema.optional(),
})
export const sensorMeasurementObjectCreateSchema = z.object({
  id: z.number().optional(),
  measurementObject: measurementObjectSchema.optional(),
  sensorObjectSchema: sensorObjectSchema.optional(),
});
export const sensorMeasurementObjectUpdateSchema = sensorMeasurementObjectCreateSchema.partial()

export type SensorMeasurementObjectCreateInput = z.infer<typeof sensorMeasurementObjectCreateSchema>;
export type SensorMeasurementObjectUpdateInput = z.infer<typeof sensorMeasurementObjectUpdateSchema>;