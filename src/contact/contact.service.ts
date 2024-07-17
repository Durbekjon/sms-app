import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateDto } from './dto/create.dto';
import { IUser } from 'src/auth/dto/IUser';
import { ContactRepostory } from './contact.repository';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class ContactService {
  constructor(private contactRepostiroy: ContactRepostory) {}
  async create(data: CreateDto, user: IUser) {
    const existData = await this.contactRepostiroy.existContact(
      data.number,
      user.id,
    );

    if (existData) {
      throw new HttpException('Allready exist', HttpStatus.FORBIDDEN);
    }

    const newContact = await this.contactRepostiroy.create(
      data.name,
      data.number,
      user.id,
    );

    return newContact;
  }
  async getAll(user: IUser) {
    const data = await this.contactRepostiroy.getAll(user.id);

    return { data };
  }

  async update(id: string, data: UpdateDto, user: IUser) {
    const existData = await this.contactRepostiroy.existContact(
      data.number,
      user.id,
    );

    if (existData) {
      throw new HttpException('Allready exist', HttpStatus.FORBIDDEN);
    }

    const updateData = await this.contactRepostiroy.update(id, data);

    return updateData;
  }

  async delete(id: string, user: IUser) {
    const existContact = await this.contactRepostiroy.euc(id, user.id);

    if (!existContact) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    return await this.contactRepostiroy.delete(id);
  }
}
