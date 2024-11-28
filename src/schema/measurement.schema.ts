import { z } from 'zod';

const sensorTypeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
});
export const sensorCreateSchema = z.object({
  id: z.number().optional(),
  model: z.string().min(1, 'Model is required'),
  brand: z.string().min(1, 'Brand is required'),
  range: z.string().min(1, 'Range is required'),
  sensorType: sensorTypeSchema.optional(),
  companyId: z.number().int().positive(),
});
 
// const sensorObjectValueSchema = z.object({
//   id: z.number().optional(),
//   name: z.string().min(1, 'Name is required'),
//   value: z.string().min(1, 'Value is required'),
// });
const sensorObjectCreateSchema = z.object({
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
  //sensorObject: sensorObjectCreateSchema.optional(),
})

export const sensorMeasurementObjectCreateSchema = z.object({
  //id: z.number().optional(),
  // measurementObject: measurementObjectCreateSchema.optional(),
  // sensorObject: sensorObjectCreateSchema.optional(),
  measurementObjectId: z.number().int().positive(),
  sensorObjectId: z.number().int().positive(),
});
export const measurementObjectUpdateSchema = sensorMeasurementObjectCreateSchema.partial()
export type MeasurementObjectCreateInput = z.infer<typeof sensorMeasurementObjectCreateSchema>;
export type MeasurementObjectUpdateInput = z.infer<typeof measurementObjectUpdateSchema>;

export const sensorMeasurementObjectUpdateSchema = sensorMeasurementObjectCreateSchema.partial()
export type SensorMeasurementObjectCreateInput = z.infer<typeof sensorMeasurementObjectCreateSchema>;
export type SensorMeasurementObjectUpdateInput = z.infer<typeof sensorMeasurementObjectUpdateSchema>;