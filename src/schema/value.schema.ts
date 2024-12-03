
import { SensorObjectCreateInput } from "./measurement.schema"
import z from "zod"
export type sensorObjectValueInput = {
  id: number,
  value: number,
  //value: float,
  data: string,
  sensorObject: SensorObjectCreateInput

}


