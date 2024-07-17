import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseDto {
  @ApiProperty({ description: 'Contact id' })
  id: string;

  @ApiProperty({ description: 'Contact name' })
  name: string;

  @ApiProperty({ description: 'Contact number' })
  number: string;

  @ApiProperty({ description: 'User id' })
  userId: string;
}
