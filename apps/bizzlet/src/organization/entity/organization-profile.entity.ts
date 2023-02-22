import { Expose } from 'class-transformer';
import { CustomBaseEntity } from 'libs/modules/database/adapter';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Organization } from './organization.entity';

@Entity('organization_profiles')
export class OrganizationProfile extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Expose()
  @Column({ name: 'location' })
  location?: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId?: string;

  @OneToOne(() => Organization, (organization) => organization.profile)
  @JoinColumn({ name: 'organization_id' })
  organization?: Organization;
}
