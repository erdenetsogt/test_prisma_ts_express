
import { sensorObjectCreateSchema } from "./measurement.schema"
import { sensorMeasurementObjectCreateSchema } from "./measurement.schema";

import { z } from "zod"
export const sensorObjectValueCreateSchema = z.object({
  value: z.number().optional(),
  date: z.string().min(1, 'Date is required'),  
  sensorObject: sensorObjectCreateSchema.optional(),
})

export const sensorObject = z.object({
  id: z.number().optional(),
  

})
// export const sensorMeasurementObjectValueViewSchema = z.object({

//   id: z.number().optional(),
//   sensorObject: sensorMeasurementObjectCreateSchema.optional().nullable(),
//   sensorObjectValue: z.array(sensorObjectValueCreateSchema).optional().nullable(),
//   measurementObject: z.array(sensorMeasurementObjectCreateSchema).optional().nullable(),
// })
// export const sensorObjectValuesCreateSchema = z.object({
//   id: z.number().optional(),
//   sensorObject: z.array(z.object({ connect: z.object({ id: z.number().optional() }) })).optional(),

// })

export const sensorObjectValueUpdateSchema = sensorObjectValueCreateSchema.partial();
export type SensorObjectValueInput = z.infer<typeof sensorObjectValueCreateSchema>
export type SensorObjectValueUpdate = z.infer<typeof sensorObjectValueUpdateSchema>

// import { z } from 'zod';
// export const valueCreateSchema = z.object({
//   value: z.number().optional(),
//   date: z.string().min(1, 'Date is required'),
// })
// export const sensorMeasurementObjectValueCreateSchema = z.object({
//   id: z.number().optional(),  
//   sensorObject: z.object({
//     connect: z.object({
//       valueCreateSchema
//     })
//   }),

// })
// export type SensorMeasurementObjectValueInput = z.infer<typeof sensorMeasurementObjectValueCreateSchema>

