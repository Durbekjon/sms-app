import { ApiProperty } from '@nestjs/swagger';
import { User } from './User';

export class Contact {
  @ApiProperty({ description: 'Contact id' })
  id: string;

  @ApiProperty({ description: 'Contact number' })
  number: string;

  @ApiProperty({
    description: 'User associated with the contact',
    type: User || String,
  })
  user: User | string;

  @ApiProperty({ description: 'User id' })
  userId: string;
}

export default Contact;
