import { ApiProperty } from '@nestjs/swagger';
import { Contact } from '../contact.dto';

export class GetResponse {
  @ApiProperty({ description: 'Contacts', type: [Contact] })
  data: [Contact];
}
