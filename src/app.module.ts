import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationController } from './registration/registration.controller';
import { RegistrationService } from './registration/registration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { registrationauthService } from './registration/registration.auth';
import { Registration } from './entity/registration.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '2023',
      database: 'finance_and_billing_automation',
      autoLoadEntities: true,

      synchronize: true,
    }),
    TypeOrmModule.forFeature([Registration]),
  ],
  controllers: [AppController, RegistrationController],
  providers: [AppService, RegistrationService, registrationauthService],
})
export class AppModule {}
