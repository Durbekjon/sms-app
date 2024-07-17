import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { SmsService } from './sms.service';
import { IUser } from 'src/auth/dto/IUser';
import { SendDto } from './dto/send.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatusResponseDto } from 'src/core/responses/status-response.dto';
import { SmsDto } from './dto/sms.dto';
import { MultipleSendDto } from './dto/send.multiple';
import { DeleteDto } from './dto/delete.dto';
import { User } from 'src/auth/decorators/user.decorator';
import { SendContactDto } from './dto/send.contact.dto';

@UseGuards(JwtAuthGuard)
@Controller('sms')
export class SmsController {
  constructor(private smsService: SmsService) {}

  @ApiOperation({ summary: 'Send one sms' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => StatusResponseDto,
  })
  @Version('1')
  @Post('/send-message')
  sendMessage(
    @Body() data: SendDto,
    @User() user: IUser,
  ): Promise<StatusResponseDto<SmsDto>> {
    return this.smsService.sendSms(data, user);
  }

  @ApiOperation({ summary: 'Send multiple sms' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => StatusResponseDto,
  })
  @Version('1')
  @Post('/send-multiple')
  multipleSend(@Body() data: MultipleSendDto, @User() user: IUser) {
    return this.smsService.sendMultiple(data, user);
  }

  @ApiOperation({ summary: 'Send multiple sms' })
  @ApiBearerAuth('access-token')
  @Version('1')
  @Post('/sendToContacts')
  sendContacts(@Body() data: SendContactDto, @User() user: IUser) {
    return this.smsService.sendToContacts(user, data);
  }

  @ApiOperation({ summary: 'Get my sms' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => StatusResponseDto,
  })
  @Version('1')
  @Get()
  getMySMS(@User() user: IUser) {
    return this.smsService.get(user);
  }

  @ApiOperation({ summary: 'Delete multiple sms' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => StatusResponseDto,
  })
  @Version('1')
  @Delete()
  remove(@Body() data: DeleteDto, @User() user: IUser) {
    return this.smsService.remove(data, user);
  }
}
