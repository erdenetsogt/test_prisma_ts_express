import { z } from 'zod';
const peopleEducationSchema = z.object({
    id: z.number().optional(),
    school: z.string().min(1, 'School is required'),
    start: z.string().min(1, 'Start date is required'),
    end: z.string().min(1, 'End date is required'),
    cerf: z.string().min(1, 'Cerf is required'),
});
const peopleJobDegreeSchema = z.object({
    id: z.number().optional(),
    degree: z.string().min(1, 'Degree is required'),
    organization: z.string().min(1, 'Organization is required'),
    date: z.string().min(1, 'Date is required'),
    cerf: z.string().min(1, 'Cerf is required'),
});
const peopleJobLevelSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Name is required'),
    degree: z.string().min(1, 'Degree is required'),
    more: z.string().min(1, 'More is required'),
    cerf: z.string().min(1, 'Cerf is required'),
});
const peopleLanguageSchema = z.object({
    id: z.number().optional(),
    languageId: z.number().int().positive(),
    skillId: z.number().int().positive(),
    vote: z.number().int().positive(),
});
const peopleTalentSchema = z.object({
    id: z.number().optional(),
    talentId: z.number().int().positive(),
    vote: z.number().int().positive(),
})
const peopleJobEducationSchema = z.object({
    id: z.number().optional(),
    organization: z.string().min(1, 'Organization is required'),
    start: z.string().min(1, 'Start date is required'),
    duration: z.number().int().positive(),
    label: z.string().min(1, 'Label is required'),
    cerf: z.string().min(1, 'Cerf is required'),
})
const peopleRelationSchema = z.object({
    id: z.number().optional(),
    relationId: z.number().int().positive(),
    name: z.string().min(1, 'Name is required'),
    birthplace: z.string().min(1, 'Brithplace is required'),
    work: z.string().min(1, 'Work is required'),
    type: z.number().int().positive(),
})
const peopleComputerSchema = z.object({
    id: z.number().optional(),
    skillId: z.number().int().positive(),
    vote: z.number().int().positive(),
});
const peopleDoctorSchema = z.object({
    id: z.number().optional(),
    specialtyId: z.number().int().positive(),
    licenseNo: z.string(),
    receivedDate: z.string(),
    expireDate: z.string().optional(),
});
const peopleContactSchema = z.object({
    contactId: z.number().int().positive(),
    value: z.string().min(8, 'Phone number must be at least 8 characters'),
})
const peopleAddressSchema = z.object({
    homeaddress: z.string().min(1, 'Home address is required'),
    mobile: z.string().min(8, 'Mobile number must be at least 8 characters'),
    fax: z.string().min(8, 'Fax number must be at least 8 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    postAddress: z.string().min(1, 'Post address is required'),
    sumId: z.number().int().positive(),
    provinceId: z.number().int().positive(),
    contactPerson: z.string().min(1, 'Contact person is required'),
    contactMobile: z.string().min(8, 'Contact mobile number must be at least 8 characters'),
});
export const peopleCreateSchema = z.object({
    id: z.number().optional(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    register: z.string().min(1, 'Register is required'),
    birthday: z.string().min(1, 'Birthday is required'),
    birthcityId: z.number().int().positive('Birth city ID must be positive'),
    genderId: z.number().int().positive('Gender ID must be positive'),
    ovog: z.string().min(1, 'Ovog is required'),
    nationalId: z.number().int().positive('National ID must be positive'),
    address: peopleAddressSchema.optional(),
    contact: peopleContactSchema.optional(),
    relation: z.array(peopleRelationSchema).optional(),
    education: z.array(peopleEducationSchema).optional(),
    jobDegree: z.array(peopleJobDegreeSchema).optional(),
    jobLevel: z.array(peopleJobLevelSchema).optional(),
    jobEducation: z.array(peopleJobEducationSchema).optional(),
    language: z.array(peopleLanguageSchema).optional(),
    doctor: z.array(peopleDoctorSchema).optional(),
    computer: z.array(peopleComputerSchema).optional(),
    talent: z.array(peopleTalentSchema).optional(),
    
});


export const peopleUpdateSchema = peopleCreateSchema.partial();


export type PeopleCreateInput = z.infer<typeof peopleCreateSchema>;
export type PeopleUpdateInput = z.infer<typeof peopleUpdateSchema>;