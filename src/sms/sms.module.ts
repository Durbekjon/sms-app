import { Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { CoreModule } from 'src/core/core.module';
import { SmsRepository } from './sms.repository';
import { ContactRepostory } from 'src/contact/contact.repository';

@Module({
  controllers: [SmsController],
  providers: [SmsService, SmsRepository, ContactRepostory],
  imports: [CoreModule],
})
export class SmsModule {}
