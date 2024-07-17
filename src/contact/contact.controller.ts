import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateDto } from './dto/create.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IUser } from 'src/auth/dto/IUser';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateResponseDto } from './dto/response/create.response';
import { GetResponse } from './dto/response/getAll.response';
import { UpdateDto } from './dto/update.dto';
import { UpdateResponse } from './dto/response/update.response';
import { User } from 'src/auth/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Create contact' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ type: CreateResponseDto })
  @Version('1')
  @Post()
  create(@Body() data: CreateDto, @User() user: IUser) {
    return this.contactService.create(data, user);
  }

  @ApiOperation({ summary: 'Get contacts' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ type: GetResponse })
  @Version('1')
  @Get()
  getAll(@User() user: IUser) {
    return this.contactService.getAll(user);
  }

  @ApiOperation({ summary: 'Update contact' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ type: UpdateResponse })
  @Version('1')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateDto,
    @User() user: IUser,
  ) {
    return this.contactService.update(id, data, user);
  }

  @Delete(':id')
  delete(@Param() id: string, @User() user: IUser) {
    return this.contactService.delete(id, user);
  }
}
