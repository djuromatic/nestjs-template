import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { OrganizationRepository } from './organization.repository';
import { Organization } from './entity/organization.entity';
import { OrganizationSettings } from './entity/organization-settings.entity';
import { OrganizationContact } from './entity/organization-contact.entity';
import { OrganizationProfile } from './entity/organization-profile.entity';
import { OrganizationUser } from './entity/organization-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Organization,
      OrganizationProfile,
      OrganizationSettings,
      OrganizationContact,
      OrganizationUser,
    ]),
  ],
  providers: [OrganizationService, OrganizationRepository],
  controllers: [OrganizationController],
  exports: [TypeOrmModule],
})
export class OrganizationModule {}
