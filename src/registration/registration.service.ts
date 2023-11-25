import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from 'src/entity/registration.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Registration) private repo: Repository<Registration>,
  ) {}

  create(
    name: string,
    phone: number,
    email: string,
    password: string,
    companyname: string,
  ) {
    const registration = this.repo.create({
      name,
      phone,
      email,
      password,
      companyname,
    });

    return this.repo.save(registration);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }
  find(email: string) {
    return this.repo.findBy({ email });
  }

  async update(body) {
    return this.repo.update(body.id, body);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
