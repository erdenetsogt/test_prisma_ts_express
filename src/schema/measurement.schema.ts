import { z } from 'zod';

const sensorTypeSchema = z.object({
  id: z.number().optional(),
  typeName: z.string().min(1, 'Name is required'),
});
export const sensorCreateSchema = z.object({
  id: z.number().optional(),
  model: z.string().min(1, 'Model is required'),
  brand: z.string().min(1, 'Brand is required'),
  range: z.string().min(1, 'Range is required'),
  sensorType: sensorTypeSchema.optional(),
  companyId: z.number().int().positive(),
});
 
export const sensorObjectCreateSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  companyId: z.number().int().positive(),
  sensor: sensorCreateSchema.optional(),
  //sensorObjectValue: z.array(sensorObjectValueSchema).optional()
})
export const measurementObjectCreateSchema = z.object({
  id: z.number().optional(),
  name:z.string().min(1, 'Name is required'),
  companyId: z.number().int().positive(),
  //sensorObject: sensorObjectCreateSchema.optional(),
})

export const sensorMeasurementObjectCreateSchema = z.object({
  //id: z.number().optional(),
  // measurementObject: measurementObjectCreateSchema.optional(),
  // sensorObject: sensorObjectCreateSchema.optional(),
  measurementObjectId: z.number().int().positive(),
  sensorObjectId: z.number().int().positive(),
  companyId: z.number().positive(),
});
export const measurementObjectUpdateSchema = measurementObjectCreateSchema.partial()
export type MeasurementObjectCreateInput = z.infer<typeof measurementObjectCreateSchema>;
export type MeasurementObjectUpdateInput = z.infer<typeof measurementObjectUpdateSchema>;

export const sensorMeasurementObjectUpdateSchema = sensorMeasurementObjectCreateSchema.partial()
export type SensorMeasurementObjectCreateInput = z.infer<typeof sensorMeasurementObjectCreateSchema>;
export type SensorMeasurementObjectUpdateInput = z.infer<typeof sensorMeasurementObjectUpdateSchema>;

export const sensorObjectUpdateSchema = sensorObjectCreateSchema.partial()
export type SensorObjectCreateInput = z.infer<typeof sensorObjectCreateSchema>;
export type SensorObjectUpdateInput = z.infer<typeof sensorObjectUpdateSchema>;

export const sensorUpdateSchema = sensorCreateSchema.partial()
export type SensorCreateInput = z.infer<typeof sensorCreateSchema>;
export type SensorUpdateInput = z.infer<typeof sensorUpdateSchema>;