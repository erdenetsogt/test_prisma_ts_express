import prisma from '../config/database';

export class UserModel {
  static async create(data: { email: string; name?: string }) {
    return prisma.user.create({
      data
    });
  }

  static async findAll() {
    return prisma.user.findMany();
  }

  static async findById(id: number) {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  static async update(id: number, data: { email?: string; name?: string }) {
    return prisma.user.update({
      where: { id },
      data
    });
  }

  static async delete(id: number) {
    return prisma.user.delete({
      where: { id }
    });
  }
}