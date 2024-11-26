import { PrismaClient } from '@prisma/client';
import {
  PeopleCreateInput
} from '../types/people.types';
import { create } from 'domain';
import { createPeopleSchema, createPeopleAddressSchema,sumSchema,provinceSchema } from '../schema/peopleSchema';
import { connect } from 'http2';
const prisma = new PrismaClient();
export class PeopleService {
  async create(validationPeople: PeopleCreateInput) {
    try {

      //const validationPeople = createPeopleSchema.parse(people);
      //const validationPeopleAddress = createPeopleAddressSchema.parse(people.address);
      //const validationSum =  sumSchema.parse(people.address?.sum);//sumSchema
      //const validationProvice =  provinceSchema.parse(people.address?.province);//sumSchema
      
      
      // const sum = await prisma.sum.findUnique({
      //   where: {
      //     id: validationPeople.address!.sumId
      //   }
      // })
      // const province = await prisma.province.findUnique({
      //   where: {
      //     id: validationPeople.address!.provinceId
      //   }
      // })
      console.log(validationPeople)
      
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

          address: {
            create: {  
              provinceId: validationPeople.address?.provinceId!,            
              sumId:validationPeople.address?.sumId!,              
              homeaddress: validationPeople.address!.homeaddress,
              mobile: validationPeople.address!.mobile,
              fax: validationPeople.address!.fax,
              email: validationPeople.address!.email,
              postAddress: validationPeople.address!.postAddress,
            }
          }
        },
        
      });
      console.log("createdPerson",createdPerson.id);
      


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
  async update(id: number, people: PeopleCreateInput) {
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
