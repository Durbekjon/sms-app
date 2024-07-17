import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @ApiProperty({ description: 'Name' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ description: 'Phone number' })
  @IsNotEmpty()
  @IsString()
  number: string;
}
