import { People, CreatePeopleInput, UpdatePeopleInput,validateUpdatePeopleInput,validateCreatePeopleInput } from '../types/people.types';


export class PeopleService {
  static async create(input: CreatePeopleInput): Promise<People> {
    const validatedData = validateCreatePeopleInput(input);
    // Add your create logic here
    return {} as People;
  }

  static async update(id: number, input: UpdatePeopleInput): Promise<People> {
    const validatedData = validateUpdatePeopleInput(input);
    // Add your update logic here
    return {} as People;
  }

  static async findById(id: number): Promise<People | null> {
    // Add your find logic here
    return null;
  }
}