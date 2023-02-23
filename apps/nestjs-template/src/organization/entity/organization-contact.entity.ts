import { Expose } from 'class-transformer';
import { CustomBaseEntity } from 'libs/modules/database/adapter';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Organization } from './organization.entity';

@Entity('organization_contacts')
export class OrganizationContact extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Expose()
  @Column({ name: 'email' })
  email?: string;

  @Expose()
  @Column({ name: 'invoice' })
  invoice?: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId?: string;

  @ManyToOne(() => Organization, (organization) => organization.contacts)
  @JoinColumn({ name: 'organization_id' })
  organization?: Organization;
}
