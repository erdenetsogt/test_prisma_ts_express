import { PrismaClient } from '@prisma/client';
import {
  PeopleCreateInput,
} from '../types/people.types';
import {
  peopleCreateSchema,
  peopleUpdateSchema
  //createPeopleAddressSchema,
  //createPeopleContactSchema,
} from '../schema/peopleSchema';

const prisma = new PrismaClient();
export class PeopleService {
  async create(people: PeopleCreateInput) {
    try {
      const validationPeople = await peopleCreateSchema.parseAsync(people);
      const {
        address,
        contact,
        relation,
        education,
        jobDegree,
        jobLevel,
        jobEducation,
        language,
        doctor,
        computer,
        talent,
        ...peopleData
      } = validationPeople;
      console.log(relation)
      const createdPerson = await prisma.people.create({
        data: {
          ...peopleData,
          address: address ? {
            create: address
          } : undefined,
          contact: contact ? {
            create: contact
          } : undefined,

          relation: relation ? {
            create: relation.map(relation => ({
              ...relation,

            }))
          } : undefined,

          education: education ? {
            create: education.map(education => ({
              ...education,
            }))
          } : undefined,

          jobDegree: jobDegree ? {
            create: jobDegree.map(jobDegree => ({
              ...jobDegree,
            }))
          } : undefined,

          jobLevel: jobLevel ? {
            create: jobLevel.map(jobLevel => ({
              ...jobLevel,
            }))
          } : undefined,
          jobEducation: jobEducation ? {
            create: jobEducation.map(jobEducation => ({
              ...jobEducation,
            }))
          } : undefined,

          language: language ? {
            create: language.map(language => ({
              ...language,
            }))
          } : undefined,

          doctor: doctor ? {
            create: doctor.map(doctor => ({
              ...doctor,
            }))
          } : undefined,

          computer: computer ? {
            create: computer.map(computer => ({
              ...computer,
            }))
          } : undefined,

          talent: talent ? {
            create: talent.map(talent => ({
              ...talent,
            }))
          } : undefined,

        }
      });
      return await this.getById(createdPerson.id);
    } catch (error) {
      console.error('Error in people.create:', error);
      throw error;
    }
  }


  async getById(id: number) {
    try {
      const person = await prisma.people.findUnique({
        where: { id },
        include: {
          address: true,
          contact: true,
          relation: true,
        }
      });
      return person;
    } catch (error) {
      console.error('Error in people.getById:', error);
      throw error;
    }
  }
  async update(id: number, people: PeopleCreateInput) {
    const validationPeople = await peopleUpdateSchema.parseAsync(people);
    const {
      address,
      contact,
      relation,
      education,
      jobDegree,
      jobLevel,
      jobEducation,
      language,
      doctor,
      computer,
      talent,
      ...peopleData
    } = validationPeople;
    try {
      const updatedPerson = await prisma.people.update({
        where: { id },
        data: {
          ...peopleData,
          address: address ? {
            upsert: {
              create: address,
              update: address
            }
          } : undefined,
          contact: contact ? {
            upsert: {
              create: contact,
              update: contact
            }
          } : undefined,

          relation: relation ? {
            upsert: relation.map(relation => ({
              where: {
                id: relation.id || 0
              },

              update: {
                ...relation,

              },
              create: {
                ...relation,

              }
            }))
          } : undefined,
          education: education ? {
            upsert: education.map(education => ({
              where: {
                id: education.id || 0
              },

              update: {
                ...education,

              },
              create: {
                ...education,

              }
            }))
          } : undefined,
          jobDegree: jobDegree ? {
            upsert: jobDegree.map(jobDegree => ({
              where: {
                id: jobDegree.id || 0
              },

              update: {
                ...jobDegree,

              },
              create: {
                ...jobDegree,

              }
            }))
          } : undefined,
          jobLevel: jobLevel ? {
            upsert: jobLevel.map(jobLevel => ({
              where: {
                id: jobLevel.id || 0
              },

              update: {
                ...jobLevel,

              },
              create: {
                ...jobLevel,

              }
            }))
          } : undefined,
          jobEducation: jobEducation ? {
            upsert: jobEducation.map(jobEducation => ({
              where: {
                id: jobEducation.id || 0
              },

              update: {
                ...jobEducation,

              },
              create: {
                ...jobEducation,

              }
            }))
          } : undefined,
          language: language ? {
            upsert: language.map(language => ({
              where: {
                id: language.id || 0
              },

              update: {
                ...language,

              },
              create: {
                ...language,

              }
            }))
          } : undefined,
          doctor: doctor ? {
            upsert: doctor.map(doctor => ({
              where: {
                id: doctor.id || 0
              },

              update: {
                ...doctor,

              },
              create: {
                ...doctor,

              }
            }))
          } : undefined,
          computer: computer ? {
            upsert: computer.map(computer => ({
              where: {
                id: computer.id || 0
              },

              update: {
                ...computer,

              },
              create: {
                ...computer,

              }
            }))
          } : undefined,
          talent: talent ? {
            upsert: talent.map(talent => ({
              where: {
                id: talent.id || 0
              },

              update: {
                ...talent,

              },
              create: {
                ...talent,
              }
            }))
          } : undefined,
        },
        include: {
          address: true,
          contact: true,
          relation: true
        }
      });
      return updatedPerson;
    } catch (error) {
      console.error('Error in people.update:', error);
      throw error;
    }
  }
  async delete(id: number) {
    try {
      const deletedPerson = await prisma.people.delete({ where: { id } });
      return deletedPerson;
    } catch (error) {
      console.error('Error in people.delete:', error);
      throw error;
    }
  }
  async getAll() {
    try {
      const people = await prisma.people.findMany({
        include: {
          address: true,
          contact: true
        }
      });
      return people;
    } catch (error) {
      console.error('Error in people.getAll:', error);
      throw error;
    }
  }
}
