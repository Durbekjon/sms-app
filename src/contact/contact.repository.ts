import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UpdateDto } from './dto/update.dto';
@Injectable()
export class ContactRepostory {
  constructor(private prismaService: PrismaService) {}

  async existContact(number: string, user: string) {
    const existData = await this.prismaService.contact.findFirst({
      where: {
        userId: user,
        number,
      },
    });

    if (!existData) {
      return false;
    }

    return existData;
  }

  async euc(id: string, user: string): Promise<boolean> {
    const data = await this.prismaService.contact.findUnique({ where: { id } });

    if (!data || data.userId !== user) {
      return false;
    }

    return true;
  }
  async create(name: string, number: string, user: string) {
    const data = { name, number, user: { connect: { id: user } } };
    const newData = await this.prismaService.contact.create({
      data,
    });

    return newData;
  }

  async getAll(user: string) {
    const datas = await this.prismaService.contact.findMany({
      where: { userId: user },
    });

    return datas;
  }

  async update(id: string, data: UpdateDto) {
    const updatedData = await this.prismaService.contact.update({
      where: { id },
      data: { name: data.name, number: data.number },
    });

    return updatedData;
  }

  async delete(id: string) {
    const one = { where: { id } };
    await this.prismaService.contact.delete(one);

    return id;
  }
}
