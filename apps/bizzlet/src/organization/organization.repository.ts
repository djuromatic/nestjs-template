import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'libs/modules/database/adapter';
import { Repository } from 'typeorm';
import { Organization } from './entity/organization.entity';

@Injectable()
export class OrganizationRepository extends BaseRepository<Organization> {
  constructor(
    @InjectRepository(Organization)
    repository: Repository<Organization>,
  ) {
    super(repository);
  }
}
