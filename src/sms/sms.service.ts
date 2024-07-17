import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SmsRepository } from './sms.repository';
import { IUser } from 'src/auth/dto/IUser';
import { SendDto } from './dto/send.dto';
import { StatusResponseDto } from 'src/core/responses/status-response.dto';
import { SmsDto } from './dto/sms.dto';
import { MultipleSendDto } from './dto/send.multiple';
import { DeleteDto } from './dto/delete.dto';
import { ContactRepostory } from 'src/contact/contact.repository';
import { SendContactDto } from './dto/send.contact.dto';

@Injectable()
export class SmsService {
  constructor(
    private smsRepository: SmsRepository,
    private contactRepository: ContactRepostory,
  ) {}

  async sendSms(
    data: SendDto,
    user: IUser,
  ): Promise<StatusResponseDto<SmsDto>> {
    const checkUser = await this.smsRepository.checkUser(user);

    if (!checkUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newSms = await this.smsRepository.newSMS(data, user);

    return {
      status: 'OK',
      results: newSms,
    };
  }

  async sendMultiple(data: MultipleSendDto, user: IUser) {
    const sms = await this.smsRepository.newSmsMultiple(data, user);

    return {
      status: 'OK',
      results: sms,
    };
  }

  async sendToContacts(user: IUser, data: SendContactDto) {
    const contacts = await this.contactRepository.getAll(user.id);
    const message = data.message;
    const numbers = contacts.map((contact) => contact.number);
    const smsBeans = numbers.map((destination) => ({
      destination,
      message,
    }));

    const datas = await this.smsRepository.createMany(smsBeans, user.id);
    await this.smsRepository.sendContact(smsBeans);

    return {
      result: 'OK',
      data: datas,
    };
  }

  async get(user: IUser) {
    const sms = await this.smsRepository.get(user);

    return {
      status: 'OK',
      results: sms,
    };
  }

  async remove(data: DeleteDto, user: IUser) {
    const checkUser = await this.smsRepository.checkUser(user);

    if (!checkUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const deletedSms = await this.smsRepository.remove(data);

    return {
      status: 'OK',
      results: deletedSms,
    };
  }
}
