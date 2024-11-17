import { Request, Response } from 'express';
import { PrismaClient,Prisma } from '@prisma/client';
import {  validateCreatePeopleInput, validateUpdatePeopleInput } from '../types/people.types';

import { z } from 'zod';

const prisma = new PrismaClient();

// Query parameter schema for list endpoint
const ListQuerySchema = z.object({
  page: z.string().optional().transform(Number).pipe(z.number().min(1)).default('1'),
  limit: z.string().optional().transform(Number).pipe(z.number().min(1).max(100)).default('10'),
  search: z.string().optional(),
  sortBy: z.enum(['firstName', 'lastName', 'register', 'birthday', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});
const handlePrismaError = (error: any, res: Response) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return res.status(409).json({
          error: 'Unique constraint violation',
          details: error.meta?.target
        });
      case 'P2014':
        return res.status(400).json({
          error: 'Invalid ID provided',
          details: error.meta
        });
      case 'P2003':
        return res.status(400).json({
          error: 'Foreign key constraint failed',
          details: error.meta
        });
      case 'P2025':
        return res.status(404).json({
          error: 'Record not found'
        });
      default:
        console.error('Prisma error:', error);
        return res.status(500).json({
          error: 'Database error',
          code: error.code
        });
    }
  }

  if (error instanceof z.ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: error.errors
    });
  }

  console.error('Unexpected error:', error);
  return res.status(500).json({ error: 'Internal server error' });
};
export class PeopleController {
  // Get paginated list of people with search and sorting
  static async list(req: Request, res: Response) {
    try {
      const { page, limit, search, sortBy, sortOrder } = ListQuerySchema.parse(req.query);
      
      // Build where clause for search
      const whereClause = search ? {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { register: { contains: search, mode: 'insensitive' } },
        ],
      } : {};

      // Build order by clause
      const orderBy = sortBy ? { [sortBy]: sortOrder || 'asc' as Prisma.SortOrder} : { createdAt: 'desc' as Prisma.SortOrder  };

      const skip = (page - 1) * limit;

      // Get total count for pagination
      const total = await prisma.people.count({ where: whereClause });

      // Get paginated results
      const people = await prisma.people.findMany({
        where: whereClause,
        orderBy,
        skip,
        take: limit,
        include: {
          address: true,
          contact: true,
        },
      });

      return res.status(200).json({
        data: people,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Error in people.list:', error);
      return res.status(400).json({ error: 'Invalid request parameters' });
    }
  }

  // Get single person by ID with all relations
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const person = await prisma.people.findUnique({
        where: { id: Number(id) },
        include: {
          address: true,
          contact: true,
          education: true,
          jobDegree: true,
          jobLevel: true,
          relation: true,
          language: true,
          computer: true,
          PeopleDoctor: true,
          PeopleTalent: true,
          PeopleJobEduction: true,
        },
      });

      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }

      return res.status(200).json(person);
    } catch (error) {
      console.error('Error in people.getById:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Create new person
  static async create(req: Request, res: Response) {
    try {
      const validatedData = validateCreatePeopleInput(req.body);

      const person = await prisma.people.create({
        data: validatedData,
        include: {
          address: true,
          contact: true,
        },
      });

      return res.status(201).json(person);
    } catch (error) {
      console.error('Error in people.create:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation error', details: error.errors });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update existing person
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = validateUpdatePeopleInput(req.body);

      const person = await prisma.people.update({
        where: { id: Number(id) },
        data: validatedData,
        include: {
          address: true,
          contact: true,
        },
      });

      return res.status(200).json(person);
    } catch (error) {
      console.error('Error in people.update:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation error', details: error.errors });
      }
      // if (error.code === 'P2025') {
      //   return res.status(404).json({ error: 'Person not found' });
      // }
      return handlePrismaError(error, res);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Delete person
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.people.delete({
        where: { id: Number(id) },
      });

      return res.status(204).send();
    } catch (error) {
      console.error('Error in people.delete:', error);
      return handlePrismaError(error, res);
    }
  }

  // Get person's education history
  static async getEducation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const education = await prisma.peopleEducation.findMany({
        where: { peopleId: Number(id) },
        orderBy: { createdAt: 'desc' },
      });

      return res.status(200).json(education);
    } catch (error) {
      console.error('Error in people.getEducation:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Bulk operations
  static async bulkCreate(req: Request, res: Response) {
    const { people } = req.body;
    
    try {
      const createdPeople = await prisma.$transaction(
        people.map((person: any) => {
          const validatedData = validateCreatePeopleInput(person);
          return prisma.people.create({
            data: validatedData,
            include: {
              address: true,
              contact: true,
            },
          });
        })
      );

      return res.status(201).json(createdPeople);
    } catch (error) {
      console.error('Error in people.bulkCreate:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation error', details: error.errors });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}