import { PrismaClient } from '@prisma/client';
import { 
  People
} from '../types/people.types';
const prisma = new PrismaClient();
export class PeopleController {
  async create(people: People) {
    try {
      const createdPerson = await prisma.people.create({ data: people });
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
