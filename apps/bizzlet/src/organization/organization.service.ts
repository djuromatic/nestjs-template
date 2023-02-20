import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Paginated, PaginatedQuery } from 'libs/modules/database/adapter';
import { OrganizationProfileDto } from './dto/organization-profile.dto';
import { OrganizationSettingsDto } from './dto/organization-settings.dto';
import { OrganizationDto } from './dto/organization.dto';
import { Organization } from './entity/organization.entity';
import { OrganizationRepository } from './organization.repository';

@Injectable()
export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async findPaginated(query: PaginatedQuery): Promise<Paginated<Organization>> {
    const result = await this.organizationRepository.paginated(query);
    return {
      ...result,
      data: result.data.map((Organization) =>
        plainToInstance(OrganizationDto, Organization),
      ),
    };
  }

  async findOne(id: string): Promise<Organization> {
    return this.organizationRepository.findOneBy({ id });
  }

  async create(organizationDto: OrganizationDto): Promise<Organization> {
    const organization = this.organizationRepository.create({
      ...organizationDto,
      profile: organizationDto.profile
        ? organizationDto.profile
        : new OrganizationProfileDto(),
      settings: organizationDto.settings
        ? organizationDto.settings
        : new OrganizationSettingsDto(),
    });

    let result = await this.organizationRepository.save(
      this.organizationRepository.create(organization),
    );

    result = {
      ...result,
      profile: plainToInstance(OrganizationProfileDto, result.profile, {
        excludeExtraneousValues: true,
      }),
      settings: plainToInstance(OrganizationSettingsDto, result.settings, {
        excludeExtraneousValues: true,
      }),
    };

    return plainToInstance(OrganizationDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
