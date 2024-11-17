import { z } from 'zod';

// Base interfaces for related models
interface PeopleAddress {
  peopleId: number;
  // Add other address fields
}

interface PeopleContact {
  peopleId: number;
  // Add other contact fields
}

interface PeopleEducation {
  peopleId: number;
  // Add other education fields
}

interface PeopleJobDegree {
  peopleId: number;
  // Add other job degree fields
}

interface PeopleJobLevel {
  peopleId: number;
  // Add other job level fields
}

interface PeopleRelation {
  peopleId: number;
  // Add other relation fields
}

interface PeopleLanguage {
  peopleId: number;
  // Add other language fields
}

interface PeopleComputer {
  peopleId: number;
  // Add other computer fields
}

interface PeopleDoctor {
  peopleId: number;
  // Add other doctor fields
}

interface PeopleTalent {
  peopleId: number;
  // Add other talent fields
}

interface PeopleJobEduction {
  peopleId: number;
  // Add other job education fields
}

interface User {
  peopleId: number;
  // Add other user fields
}

interface Employee {
  peopleId: number;
  // Add other employee fields
}

// Main People interface
export interface People {
  id: number;
  firstName: string;
  lastName: string;
  register: string;
  birthday: string;
  birthcityId: number;
  genderId: number;
  ovog: string;
  nationalId: number;
  createdAt: Date;
  updatedAt: Date;
  address?: PeopleAddress;
  contact?: PeopleContact;
  // education?: PeopleEducation[];
  // jobDegree?: PeopleJobDegree[];
  // jobLevel?: PeopleJobLevel[];
  // relation?: PeopleRelation[];
  // language?: PeopleLanguage[];
  // computer?: PeopleComputer[];
  // PeopleDoctor?: PeopleDoctor[];
  // PeopleTalent?: PeopleTalent[];
  // PeopleJobEduction?: PeopleJobEduction[];
  // User?: User[];
  // Employee?: Employee[];
}

// Zod schema for validation

const PeopleAddressCreateSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1)
});

// Contact sub-schema
const PeopleContactCreateSchema = z.object({
  // Add your contact fields here
  // For example:
  phone: z.string().min(1),
  email: z.string().email()
});
export const PeopleSchema = z.object({
  id: z.number().int().positive(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  register: z.string().min(1),
  birthday: z.string(), // Consider using a more specific date format validation
  birthcityId: z.number().int().positive(),
  genderId: z.number().int().positive(),
  ovog: z.string().min(1),
  nationalId: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
  address: PeopleAddressCreateSchema.optional().transform(data => 
    data ? { create: data } : undefined
  ),
  contact: PeopleContactCreateSchema.optional().transform(data => 
    data ? { create: data } : undefined
  ),
  



  //education: z.array(z.object({})).optional(),
  //jobDegree: z.array(z.object({})).optional(),
  //jobLevel: z.array(z.object({})).optional(),
  //relation: z.array(z.object({})).optional(),
  //language: z.array(z.object({})).optional(),
  //computer: z.array(z.object({})).optional(),
  //PeopleDoctor: z.array(z.object({})).optional(),
  //PeopleTalent: z.array(z.object({})).optional(),
  //PeopleJobEduction: z.array(z.object({})).optional(),
  //User: z.array(z.object({})).optional(),
  //Employee: z.array(z.object({})).optional(),
});


export type PeopleCreate = z.infer<typeof PeopleSchema>;


// Type for creating a new person (omitting auto-generated fields)
export type CreatePeopleInput = Omit<
  People,
  'id' | 'createdAt' | 'updatedAt'
>;

// Type for updating a person
export type UpdatePeopleInput = Partial<CreatePeopleInput>;


// export const validateCreatePeopleInput = (data: unknown): Prisma.PeopleCreateInput => {
//   return validateCreatePeopleInput.parse(data) as Prisma.PeopleCreateInput;
// };

// export const validateUpdatePeopleInput = (data: unknown): Prisma.PeopleUpdateInput => {
//   return UpdatePeopleSchema.parse(data) as Prisma.PeopleUpdateInput;
// };


// Validation functions
export const validatePeople = (data: unknown): People => {
  return PeopleSchema.parse(data);
};

export const validateCreatePeopleInput = (data: unknown): CreatePeopleInput => {
  const { id, createdAt, updatedAt, ...createSchema } = PeopleSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }).parse(data);
  return createSchema;
};

export const validateUpdatePeopleInput = (data: unknown): UpdatePeopleInput => {
  const { id, createdAt, updatedAt, ...updateSchema } = PeopleSchema.partial()
    .omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    })
    .parse(data);
  return updateSchema;
};