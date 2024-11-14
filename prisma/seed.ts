import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import provinceData from './province.json'
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
    prisma.peopleJobEduction.deleteMany(),
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
  ])

  // Create base data

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
      startdate: new Date(),
      status: 1,
      parentId: null,
      Position: {
        create: {
          name: 'Software Developer',
          status: 1,
          startdate: new Date(),
          Employee: {
            create: {
              peopleId: person.id,
              status: 1,
              startdate: new Date()
            }
          }
        }
      }
    }

  })

  // Create user and roles
  const user = await prisma.user.create({
    data: {
      email: 'bat.bold@example.com',
      password: 'hashedpassword123',
      status: 1,
      peopleId: person.id,
      companyId: company.id
    }
  })

  const role = await prisma.role.create({
    data: {
      name: 'Admin',
      companyId: company.id,
      UserRole: {
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
      RoleModule: {
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
      SensorObject: {
        create: {
          name: 'Room Temperature Sensor',
          companyId: company.id,
          description: 'Main office room temperature sensor',
          SensorObjectValue: {
            create: {
              value: 23.5,
              date: new Date()
            }
          }
        }
      }
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
      measurmentObjectId: measurementObject.id,
      sensorObjectId: 1,
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