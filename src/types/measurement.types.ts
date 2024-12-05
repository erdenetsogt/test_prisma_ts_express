// export type measurmentSensorObject = {
//   id: number;
//   measurementObject: measurmentObject,
//   sensorObject: sensorObject
// }
// type measurmentObject = {
//   id: number,
//   name?: string,  
//   description?: string,
//   companyId?: number,  
// }

// type sensorObject = {
//   id: number,
//   name?: string,
//   description?: string,
//   companyId?: number,
//   sensor?: sensor,
//   sensorObjectValue: sensorObjectValue[],
// }

// type sensorObjectValue = {
//   id: number,  
//   value: number,
//   //value: float,
//   data: string,
// }

// type sensor = {
//   id: number,
//   model?: string,
//   brand?: string,
//   range?: string,
//   sensorType?: sensorType,
//   companyId?: number,
// }
// type sensorType = {
//   id: number,
//   name: string, 
// }


export type measurementObject = { 
  sensorObjects: sensorObject[],
}
type sensorObject = {
  sensorObjectId: number,
  value: number,
  date: string,
}

export type measurementSensorObject = {
  id: number,
  measurementObject:{
    id:number,
    name: string
  },
  sensorObject:{
    id: number,
    name:string,
    sensorObjectValue: {
      id: number,
      value: number,
      date: string,
    }
  }
}