import { PrismaClient } from '@prisma/client';
import {
  People
} from '../types/people.types';
import { create } from 'domain';
import { createPeopleSchema } from '../schema/peopleSchema';
const prisma = new PrismaClient();
export class PeopleService {
  async create(people: People) {
    try {
      
      const validationPeople = createPeopleSchema.parse(people);
      
      const createdPerson = await prisma.people.create({
        data: {

          firstName: validationPeople.firstName,
          lastName: validationPeople.lastName,
          register: validationPeople.register,
          birthday: validationPeople.birthday,
          birthcityId: validationPeople.birthcityId,
          genderId: validationPeople.genderId,
          ovog: validationPeople.ovog,
          nationalId: validationPeople.nationalId,         
        },        
      });

       
      const findsumid = await prisma.sum.findUnique({where: {id: people.address?.sumId ?? undefined}})
      const findprovinceid = await prisma.province.findUnique({where: {id: people.address?.provinceId ?? undefined}})
       
      const createPeopleAddress = await prisma.peopleAddress.create({
        data: {
          peopleId: createdPerson.id,
          sumId: people.address?.sumId,
          provinceId: people.address?.provinceId,
          homeaddress: people.address?.homeaddress,
          mobile: people.address?.mobile,
          fax: people.address?.fax,
          email: people.address?.email,
          postAddress: people.address?.postAddress,
          contactPerson: people.address?.contactPerson,
          contactMobile: people.address?.contactMobile,
        }
      })


      return createdPerson;
    } catch (error) {
      console.error('Error in people.create:', error);
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const person = await prisma.people.findUnique({ where: { id } });
      return person;
    } catch (error) {
      console.error('Error in people.getById:', error);
      throw error;
    }
  }
  async update(id: number, people: People) {
    try {
      const updatedPerson = await prisma.people.update({
        where: { id },
        data: people,
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
      const people = await prisma.people.findMany();
      return people;
    } catch (error) {
      console.error('Error in people.getAll:', error);
      throw error;
    }
  }
}
