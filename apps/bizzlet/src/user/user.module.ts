import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserProfile } from './entity/user-profile.entity';
import { UserSettings } from './entity/user-settings.entity';
import { UserNotification } from './entity/user-notification.entity';
import { OrganizationUser } from '../organization/entity/organization-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserProfile]),
    TypeOrmModule.forFeature([UserSettings]),
    TypeOrmModule.forFeature([UserNotification]),
    TypeOrmModule.forFeature([OrganizationUser]),
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}
