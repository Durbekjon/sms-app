import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'User id' })
  id: string;

  @ApiProperty({ description: 'email' })
  email: string;

  @ApiProperty({ description: 'password' })
  password: string;

  @ApiProperty({ description: 'created at' })
  createdAt: Date;

  @ApiProperty({ description: 'updated at' })
  updatedAt: Date;
}
