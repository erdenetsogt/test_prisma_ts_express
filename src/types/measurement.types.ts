export type measurmentSensorObject = {
  id: number;
  measurementObject: measurmentObject,
  sensorObject: sensorObject
}
type measurmentObject = {
  id: number,
  name: string,
  sensorObjects: measurmentSensorObject[]
}

type sensorObject = {
  id: number,
  name: string,
  description: string,
  companyId: number,
  sensor: sensor
  sensorObjectValues: sensorObjectValue[]
}

type sensorObjectValue = {
  id: number,  
  value: number,
  //value: float,
  data: string,
}

type sensor = {
  id: number,
  model: string,
  brand: string,
  range: string,
  sensorType: sensorType,
  
}
type sensorType = {
  id: number,
  name: string, 
}