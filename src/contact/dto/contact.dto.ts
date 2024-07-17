import { ApiProperty } from '@nestjs/swagger';

export class Contact {
  @ApiProperty({ description: 'Contact id' })
  id: string;
  @ApiProperty({ description: 'Name' })
  name: string;
  @ApiProperty({ description: 'Phone number' })
  number: string;
  @ApiProperty({ description: 'User id' })
  userId: string;
}
