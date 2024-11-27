import { PrismaClient } from '@prisma/client';
import {
  PeopleCreateInput
} from '../types/people.types';
import { create } from 'domain';
import { createPeopleSchema, createPeopleAddressSchema, createPeopleContactSchema, sumSchema, provinceSchema } from '../schema/peopleSchema';
import { connect } from 'http2';
const prisma = new PrismaClient();
export class PeopleService {
  async create(people: PeopleCreateInput) {
    try {
      const validationPeople = await createPeopleSchema.parseAsync(people);
      const validationAddress = await createPeopleAddressSchema.parseAsync(people.address);
      const validationContact = await createPeopleContactSchema.parseAsync(people.contact);
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
              provinceId: validationAddress?.provinceId!,
              sumId: validationAddress?.sumId!,
              homeaddress: validationAddress!.homeaddress,
              mobile: validationAddress!.mobile,
              fax: validationAddress!.fax,
              email: validationAddress!.email,
              postAddress: validationAddress!.postAddress,
            }
          },
          contact: {
            create: {
              contactId: validationContact!.contactId,
              value: validationContact!.value,
            }
          },
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
          contact: true
        }
      });
      return person;
    } catch (error) {
      console.error('Error in people.getById:', error);
      throw error;
    }
  }
  async update(id: number, people: PeopleCreateInput) {
    const validationPeople = createPeopleSchema.parse(people);
    const validationAddress = createPeopleAddressSchema.parse(people.address);
    const validationContact = createPeopleContactSchema.parse(people.contact);
    try {
      const updatedPerson = await prisma.people.update({
        where: { id },
        data: {
          ...validationPeople,
          address: validationAddress
            ? {
              upsert: {
                create: {
                  provinceId: validationAddress?.provinceId!,
                  sumId: validationAddress?.sumId!,
                  homeaddress: validationAddress!.homeaddress,
                  mobile: validationAddress!.mobile,
                  fax: validationAddress!.fax,
                  email: validationAddress!.email,
                  postAddress: validationAddress!.postAddress,
                },

                update: {
                  provinceId: validationAddress?.provinceId!,
                  sumId: validationAddress?.sumId!,
                  homeaddress: validationAddress!.homeaddress,
                  mobile: validationAddress!.mobile,
                  fax: validationAddress!.fax,
                  email: validationAddress!.email,
                  postAddress: validationAddress!.postAddress,
                }
              },
            } : undefined,
          contact: validationContact ?{
            upsert: {
              create: {
                contactId: validationContact!.contactId,
                value: validationContact!.value,
              },
              update: {
                contactId: validationContact!.contactId,
                value: validationContact!.value,
              }
            }
          }:undefined,
          

        },
        include: {
          address: true,
          contact: true
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
