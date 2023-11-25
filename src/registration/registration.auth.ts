import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';

import { randomBytes } from 'crypto';

const bcrypt = require('bcrypt');
@Injectable()
export class registrationauthService {
  constructor(private registrationService: RegistrationService) {}
  async signup(
    name: string,
    phone: number,
    email: string,
    password: string,
    companyname: string,
  ) {
    const registrations = await this.registrationService.find(email);
    if (registrations.length) {
      throw new BadRequestException('email is used');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await bcrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const registration = await this.registrationService.create(
      name,
      phone,
      email,
      password,
      companyname,
    );
  }
  async signin(email: string, password: string) {
    const [registration] = await this.registrationService.find(email);
    if (!registration) {
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash] = registration.password.split('.');
    const hash = (await bcrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('wrong password');
    }
    return registration;
  }
}
