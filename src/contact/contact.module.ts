import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactRepostory } from './contact.repository';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [ContactController],
  providers: [ContactService, ContactRepostory],
})
export class ContactModule {}
