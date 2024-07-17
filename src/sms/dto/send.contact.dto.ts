import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendContactDto {
  @ApiProperty({ description: 'SMS Message text' })
  @IsNotEmpty()
  @IsString()
  message: string;
}
