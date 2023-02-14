import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Paginated, PaginatedQuery } from 'libs/database/adapter';
import { OrganizationDto } from './dto/organization.dto';
import { Organization } from './entity/organization.entity';
import { OrganizationRepository } from './organization.repository';

@Injectable()
export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async findOrganizations(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

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

  async create(organization: OrganizationDto): Promise<Organization> {
    const result = await this.organizationRepository.save(
      this.organizationRepository.create(organization),
    );

    return plainToInstance(OrganizationDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
