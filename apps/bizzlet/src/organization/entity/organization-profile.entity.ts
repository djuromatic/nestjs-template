import { Expose } from 'class-transformer';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Organization } from './organization.entity';

@Entity('organization_profiles')
export class OrganizationProfile {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Expose()
  @Column({ name: 'location' })
  location: string;

  @OneToOne(() => Organization, (organization) => organization.profile)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
}
