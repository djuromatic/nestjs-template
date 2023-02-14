import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { Organization } from './entity/organization.entity';
import { OrganizationRepository } from './organization.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationSettings } from './entity/organization-settings.entity';
import { OrganizationContact } from './entity/organization-contact.entity';
import { OrganizationProfile } from './entity/organization-profile.entity';
import { OrganizationUser } from './entity/organization-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization]),
    TypeOrmModule.forFeature([OrganizationProfile]),
    TypeOrmModule.forFeature([OrganizationSettings]),
    TypeOrmModule.forFeature([OrganizationContact]),
    TypeOrmModule.forFeature([OrganizationUser]),
  ],
  providers: [OrganizationService, OrganizationRepository],
  controllers: [OrganizationController],
  exports: [TypeOrmModule],
})
export class OrganizationModule {}
