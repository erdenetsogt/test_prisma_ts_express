import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import countryData from './contries.json'
import provinceData from './province.json'
import nationalData from './national.json'
import relationData from './relation.json'
import genderData from './gender.json'
import languageData from './language.json'

import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';
import { AuthService } from '../src/services/auth.service';
async function main() {
  // Clean existing data
  await prisma.$transaction([
    prisma.measurementSensorObject.deleteMany(),
    prisma.sensorObjectValue.deleteMany(),
    prisma.sensorObject.deleteMany(),
    prisma.sensor.deleteMany(),
    prisma.sensorType.deleteMany(),
    prisma.employee.deleteMany(),
    prisma.position.deleteMany(),
    prisma.department.deleteMany(),
    prisma.door.deleteMany(),
    prisma.roleModule.deleteMany(),
    prisma.moduleCompany.deleteMany(),
    prisma.module.deleteMany(),
    prisma.userRole.deleteMany(),
    prisma.role.deleteMany(),
    prisma.user.deleteMany(),
    prisma.company.deleteMany(),
    prisma.peopleJobEducation.deleteMany(),
    prisma.peopleTalent.deleteMany(),
    prisma.peopleDoctor.deleteMany(),
    prisma.peopleLanguage.deleteMany(),
    prisma.peopleRelation.deleteMany(),
    prisma.peopleJobLevel.deleteMany(),
    prisma.peopleJobDegree.deleteMany(),
    prisma.peopleEducation.deleteMany(),
    prisma.peopleContact.deleteMany(),
    prisma.peopleAddress.deleteMany(),
    prisma.peopleComputer.deleteMany(),
    prisma.people.deleteMany(),
    prisma.sum.deleteMany(),
    prisma.province.deleteMany(),
    prisma.relation.deleteMany(),
    prisma.national.deleteMany(),
    prisma.gender.deleteMany(),
    prisma.language.deleteMany(),
    prisma.country.deleteMany()
  ])

  // Create base data

  const authService = new AuthService();

  for (const province of provinceData.provinces) {
    await prisma.province.create({
      data: {
        id: province.id,
        value: province.value,
        sums: {
          create: province.sums
        }
      }
    })
  }


  for(const country of countryData.countries){
    await prisma.country.create({
      data: {
        id: country.id,
        value: country.value,        
      }
    })
  }

  for(const national of nationalData.nationals){
    await prisma.national.create({
      data: {
        id: national.id,
        value: national.value,        
      }
    })
  }
  for(const language of languageData.languages){
    await prisma.language.create({
      data: {
        id: language.id,
        value: language.value,        
      }
    })
  }
  for(const gender of genderData.genders){
    await prisma.gender.create({
      data: {
        id: gender.id,
        value: gender.value,        
      }
    })
  }
  for(const relation of relationData.relations){
    await prisma.relation.create({
      data: {
        id: relation.id,
        value: relation.value,        
      }
    })
  }
 

  const province = await prisma.province.findFirst({
    where: { value: 'Улаанбаатар' }
  })

  const sum = await prisma.sum.findFirst({
    where: { value: 'Баянзүрх' }
  })

  
  


  // Create a person
  const person = await prisma.people.create({
    data: {
      firstName: 'Bat',
      lastName: 'Bold',
      register: 'УА95112233',
      birthday: '1995-01-01',
      birthcityId: 1,
      genderId: 1,
      ovog: 'Баатар',
      nationalId: 1,
      address: {
        create: {
          sumId: sum!.id,
          provinceId: province!.id,
          homeaddress: '1-р хороо, 2-р байр',
          mobile: '99119911',
          email: 'bat.bold@example.com',
          contactPerson: 'Болд',
          contactMobile: '99229922'
        }
      },
      contact: {
        create: {
          contactId: 1,
          value: '99119911'
        }
      },
      education: {
        create: {
          school: 'Монгол Улсын Их Сургууль',
          start: new Date('2013-09-01'),
          end: new Date('2017-06-01'),
          cerf: 'Bachelor Degree'
        }
      }
    }
  })

  // Create company and related structures
  const company = await prisma.company.create({
    data: {
      name: 'Example Company LLC',
      doors: {
        create: {
          name: 'Main Entrance',
          ipAddress: '192.168.1.100'
        }
      }
    }
  })

  // Create department structure
  const department = await prisma.department.create({
    data: {
      name: 'IT Department',
      companyId: company.id,
      status: 1,
      parentId: null,
      position: {
        create: {
          name: 'Software Developer',
          status: 1,
          
          employee: {
            create: {
              peopleId: person.id,
              status: 1,
              
            }
          }
        }
      }
    }

  })
  
  const hashedPassword =  await bcrypt.hash('Mongol@123', 10);
  // Create user and roles
  const user = await prisma.user.create({
    data: {
      email: 'erdenetsogt@gmail.com',
      password: hashedPassword,
      status: 1,
      peopleId: person.id,
      companyId: company.id
    }
  })

  const role = await prisma.role.create({
    data: {
      name: 'Admin',
      companyId: company.id,
      permissions: ['{"Admin":"full"}'],
      userRole: {
        create: {
          userId: user.id
          
        }
      }
    }
  })

  // Create modules and permissions
  const module = await prisma.module.create({
    data: {
      name: 'UserManagement',
      description: 'User management module'
    }
  })

  const moduleCompany = await prisma.moduleCompany.create({
    data: {
      moduleId: module.id,
      companyId: company.id,
      enable: true,
      roleModule: {
        create: {
          roleId: role.id,
          read: true,
          write: true,
          update: true
        }
      }
    }
  })

  // Create sensor related data
  const sensorType = await prisma.sensorType.create({
    data: {
      typeName: 'Temperature'
    }
  })

  const sensor = await prisma.sensor.create({
    data: {
      model: 'TMP-100',
      brand: 'SensorTech',
      range: '-40°C to 80°C',
      sensorTypeId: sensorType.id,
      companyId: company.id,
      sensorObject: {
        create: {
          name: 'Room Temperature Sensor',
          companyId: company.id,
          description: 'Main office room temperature sensor',
          sensorObjectValue: {
            create: {
              value: 23.5,
              date: new Date()
            }
          }
        }
      }
    }
  })
  const sensorObjectId = await prisma.sensorObject.findFirst({
    where: {
      name: 'Room Temperature Sensor',
      description: 'Main office room temperature sensor'
    }
  })
  const measurementObject = await prisma.measurementObject.create({
    data: {
      name: 'Main Office',
      location: '3rd Floor',
      description: 'Main office area',
      companyId: company.id
    }
  })

  await prisma.measurementSensorObject.create({
    data: {
      measurementObjectId: measurementObject.id,
      sensorObjectId: sensorObjectId!.id,
      companyId: company.id
    }
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })