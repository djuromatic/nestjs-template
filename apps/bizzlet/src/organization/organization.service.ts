import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Paginated, PaginatedQuery } from 'libs/modules/database/adapter';
import { OrganizationProfileDto } from './dto/organization-profile.dto';
import { OrganizationSettingsDto } from './dto/organization-settings.dto';
import { OrganizationDto } from './dto/organization.dto';
import { OrganizationRepository } from './organization.repository';

@Injectable()
export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async findPaginated(
    query: PaginatedQuery,
  ): Promise<Paginated<OrganizationDto>> {
    const result = await this.organizationRepository.paginated(query);
    return {
      ...result,
      data: result.data.map((organization) =>
        plainToInstance(OrganizationDto, organization, {
          excludeExtraneousValues: true,
        }),
      ),
    };
  }

  async findOne(id: string): Promise<OrganizationDto> {
    const result = this.organizationRepository.findOneBy({ id });
    return plainToInstance(OrganizationDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async create(organizationDto: OrganizationDto): Promise<OrganizationDto> {
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
