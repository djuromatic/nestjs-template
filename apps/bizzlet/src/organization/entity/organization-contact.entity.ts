import { Expose } from 'class-transformer';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Organization } from './organization.entity';

@Entity('organization_contacts')
export class OrganizationContact {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Expose()
  @Column({ name: 'email' })
  email: string;

  @Expose()
  @Column({ name: 'invoice' })
  invoice: string;

  @ManyToOne(() => Organization, (organization) => organization.contacts)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
}
