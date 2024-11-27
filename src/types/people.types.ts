import { z } from 'zod';

// Base interfaces for related models
type sum = {
  connect?: {
    id: number
  }

}
type province = {
  connect?: {
    id: number
  }
}
type gender = {
  id: number;
  value: string;
}
type PeopleAddress = {  //id:            number;
  sumId: number;
  provinceId: number;
  homeaddress?: string;
  mobile?: string;
  fax?: string;
  email?: string;
  postAddress?: string;
  contactPerson: string;
  contaceMobile: string;
  //people: PeopleCreateNestedOne;
}
type PeopleAddressNestedWithOutPeopleId = {
  create?: {
    sumId: sum;
    provinceId: province;
    homeaddress?: string;
    mobile?: string;
    fax?: string;
    email?: string;
    postAddress?: string;
  };
  connect?: {
    peopleId: number,
    
  };
}
type PeopleComputer = {
  //id:number;
  peopleId: number;
  skillId: number;
  vote: number;
}

type PeopleContact = {
  //id: number;
  peopleId: number;
  contactId: number;
  value: string;
  people: PeopleCreateNestedOne;
  // Add other contact fields
}
type PeopleDoctor = {
  //id:number;
  
  degree: string;
  place: string;
  date: string;
  cerf: string;
  people: PeopleCreateNestedOne;
  // Add other doctor fields
}
type PeopleEducation = {
  //id: number;
  
  school: string;
  startDate: string;
  end: string;
  cerf: string;
  people: PeopleCreateNestedOne;
  // Add other education fields
}

type PeopleJobDegree = {
  //id: number;
  //peopleId: number;
  degree: string;
  organization: string;
  date: string;
  cerf: string;
  people: PeopleCreateNestedOne;
  // Add other job degree fields
}

type PeopleJobLevel = {
  //id: number;
  peopleId: number;
  name: string
  degree: string;
  more: string;
  cerf: string;
  people: PeopleCreateNestedOne;
  // Add other job level fields
}
type PeopleLanguage = {
  //id: number;
  peopleId: number;
  languageId: number;
  skillId: number;
  vote: number;
  people: PeopleCreateNestedOne;
  // Add other language fields
}

type PeopleRelation = {
  //id:number;
  peopleId: number;
  relationId: number;
  name: number;
  brithplace: string;
  work: string;
  type: number;
  people: PeopleCreateNestedOne;
  // Add other relation fields
}







type PeopleTalent = {
  //id: number;
  peopleId: number;
  talentId: number;
  vote: number;
  people: PeopleCreateNestedOne;
  // Add other talent fields
}

type PeopleJobEduction = {
  //id:number;
  peopleId: number;
  organization: string;
  startDate: string;
  duration: number;
  label: string;
  cerf: string;
  people: PeopleCreateNestedOne;
  // Add other job education fields
}


// Main People type
export type PeopleCreateInput = {

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
  // address?: {    
  //   sumId?: number;
  //   provinceId?: number;
  //   homeaddress?: string;
  //   mobile?: string;
  //   fax?: string;
  //   email?: string;
  //   postAddress?: string;
  //   contactPerson?: string;
  //   contactMobile?: string;
  // };
  address?: PeopleAddress;
  contact?: PeopleContact;
  education?: PeopleEducation[];
  jobDegree?: PeopleJobDegree[];
  jobLevel?: PeopleJobLevel[];
  relation?: PeopleRelation[];
  language?: PeopleLanguage[];
  computer?: PeopleComputer[];
  doctor?: PeopleDoctor[];
  talent?: PeopleTalent[];
  jobEduction?: PeopleJobEduction[];

}
export type PeopleCreateNestedOne = {
  firstName: string;
  lastName: string;
  register: string;
  birthday: string;
  birthcityId: number;
  genderId: number;
  ovog: string;
  nationalId: number;
  address?: PeopleAddressNestedWithOutPeopleId;
}
// Zod schema for validation

