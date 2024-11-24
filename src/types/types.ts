import { z } from 'zod';

// Base schemas for related models
const PeopleAddressSchema = z.object({
  homeaddress: z.string().min(1, 'Home address is required'),
  mobile: z.string().min(8, 'Mobile number must be at least 8 characters'),        
  fax:z.string().min(8, 'Fax number must be at least 8 characters'),       
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  postAddress: z.string().min(1, 'Post address is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  contactMobile: z.string().min(8, 'Contact mobile number must be at least 8 characters'), 
});

const PeopleContactSchema = z.object({
  value: z.string().min(8, 'Phone number must be at least 8 characters'),  

});

const PeopleEducationSchema = z.object({
  schoolId: z.number().int().positive(),
  degreeId: z.number().int().positive(),
  graduatedYear: z.string(),
  gpa: z.number().optional(),
});

const PeopleJobDegreeSchema = z.object({
  degreeId: z.number().int().positive(),
  organizationId: z.number().int().positive(),
  receivedDate: z.string(),
  expireDate: z.string().optional(),
});

const PeopleJobLevelSchema = z.object({
  levelId: z.number().int().positive(),
  organizationId: z.number().int().positive(),
  receivedDate: z.string(),
  expireDate: z.string().optional(),
});

const PeopleRelationSchema = z.object({
  relationTypeId: z.number().int().positive(),
  relatedPeopleId: z.number().int().positive(),
});

const PeopleLanguageSchema = z.object({
  languageId: z.number().int().positive(),
  levelId: z.number().int().positive(),
  certificateNo: z.string().optional(),
  receivedDate: z.string().optional(),
});

const PeopleComputerSchema = z.object({
  skillId: z.number().int().positive(),
  levelId: z.number().int().positive(),
  certificateNo: z.string().optional(),
  receivedDate: z.string().optional(),
});

const PeopleDoctorSchema = z.object({
  specialtyId: z.number().int().positive(),
  licenseNo: z.string(),
  receivedDate: z.string(),
  expireDate: z.string().optional(),
});

const PeopleTalentSchema = z.object({
  talentId: z.number().int().positive(),
  levelId: z.number().int().positive(),
  description: z.string().optional(),
});

// Create schemas (for POST requests)
export const PeopleCreateSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  register: z.string().regex(/^[А-ЯӨҮЁ]{2}\d{8}$/, 'Invalid register format'),
  birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  birthcityId: z.number().int().positive('Birth city ID must be positive'),
  genderId: z.number().int().positive('Gender ID must be positive'),
  ovog: z.string().min(1, 'Ovog is required'),
  nationalId: z.number().int().positive('National ID must be positive'),
  
  // Optional related data with create transformations
  address: PeopleAddressSchema
    .optional()
    .transform(data => data ? { create: data } : undefined),
    
  contact: PeopleContactSchema
    .optional()
    .transform(data => data ? { create: data } : undefined),
    
  education: z.array(PeopleEducationSchema)
    .optional()
    .transform(data => data ? { create: data } : undefined),
    
  jobDegrees: z.array(PeopleJobDegreeSchema)
    .optional()
    .transform(data => data ? { create: data } : undefined),
    
  jobLevels: z.array(PeopleJobLevelSchema)
    .optional()
    .transform(data => data ? { create: data } : undefined),
    
  relations: z.array(PeopleRelationSchema)
    .optional()
    .transform(data => data ? { create: data } : undefined),
    
  languages: z.array(PeopleLanguageSchema)
    .optional()
    .transform(data => data ? { create: data } : undefined),
    
  computerSkills: z.array(PeopleComputerSchema)
    .optional()
    .transform(data => data ? { create: data } : undefined),
    
  doctorInfo: z.array(PeopleDoctorSchema)
    .optional()
    .transform(data => data ? { create: data } : undefined),
    
  talents: z.array(PeopleTalentSchema)
    .optional()
    .transform(data => data ? { create: data } : undefined),
});

// Update schemas (for PATCH/PUT requests)
export const PeopleUpdateSchema = PeopleCreateSchema.partial().extend({
  address: PeopleAddressSchema
    .optional()
    .transform(data => data ? { 
      upsert: {
        create: data,
        update: data,
      }
    } : undefined),
    
  contact: PeopleContactSchema
    .optional()
    .transform(data => data ? {
      upsert: {
        create: data,
        update: data,
      }
    } : undefined),
    
  // For arrays, we might want to handle complete replacement
  education: z.array(PeopleEducationSchema)
    .optional()
    .transform(data => data ? {
      deleteMany: {},
      create: data
    } : undefined),
    
  // ... similar transforms for other array relationships
});

// Type inference
export type PeopleCreate = z.infer<typeof PeopleCreateSchema>;
export type PeopleUpdate = z.infer<typeof PeopleUpdateSchema>;

// Validation functions
export const validateCreatePeople = (data: unknown): PeopleCreate => {
  return PeopleCreateSchema.parse(data);
};

export const validateUpdatePeople = (data: unknown): PeopleUpdate => {
  return PeopleUpdateSchema.parse(data);
};

// Helper function for controller
export const validatePeopleId = (id: unknown): number => {
  const result = z.number().int().positive().safeParse(id);
  if (!result.success) {
    throw new Error('Invalid ID format');
  }
  return result.data;
};


import { 
  validateCreatePeople, 
  validateUpdatePeople, 
  validatePeopleId 
} from './schemas/people.schema';

export class PeopleController {
  async create(req: Request, res: Response) {
    try {
      const validatedData = validateCreatePeople(req.body);
      
      const newPerson = await prisma.people.create({
        data: validatedData,
        include: {
          address: true,
          contact: true,
          education: true,
          jobDegrees: true,
          jobLevels: true,
          relations: true,
          languages: true,
          computerSkills: true,
          doctorInfo: true,
          talents: true,
        },
      });

      return res.status(201).json(newPerson);
    } catch (error) {
      handleError(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = validatePeopleId(req.params.id);
      const validatedData = validateUpdatePeople(req.body);

      const updatedPerson = await prisma.people.update({
        where: { id },
        data: validatedData,
        include: {
          address: true,
          contact: true,
          education: true,
          jobDegrees: true,
          jobLevels: true,
          relations: true,
          languages: true,
          computerSkills: true,
          doctorInfo: true,
          talents: true,
        },
      });

      return res.json(updatedPerson);
    } catch (error) {
      handleError(error, res);
    }
  }
}