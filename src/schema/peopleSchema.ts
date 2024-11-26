import exp from 'constants';
import {z} from 'zod';

export const createPeopleSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    register: z.string().min(1, 'Register is required'),
    birthday: z.string().min(1, 'Birthday is required'),   
    birthcityId: z.number().int().positive('Birth city ID must be positive'),
    genderId: z.number().int().positive('Gender ID must be positive'),
    ovog: z.string().min(1, 'Ovog is required'),
    nationalId: z.number().int().positive('National ID must be positive'),
});

export const updatePeopleSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    register: z.string().min(1, 'Register is required'),
    birthday: z.string().min(1, 'Birthday is required'),    
    birthcityId: z.number().int().positive('Birth city ID must be positive'),
    genderId: z.number().int().positive('Gender ID must be positive'),
    ovog: z.string().min(1, 'Ovog is required'),
    nationalId: z.number().int().positive('National ID must be positive'),
});
export const createPeopleAddressSchema = z.object({
    //peopleId: z.number().int().positive(),
    homeaddress: z.string().min(1, 'Home address is required'),
    mobile: z.string().min(8, 'Mobile number must be at least 8 characters'),        
    fax:z.string().min(8, 'Fax number must be at least 8 characters'),       
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    postAddress: z.string().min(1, 'Post address is required'),
    sumId: z.number().int().positive(),
    provinceId: z.number().int().positive(),
        
    
    
})
export const sumSchema = z.object({
    id:z.number().int().positive(),
    value:z.string().min(1, 'Sum is required'),
})
export const provinceSchema = z.object({
    id:z.number().int().positive(),
    value:z.string().min(1, 'Provice is required'),
})
export const createPeopleContactSchema = z.object({
    contactId: z.number().int().positive(),
    value: z.string().min(8, 'Phone number must be at least 8 characters'),
})
export const createPeopleEducationSchema = z.object({
    schoolId: z.number().int().positive(),
    degreeId: z.number().int().positive(),
    graduatedYear: z.string(),
    gpa: z.number().optional(),
})
export type CreatePeople = z.infer<typeof createPeopleSchema>;
export type UpdatePeople = z.infer<typeof updatePeopleSchema>;