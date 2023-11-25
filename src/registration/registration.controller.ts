import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Session,
  ValidationPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { registrationauthService } from './registration.auth';
import { RegistrationService } from './registration.service';
import { LoginUserDto } from 'src/dto/login.dto';
import { UpdateDto } from 'src/dto/update.dto';

import { Middleware } from 'src/middleware';
@Controller('auth')
export class RegistrationController {
  constructor(
    private registrationService: RegistrationService,
    private RegistrationauthService: registrationauthService,
  ) {}

  @Get('/profile')
  @UseGuards(Middleware)
  async profile(@Body() body) {
    const registration = await this.registrationService.findOne(body.id);
    if (!registration) {
      throw new NotFoundException('User not found');
    }
    // const { password, ...profileData } = user;
    // return profileData;
    return registration;
  }
  @Post('/signout')
  logout(@Session() session: any) {
    session.userId = null;
  }
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const registration = await this.RegistrationauthService.signup(
      body.name,
      body.phone,
      body.email,
      body.password,
      body.companyname,
    );

    return registration;
  }
  @Post('/signin')
  async signin(@Body() body: LoginUserDto, @Session() session: any) {
    const registration = await this.RegistrationauthService.signin(
      body.email,
      body.password,
    );
    session.userId = registration.id;

    return registration;
  }
  @Post('/:id')
  findUser(@Param('id') id: string) {
    return this.registrationService.findOne(parseInt(id));
  }
  @Delete('/msg/:id')
  removeMessage(@Param('id') id: string) {
    return this.registrationService.remove(parseInt(id));
  }
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.registrationService.remove(parseInt(id));
  }

  @Put('edit/')
  @UseGuards(Middleware)
  updateUser(@Body() body) {
    return this.registrationService.update(body);
  }
}
