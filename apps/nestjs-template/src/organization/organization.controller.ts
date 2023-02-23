import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Paginated, PaginatedQuery } from 'libs/modules/database/adapter';
import { UuidValidator } from 'libs/utils';
import { OrganizationDto } from './dto/organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  getOrganizations(
    @Query() query: PaginatedQuery,
  ): Promise<Paginated<OrganizationDto>> {
    return this.organizationService.findPaginated(query);
  }

  @Get(':organizationId')
  getOrganization(
    @Param('organizationId', new UuidValidator()) organizationId: string,
  ): Promise<OrganizationDto> {
    return this.organizationService.findOne(organizationId);
  }

  @Post()
  createOrganization(@Body() body: OrganizationDto): Promise<OrganizationDto> {
    return this.organizationService.create(body);
  }
}
