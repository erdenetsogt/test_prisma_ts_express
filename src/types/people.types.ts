import { z } from 'zod';

// Base interfaces for related models
interface PeopleAddress {  
  //id:            number;
  peopleId:      number;
  sumId:         number;
  provinceId:    number;
  homeaddress:   string;
  mobile:        string;
  fax:           string;
  email:         string;
  postAddress:   string;
  contactPerson: string;
  contactMobile: string;
}

interface PeopleComputer {
  //id:number;
  peopleId: number;
  skillId: number;
  vote: number;
}

interface PeopleContact {
  //id: number;
  peopleId: number;
  contactId:number;
  value: string;

  // Add other contact fields
}
interface PeopleDoctor {
  //id:number;
  peopleId: number;
  degree:string;
  place:string;
  date:string;
  cerf:string;

  // Add other doctor fields
}
interface PeopleEducation {
  //id: number;
  peopleId: number;
  school: string;
  startDate: string;
  end: string;
  cerf: string;
  // Add other education fields
}

interface PeopleJobDegree {
  //id: number;
  peopleId: number;
  degree: string;
  organization: string;
  date: string;
  cerf: string;
  // Add other job degree fields
}

interface PeopleJobLevel {
  //id: number;
  peopleId: number;
  name:string
  degree: string;
  more: string;
  cerf: string;
  // Add other job level fields
}
interface PeopleLanguage {
  //id: number;
  peopleId: number;
  languageId: number;
  skillId: number;
  vote: number;
  // Add other language fields
}

interface PeopleRelation {
  //id:number;
  peopleId: number;
  relationId: number;
  name:number;
  brithplace:string;
  work:string;
  type:number
  // Add other relation fields
}







interface PeopleTalent {
  //id: number;
  peopleId: number;
  talentId: number;
  vote: number;

  // Add other talent fields
}

interface PeopleJobEduction {
  //id:number;
  peopleId: number;
  organization: string;
  startDate: string;
  duration: number;
  label:string;
  cerf: string;
  // Add other job education fields
}



// Main People interface
export interface People {
  
  firstName: string;
  lastName: string;
  register: string;
  birthday: string;
  birthcityId: number;
  genderId: number;
  ovog: string;
  nationalId: number;
  //createdAt: Date;
  //updatedAt: Date;
  peopleAddress?: PeopleAddress;
  peopleContact?: PeopleContact;
  peopleEducation?: PeopleEducation[];
  peopleJobDegree?: PeopleJobDegree[];
  peopleJobLevel?: PeopleJobLevel[];
  peopleRelation?: PeopleRelation[];
  peopleLanguage?: PeopleLanguage[];
  peopleComputer?: PeopleComputer[];
  peopleDoctor?: PeopleDoctor[];
  peopleTalent?: PeopleTalent[];
  peopleJobEduction?: PeopleJobEduction[];
  
}

// Zod schema for validation

