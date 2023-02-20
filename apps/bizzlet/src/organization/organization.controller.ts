import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Paginated, PaginatedQuery } from 'libs/modules/database/adapter';
import { UuidValidator } from 'libs/utils';
import { OrganizationDto } from './dto/organization.dto';
import { Organization } from './entity/organization.entity';
import { OrganizationService } from './organization.service';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  getOrganizations(
    @Query() query: PaginatedQuery,
  ): Promise<Paginated<Organization>> {
    return this.organizationService.findPaginated(query);
  }

  @Get(':organizationId')
  getOrganization(
    @Param('organizationId', new UuidValidator()) organizationId: string,
  ): Promise<Organization> {
    return this.organizationService.findOne(organizationId);
  }

  @Post()
  createOrganization(@Body() body: OrganizationDto) {
    return this.organizationService.create(body);
  }
}
